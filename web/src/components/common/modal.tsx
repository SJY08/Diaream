"use client"

import Button from "./button"
import { useEffect } from "react"

interface props {
    children?: React.ReactNode
    setFunc: React.Dispatch<React.SetStateAction<boolean>>
    submit?: () => void
}

function Modal({ children, setFunc, submit }: props) {
    const onClick = () => {
        if (submit) submit()
        else setFunc(false)
    }

    useEffect(() => {
        const escModalClose = (e: KeyboardEvent) => {
            if (e.key == "Escape") {
                setFunc(false)
            }
        }
        window.addEventListener("keydown", escModalClose)
        return () => window.removeEventListener("keydown", escModalClose)
    }, [])

    return (
        <>
            <div className="w-full h-full fixed flex justify-center items-center bg-black bg-opacity-50 z-50">
                <div className="w-1/3 min-h-40 bg-white rounded-lg p-4 flex justify-center items-center flex-col">
                    <div className="w-full mb-4">{children}</div>

                    <div className="mt-auto ml-auto w-44 flex gap-4">
                        <Button act={false} onClick={() => setFunc(false)}>
                            취소
                        </Button>
                        <Button onClick={onClick}>완료</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
