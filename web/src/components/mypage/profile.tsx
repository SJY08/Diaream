"use client"

import { MdPerson } from "react-icons/md"
import Button from "../common/button"
import { useState, useEffect } from "react"
import UserService from "@/api/user"
import NightService from "@/api/nights"
import { tempCookie } from "@/api"
import { useRouter } from "next/navigation"

interface props {
    setLogoutFunc: React.Dispatch<React.SetStateAction<boolean>>
    setEditFunc: React.Dispatch<React.SetStateAction<boolean>>
}

function Profile({ setLogoutFunc, setEditFunc }: props) {
    const [name, setName] = useState<string>("")
    const [id, setId] = useState<string>("")
    const [create, setCreate] = useState<number>()
    const [log, setLogs] = useState<number>()

    const router = useRouter()

    const getData = async () => {
        if (tempCookie.isNull()) {
            alert("토큰이 없습니다. 로그인 후 다시 시도해주세요")
            router.push("/")
            return
        }

        try {
            const data = await UserService.get()
            const logs = (await NightService.get()).length
            setLogs(logs)
            setName(data.name)
            setId(data.id)
            setCreate(data.days_since_signup)
        } catch (e) {
            console.log("사용자 정보를 불러오지 못했습니다.", e)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="w-2/5 min-h-80 p-5 rounded-lg border border-blue-600 flex flex-col items-center justify-center gap-1">
                <div className="flex items-center flex-col gap-2">
                    <div className="w-36 h-36 bg-blue-600 rounded-full flex justify-center items-center text-white text-8xl">
                        <MdPerson />
                    </div>
                    <p className="text-2xl font-semibold text-blue-600">
                        {name}{" "}
                        <span className="font-medium text-xl">({id})</span>
                    </p>
                </div>

                <div className="flex flex-col items-center">
                    <p className="text-blue-500">
                        Diaream과 함께한지 {create}일 됬어요!
                    </p>
                    <p className="text-blue-500">일지를 {log}개 작성했어요</p>
                </div>

                <div className="mt-2 ml-auto w-36 flex flex-col gap-1">
                    <Button onClick={() => setEditFunc(true)}>
                        회원정보 수정
                    </Button>
                    <Button onClick={() => setLogoutFunc(true)}>
                        로그아웃
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Profile
