"use client"

import { useRouter } from "next/navigation"
import { IoHomeSharp } from "react-icons/io5"

function Header() {
    const router = useRouter()

    return (
        <>
            <div className="fixed top-0 w-full h-12 bg-blue-600 flex justify-center items-center z-50">
                <div className="w-2/3 flex justify-center items-center">
                    <div className="flex justify-center items-center gap-12 text-white font-medium">
                        <IoHomeSharp
                            onClick={() => router.push("/main")}
                            className="text-xl cursor-pointer"
                        />
                        <p
                            onClick={() => router.push("/diary")}
                            className="cursor-pointer text-sm"
                        >
                            수면일지
                        </p>
                        <p
                            onClick={() => router.push("/graph")}
                            className="cursor-pointer text-sm"
                        >
                            수면그래프
                        </p>
                    </div>

                    <div className="ml-auto text-sm text-white font-medium">
                        <p
                            onClick={() => router.push("/mypage")}
                            className="cursor-pointer"
                        >
                            마이페이지
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header
