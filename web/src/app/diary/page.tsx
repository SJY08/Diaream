"use client"

import { useState, useEffect } from "react"
import Button from "@/components/common/button"
import Header from "@/components/common/header"
import Diary_component from "@/components/diary/diary"
import NightService from "@/api/nights"
import { SleepLog } from "@/api/nights/type"
import { EditModal, WriteModal } from "@/components/diary/modal"

function Diary() {
    const [modal, setModal] = useState<boolean>(false)
    const [diaryList, setDiaryList] = useState<SleepLog[]>([])
    const [selectedDiary, setSelectedDiary] = useState<SleepLog | null>(null)
    const [edit, setEdit] = useState<boolean>(false)

    const handleSelectLog = (log: SleepLog) => {
        setSelectedDiary(log)
        setEdit(true)
    }

    const fetchDiaries = async () => {
        const data = await NightService.get()
        setDiaryList(data)
    }

    useEffect(() => {
        fetchDiaries()
    }, [])

    return (
        <>
            <Header />
            {edit && selectedDiary && (
                <EditModal
                    setFunc={setEdit}
                    diary={selectedDiary}
                    refresh={fetchDiaries}
                />
            )}
            {modal && <WriteModal setFunc={setModal} />}
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
                        {diaryList.map((v, i) => (
                            <Diary_component
                                key={i}
                                title={v.title}
                                content={v.content}
                                date={v.date}
                                sleep={v.sleep}
                                wake={v.wake}
                                onClick={() => {
                                    handleSelectLog(v)
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Diary
