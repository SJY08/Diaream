"use client"

import { useState, useEffect } from "react"
import Button from "@/components/common/button"
import Header from "@/components/common/header"
import Diary_component from "@/components/diary/diary"
import Modal from "@/components/common/modal"
import Input from "@/components/common/input"

function Diary() {
    const [modal, setModal] = useState<boolean>(false)
    const dummy = [
        {
            title: "title1",
            content:
                "content1content1content1content1content1content1content1content1content1content1content1content1content1",
            date: "2025-02-19",
            sleep: "22:00",
            wake: "11:00",
        },
        {
            title: "title2",
            content:
                "content2content2content2content2content2content2content2content2",
            date: "2025-02-18",
            sleep: "23:00",
            wake: "13:00",
        },
        {
            title: "title1",
            content:
                "content1content1content1content1content1content1content1content1content1content1content1content1content1",
            date: "2025-02-19",
            sleep: "22:00",
            wake: "11:00",
        },
        {
            title: "title2",
            content:
                "content2content2content2content2content2content2content2content2",
            date: "2025-02-18",
            sleep: "23:00",
            wake: "13:00",
        },
        {
            title: "title1",
            content:
                "content1content1content1content1content1content1content1content1content1content1content1content1content1",
            date: "2025-02-19",
            sleep: "22:00",
            wake: "11:00",
        },
        {
            title: "title2",
            content:
                "content2content2content2content2content2content2content2content2",
            date: "2025-02-18",
            sleep: "23:00",
            wake: "13:00",
        },
        {
            title: "title1",
            content:
                "content1content1content1content1content1content1content1content1content1content1content1content1content1",
            date: "2025-02-19",
            sleep: "22:00",
            wake: "11:00",
        },
        {
            title: "title2",
            content:
                "content2content2content2content2content2content2content2content2",
            date: "2025-02-18",
            sleep: "23:00",
            wake: "13:00",
        },
    ]

    return (
        <>
            <Header />
            {modal && (
                <Modal setFunc={setModal}>
                    <div className="w-full flex flex-col gap-2">
                        <Input label="제목" />
                        <Input type="time" label="잠든 시간" />
                        <Input type="time" label="일어난 시간" />
                        <Input size="big" label="일지" />
                    </div>
                </Modal>
            )}
            <div className="relative top-12 w-full flex flex-col items-center">
                <div className="w-1/2">
                    <div className="flex mt-6">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl font-extrabold">
                                수면 일지
                            </h1>
                            <p>오늘의 수면일지를 작성해봐요!</p>
                        </div>

                        <div className="w-24 mt-auto ml-auto">
                            <Button onClick={() => setModal(true)}>
                                작성하기
                            </Button>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-1">
                        {dummy.map((v, i) => (
                            <Diary_component
                                key={i}
                                title={v.title}
                                content={v.content}
                                date={v.date}
                                sleep={v.sleep}
                                wake={v.wake}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Diary
