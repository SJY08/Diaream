const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const db = mysql
    .createConnection({
        user: "root",
        host: "127.0.0.1",
        password: process.env.DB_PASSWORD,
        database: "sleep_diary",
    })
    .promise()

const blacklistedTokens = new Set() // 🚀 로그아웃을 위한 블랙리스트

const verifyToken = async (req, res, next) => {
    let token = req.headers.authorization

    console.log("요청받은 Authorization 헤더:", token)

    if (!token) {
        return res.status(403).json({ message: "토큰이 없습니다" })
    }

    // ✅ "Bearer Bearer <token>" 같은 문제 방지
    token = token.replace(/Bearer\s+/g, "").trim()

    console.log("파싱된 토큰:", token)

    if (blacklistedTokens.has(token)) {
        return res.status(401).json({ message: "로그아웃된 토큰입니다" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("📌 토큰 검증 성공! 디코딩된 값:", decoded)
        req.user = decoded
        next()
    } catch (err) {
        console.error("📌 토큰 검증 실패:", err.message)
        return res.status(401).json({ message: "토큰이 유효하지 않습니다" })
    }
}

db.connect((err) => {
    if (err) console.error("MYSQL 연결 실패")
    else console.error("MYSQL 연결 성공")
})

app.listen(3001, () => {
    console.log("Server running on port 3001")
})

// 회원가입
app.post("/user/signup", async (req, res) => {
    try {
        const { name, id, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)

        // ✅ 비동기 방식으로 MySQL 쿼리 실행
        await db.query(
            "INSERT INTO users (name, id, password) VALUES (?, ?, ?)",
            [name, id, hashedPassword]
        )

        // ✅ 회원가입 성공 후 토큰 생성
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        })

        res.status(201).json({ message: "회원가입 성공", token })
    } catch (err) {
        console.error("회원가입 오류:", err)
        res.status(500).json({ message: "회원가입 실패" })
    }
})

// 로그인
app.post("/user/login", async (req, res) => {
    const { id, password } = req.body

    try {
        const [results] = await db.query("SELECT * FROM users WHERE id = ?", [
            id,
        ])
        if (results.length === 0)
            return res.status(401).json({ message: "존재하지 않는 사용자" })

        const user = results[0]
        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid)
            return res.status(401).json({ message: "비밀번호 불일치" })

        const token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        res.json({ message: "로그인 성공", token })
    } catch (err) {
        console.error("로그인 오류:", err)
        res.status(500).json({ message: "로그인 실패" })
    }
})

// 로그아웃 (토큰 블랙리스트에 추가)
app.post("/user/logout", verifyToken, (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) return res.status(400).json({ message: "토큰이 없습니다" })

    blacklistedTokens.add(token) // 🚀 로그아웃한 토큰 저장
    res.json({ message: "로그아웃 성공" })
})

// 내 정보 조회
app.get("/user/get", verifyToken, async (req, res) => {
    const user_id = req.user.id

    try {
        const [results] = await db.query(
            `SELECT id,  name, created_at, 
            DATEDIFF(NOW(), created_at) + 1 AS days_since_signup 
            FROM users WHERE id = ?`,
            [user_id]
        )
        if (results.length === 0)
            return res
                .status(404)
                .json({ message: "사용자 정보를 찾을 수 없습니다" })

        res.json({
            id: results[0].id,
            name: results[0].name,
            created_at: results[0].created_at,
            days_since_signup: results[0].days_since_signup,
        })
    } catch (err) {
        console.error("내 정보 조회 오류:", err)
        res.status(500).json({ message: "사용자 정보를 가져오지 못했습니다" })
    }
})

// 내 정보 수정 (이름, 비밀번호)
app.put("/user/update", verifyToken, async (req, res) => {
    const user_id = req.user.id
    const { name, password } = req.body

    if (!name && !password)
        return res.status(400).json({ message: "변경할 내용을 입력하세요" })

    let query = "UPDATE users SET"
    let values = []

    if (name) {
        query += " name = ?"
        values.push(name)
    }

    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10)
        query += name ? ", password = ?" : " password = ?"
        values.push(hashedPassword)
    }

    query += " WHERE id = ?"
    values.push(user_id)

    try {
        const [result] = await db.query(query, values)
        res.json({ message: "정보 수정 완료" })
    } catch (err) {
        console.error("정보 수정 오류:", err)
        res.status(500).json({ message: "정보 수정 실패" })
    }
})

