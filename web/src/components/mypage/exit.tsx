import React from "react"
import Button from "../common/button"

interface prop {
    setExit: React.Dispatch<React.SetStateAction<boolean>>
}

function Exit({ setExit }: prop) {
    return (
        <>
            <div className="w-2/5 p-4 rounded-lg border border-blue-600 flex items-center justify-center gap-1">
                <p className="text-blue-600">
                    계정 삭제 시 우리 다이어림과 함께한 기록이 사라져요
                </p>
                <div className="w-28 ml-auto">
                    <Button onClick={() => setExit(true)}>회원탈퇴</Button>
                </div>
            </div>
        </>
    )
}

export default Exit
