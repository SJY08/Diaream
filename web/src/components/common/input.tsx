"use client"

import React, { useState } from "react"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"

interface props {
    placeholder?: string
    label?: string
    type?: string
    max?: number
    value?: string
    id?: string
    size?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onTextareaChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

function Input({
    placeholder,
    label,
    type = "text",
    max,
    value,
    id,
    size = "small",
    onChange,
    onTextareaChange,
}: props) {
    const [show, setShow] = useState<boolean>(false)

    return (
        <>
            <div className="flex w-full justify-start items-start flex-col gap-0">
                <label className="text-sm font-normal">{label}</label>
                <div className="min-w-72 w-full min-h-7 flex justify-start p-1 bg-slate-100 border rounded-md border-slate-400">
                    {size == "small" ? (
                        <input
                            type={
                                type == "password"
                                    ? show
                                        ? "text"
                                        : "password"
                                    : type
                            }
                            max={max}
                            maxLength={max}
                            value={value}
                            id={id}
                            onChange={onChange}
                            className="bg-inherit outline-none w-full"
                            placeholder={placeholder}
                        />
                    ) : (
                        <textarea
                            maxLength={max}
                            value={value}
                            id={id}
                            onChange={onTextareaChange}
                            className="bg-inherit outline-none w-full h-32 resize-none"
                            placeholder={placeholder}
                        />
                    )}
                    {type == "password" && (
                        <div className="w-7 h-7 flex justify-center items-center text-slate-500">
                            <div
                                onClick={() => setShow(!show)}
                                className="cursor-pointer text-lg"
                            >
                                {show ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Input