// 비밀번호 검증 API
app.post("/user/verify", verifyToken, async (req, res) => {
    const user_id = req.user.id
    const { password } = req.body

    try {
        // 사용자 정보 조회
        const [results] = await db.query(
            "SELECT password FROM users WHERE id = ?",
            [user_id]
        )
        if (results.length === 0) {
            return res
                .status(404)
                .json({ message: "사용자를 찾을 수 없습니다." })
        }

        const user = results[0]
        const isValid = await bcrypt.compare(password, user.password)

        if (!isValid) {
            return res
                .status(401)
                .json({ message: "비밀번호가 일치하지 않습니다." })
        }

        res.json({ message: "비밀번호 인증 성공" })
    } catch (err) {
        console.error("비밀번호 검증 오류:", err)
        res.status(500).json({ message: "서버 오류 발생" })
    }
})

// 회원 탈퇴 (수면일지와 함께 삭제)
app.delete("/user/delete", verifyToken, async (req, res) => {
    const user_id = req.user.id

    try {
        await db.query("DELETE FROM sleep_logs WHERE user_id = ?", [user_id])
        await db.query("DELETE FROM users WHERE id = ?", [user_id])
        res.json({ message: "회원 탈퇴 완료" })
    } catch (err) {
        console.error("회원 탈퇴 오류:", err)
        res.status(500).json({ message: "회원 탈퇴 실패" })
    }
})

// 수면일지 작성
app.post("/nights/write", verifyToken, async (req, res) => {
    const user_id = req.user.id
    const { title, content, date, sleep, wake } = req.body

    try {
        await db.query(
            "INSERT INTO sleep_logs (user_id, title, content, date, sleep, wake) VALUES (?, ?, ?, ?, ?, ?)",
            [user_id, title, content, date, sleep, wake]
        )
        res.status(201).json({ message: "저장 완료" })
    } catch (err) {
        console.error("수면일지 작성 오류:", err)
        res.status(500).json({ message: "저장 실패" })
    }
})

// 수면일지 조회
app.get("/nights/get", verifyToken, async (req, res) => {
    const user_id = req.user.id

    try {
        const [results] = await db.query(
            "SELECT * FROM sleep_logs WHERE user_id = ? ORDER BY created_at DESC",
            [user_id]
        )
        res.json(results)
    } catch (err) {
        console.error("수면일지 조회 오류:", err)
        res.status(500).json({ message: "조회 실패" })
    }
})

// 수면일지 수정
app.put("/nights/update/:nightid", verifyToken, async (req, res) => {
    const { title, content, date, sleep, wake } = req.body
    const nightid = req.params.nightid

    try {
        await db.query(
            "UPDATE sleep_logs SET title=?, content=?, date=?, sleep=?, wake=? WHERE nightid=?",
            [title, content, date, sleep, wake, nightid]
        )
        res.json({ message: "수정 완료" })
    } catch (err) {
        console.error("수면일지 수정 오류:", err)
        res.status(500).json({ message: "수정 실패" })
    }
})

// 전체 유저의 수면 통계 조회
app.get("/nights/statistics", async (req, res) => {
    try {
        const [results] = await db.query(
            `SELECT 
                users.id AS user_id, 
                users.name, 
                COUNT(sleep_logs.id) AS sleep_count, 
                AVG(TIMESTAMPDIFF(HOUR, sleep_logs.sleep, sleep_logs.wake)) AS avg_sleep_hours
            FROM sleep_logs 
            JOIN users ON sleep_logs.user_id = users.id
            GROUP BY users.id, users.name
            ORDER BY avg_sleep_hours DESC`
        )
        res.json(results)
    } catch (err) {
        console.error("수면 통계 조회 오류:", err)
        res.status(500).json({ message: "통계 조회 실패" })
    }
})
