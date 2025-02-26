"use client"

import Button from "./button"
import { useEffect } from "react"

interface props {
    children?: React.ReactNode
    setFunc: React.Dispatch<React.SetStateAction<boolean>>
    submit?: () => void
    del?: () => void
    type?: string
}

function Modal({ children, setFunc, submit, del, type = "modal" }: props) {
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
                    {type == "modal" && (
                        <>
                            <div className="mt-auto ml-auto w-44 flex gap-4">
                                <Button
                                    act="gray"
                                    onClick={() => setFunc(false)}
                                >
                                    취소
                                </Button>
                                <Button onClick={onClick}>완료</Button>
                            </div>
                        </>
                    )}{" "}
                    {type == "edit" && (
                        <>
                            <div className="flex w-full">
                                <div className="w-20 mr-auto">
                                    <Button
                                        act="gray"
                                        onClick={() => setFunc(false)}
                                    >
                                        취소
                                    </Button>
                                </div>
                                <div className="ml-auto w-44 flex gap-2">
                                    <Button act="critical" onClick={del}>
                                        삭제
                                    </Button>
                                    <Button onClick={onClick}>수정</Button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Modal
