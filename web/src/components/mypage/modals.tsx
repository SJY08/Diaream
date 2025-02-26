"use client"

import { useRouter } from "next/navigation"
import Modal from "../common/modal"
import UserService from "@/api/user"
import Input from "../common/input"
import { useState, useEffect } from "react"

interface logout {
    setLogout: React.Dispatch<React.SetStateAction<boolean>>
}

export function Logout({ setLogout }: logout) {
    const router = useRouter()

    const logoutHandler = async () => {
        const result = await UserService.logout()
        console.log(result)
        if (result == 200) {
            setLogout(false)
            router.push("/")
        } else {
            setLogout(false)
            alert("로그아웃에 실패했습니다.")
            router.push("/")
        }
    }

    return (
        <Modal setFunc={setLogout} submit={logoutHandler}>
            <p className="text-xl font-semibold">로그아웃 하시겠습니까?</p>
        </Modal>
    )
}

interface edit {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export function Edit({ setEdit }: edit) {
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const submit = async () => {
        const result = await UserService.update({ name, password })
        console.log(result)
        if (result == 200) setEdit(false)
        else alert("정보 수정에 실패했습니다")
    }

    const getData = async () => {
        const data = await UserService.get()
        setName(data.name || "")
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Modal submit={submit} setFunc={setEdit}>
                <div className="w-full flex flex-col gap-2">
                    <Input
                        label="이름"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                    />
                    <Input
                        label="비밀번호"
                        type="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                        }
                    />
                </div>
            </Modal>
        </>
    )
}

interface verify {
    setVerify: React.Dispatch<React.SetStateAction<boolean>>
    onSubmit: () => void
}

export function Verify({ setVerify, onSubmit }: verify) {
    const [password, setPassword] = useState<string>("")

    const submit = async () => {
        if (password) {
            const result = await UserService.verifyPassword(password)
            console.log(result ? 200 : 500)
            if (result) {
                onSubmit()
            } else {
                alert("비밀번호가 잘못되었습니다")
                setPassword("")
            }
        } else {
            alert("비밀번호를 입력해주세요")
        }
    }

    return (
        <>
            <Modal submit={submit} setFunc={setVerify}>
                <p className="text-xl font-extrabold mb-5">비밀번호 확인</p>
                <Input
                    label="비밀번호"
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                    }
                />
            </Modal>
        </>
    )
}
