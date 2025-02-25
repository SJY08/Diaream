"use client"

import Input from "@/components/common/input"
import Button from "@/components/common/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import UserService from "@/api/user"

function Signup() {
    const [name, setName] = useState<string>("")
    const [id, setId] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const router = useRouter()

    const submitHandler = async () => {
        if (name && id && password) {
            const result = await UserService.signup({ name, id, password })
            console.log(result)
            if (result == 201) router.push("/main")
            else alert("회원가입에 실패했습니다")
        }
    }

    return (
        <>
            <div className="w-full h-screen flex justify-center items-center flex-col gap-16">
                <div className="flex justify-center items-center flex-col gap-1">
                    <h1 className="font-extrabold text-4xl text-blue-900">
                        회원가입
                    </h1>
                    <h3 className="font-light text-lg text-blue-900">
                        다이어림에 오신걸 환영해요!
                    </h3>
                </div>

                <div className="flex items-center flex-col gap-4">
                    <Input
                        label="닉네임"
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setName(e.target.value)
                        }
                    />
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
                        <Button onClick={submitHandler}>회원가입</Button>
                        <div>
                            <p className="text-sm">
                                이미 계정이 있으신가요?{" "}
                                <span
                                    onClick={() => router.push("/login")}
                                    className="cursor-pointer text-blue-600"
                                >
                                    로그인
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
