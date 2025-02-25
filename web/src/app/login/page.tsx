"use client"

import UserService from "@/api/user"
import Button from "@/components/common/button"
import Input from "@/components/common/input"
import { useRouter } from "next/navigation"
import { useState } from "react"

function Login() {
    const [id, setId] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const router = useRouter()

    const submitHandler = async () => {
        if (id && password) {
            const result = await UserService.login({ id, password })
            console.log(result)
            if (result == 200) router.push("/main")
        }
    }

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center flex-col gap-16">
                <div className="flex justify-center items-center flex-col gap-1">
                    <h1 className="font-extrabold text-4xl text-blue-900">
                        로그인
                    </h1>
                    <h3 className="font-light text-lg text-blue-900">
                        다이어림에 오신걸 환영해요!
                    </h3>
                </div>

                <div className="flex items-center flex-col gap-6">
                    <Input
                        label="아이디"
                        value={id}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setId(e.target.value)
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
                    <div className="w-full flex flex-col items-center gap-1">
                        <Button onClick={submitHandler}>로그인</Button>
                        <div>
                            <p className="text-sm">
                                아직 계정이 없으신가요?{" "}
                                <span
                                    onClick={() => router.push("/signup")}
                                    className="cursor-pointer text-blue-600"
                                >
                                    회원가입
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
