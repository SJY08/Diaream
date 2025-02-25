import { AxiosError } from "axios"
import { instance, tempCookie } from ".."
import { Login, Signup, User } from "./type"

export default class UserService {
    // ✅ 로그인
    static async login({ id, password }: Login): Promise<number> {
        try {
            const response = await instance.post("/user/login", {
                id,
                password,
            })

            if (response.data.token) {
                const token = response.data.token // ✅ `Bearer ` 제외
                console.log("로그인 후 저장된 토큰:", token)
                tempCookie.setToken(token)
            } else {
                console.error("토큰이 반환되지 않았습니다")
            }

            return response.status
        } catch (e) {
            if (e instanceof AxiosError) return e.response?.status ?? 500
            else return 500
        }
    }

    // ✅ 회원가입 (자동 로그인 포함)
    static async signup({ name, id, password }: Signup): Promise<number> {
        try {
            const response = await instance.post("/user/signup", {
                name,
                id,
                password,
            })
            console.log("회원가입 응답:", response.data)

            if (response.data.token) {
                const token = response.data.token
                tempCookie.setToken(token)
            } else {
                console.error("토큰이 반환되지 않았습니다")
            }

            return response.status
        } catch (e) {
            if (e instanceof AxiosError) return e.response?.status ?? 500
            else return 500
        }
    }

    // ✅ 내 정보 가져오기
    static async get(): Promise<User> {
        try {
            const token = tempCookie.getToken()
            if (!token) {
                throw new Error("Token is missing. Please log in again.")
            }

            const response = await instance.get<User>("/user/get", {
                headers: { Authorization: `Bearer ${token}` }, // ✅ `Bearer ` 통일
            })
            console.log("사용자 정보 요청 응답:", response)

            return response.data
        } catch (e) {
            console.error("사용자 정보를 불러오지 못했습니다:", e)
            throw new Error("사용자 정보 가져오기 실패")
        }
    }

    // ✅ 내 정보 수정 (비밀번호는 선택 입력)
    static async update({
        name,
        password,
    }: {
        name: string
        password?: string
    }): Promise<number> {
        try {
            const token = tempCookie.getToken()
            if (!token) {
                throw new Error("Token is missing. Please log in again.")
            }

            const payload: { name: string; password?: string } = { name }
            if (password) payload.password = password // ✅ 비밀번호 입력된 경우에만 포함

            const response = await instance.put("/user/update", payload, {
                headers: { Authorization: `Bearer ${token}` },
            })

            return response.status
        } catch (e) {
            if (e instanceof AxiosError) return e.response?.status ?? 500
            else return 500
        }
    }

    // ✅ 비밀번호 검증 API 호출
    static async verifyPassword(password: string): Promise<boolean> {
        try {
            const token = tempCookie.getToken()
            if (!token) throw new Error("로그인이 필요합니다.")

            const response = await instance.post(
                "/user/verify",
                { password },
                { headers: { Authorization: `Bearer ${token}` } }
            )

            return response.status === 200
        } catch (e) {
            return false // 비밀번호 불일치 또는 오류 발생 시 false 반환
        }
    }

    // ✅ 로그아웃
    static async logout(): Promise<number> {
        try {
            const token = tempCookie.getToken()
            if (!token) {
                throw new Error("Token is missing. Please log in again.")
            }

            const response = await instance.post(
                "/user/logout",
                {}, // ✅ 빈 객체 전달 (배열이 아니라)
                { headers: { Authorization: `Bearer ${token}` } }
            )

            if (response.status === 200) {
                tempCookie.clearToken() // ✅ 서버 요청 후 토큰 삭제
                return response.status
            }
            return response.status
        } catch (error) {
            if (error instanceof AxiosError) {
                return error.response?.status ?? 500
            }
            return 500
        }
    }

    // ✅ 회원탈퇴
    static async deleteUser(): Promise<number> {
        try {
            const token = tempCookie.getToken()
            if (!token) {
                throw new Error("Token is missing. Please log in again.")
            }

            const response = await instance.delete("/user/delete", {
                headers: { Authorization: `Bearer ${token}` }, // ✅ `Bearer ` 추가
            })

            tempCookie.clearToken() // ✅ 탈퇴 후 토큰 삭제
            return response.status
        } catch (e) {
            if (e instanceof AxiosError) return e.response?.status ?? 500
            else return 500
        }
    }
}
