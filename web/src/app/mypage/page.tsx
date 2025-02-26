"use client"

import Header from "@/components/common/header"
import Profile from "@/components/mypage/profile"
import Exit from "@/components/mypage/exit"
import { useEffect, useState } from "react"
import UserService from "@/api/user"
import { useRouter } from "next/navigation"
import { Edit, Logout, Verify } from "@/components/mypage/modals"

function Mypage() {
    const [logout, setLogout] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)
    const [verify, setVerify] = useState<boolean>(false)
    const [exit, setExit] = useState<boolean>(false)
    const [name, setName] = useState<string>("")

    const getData = async () => {
        const data = await UserService.get()
        setName(data.name)
    }

    const router = useRouter()

    const verifySubmit = async () => {
        setVerify(false)
        setEdit(true)
    }

    const exitSubmit = async () => {
        const result = await UserService.deleteUser()
        console.log(result)
        if (result == 200) router.push("/")
        else alert("회원탈퇴에 실패했습니다.")
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {logout && <Logout setLogout={setLogout} />}
            {verify && <Verify onSubmit={verifySubmit} setVerify={setVerify} />}
            {edit && <Edit setEdit={setEdit} />}
            {exit && <Verify onSubmit={exitSubmit} setVerify={setExit} />}
            <Header />
            <div className="relative top-12">
                <div className="flex flex-col gap-2 justify-center items-center w-full h-32 bg-gradient-to-b from-blue-600 to-blue-800">
                    <p className="text-white text-2xl font-extrabold">
                        {name}님 안녕하세요 !
                    </p>
                    <p className="text-white text-medium font-bold">
                        오늘 하루는 어떠셨나요?
                    </p>
                </div>
                <div className="w-full mt-4 flex items-center flex-col gap-4">
                    <Profile
                        setEditFunc={setVerify}
                        setLogoutFunc={setLogout}
                    />
                    <Exit setExit={setExit} />
                </div>
            </div>
        </>
    )
}

export default Mypage
