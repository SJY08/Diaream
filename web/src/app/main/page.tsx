"use client"

import UserService from "@/api/user"
import Header from "@/components/common/header"
import Calendar from "@/components/main/calendar"
import { useEffect, useState } from "react"

function Main() {
    const [name, setName] = useState<string>("")

    const getData = async () => {
        const data = await UserService.get()
        setName(data.name)
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <Header />
            <div className="relative top-12">
                <div className="flex flex-col gap-2 justify-center items-center w-full h-32 bg-gradient-to-b from-blue-600 to-blue-800">
                    <p className="text-white text-2xl font-extrabold">
                        {name}님 안녕하세요 !
                    </p>
                    <p className="text-white text-medium font-bold">
                        오늘의 일지는 작성하셨나요?
                    </p>
                </div>

                <div className="w-full mt-4 flex items-center flex-col gap-4">
                    <Calendar />
                </div>
            </div>
        </>
    )
}

export default Main
