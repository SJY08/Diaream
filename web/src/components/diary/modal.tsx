"use client"

import Modal from "../common/modal"
import Input from "../common/input"
import { useEffect, useState } from "react"
import NightService from "@/api/nights"
import { SleepLog } from "@/api/nights/type"

interface write {
    setFunc: React.Dispatch<React.SetStateAction<boolean>>
}

export function WriteModal({ setFunc }: write) {
    const [title, setTitle] = useState<string>("")
    const [sleep, setSleep] = useState<string>("")
    const [wake, setWake] = useState<string>("")
    const [content, setContent] = useState<string>("")

    const submitHandler = async () => {
        if (title && sleep && wake && content) {
            const today = new Date()
            today.setDate(today.getDate() + 1)
            const formattedToday = today.toISOString().split("T")[0]

            const sleepTime = `${formattedToday} ${sleep}:00`
            const wakeTime = `${formattedToday} ${wake}:00`

            const log = {
                title,
                content,
                date: formattedToday,
                sleep: sleepTime,
                wake: wakeTime,
            }
            const result = await NightService.write(log)
            if (result == 201) setFunc(false)
            else alert("기록에 실패했습니다")
        }
    }

    return (
        <Modal submit={submitHandler} setFunc={setFunc}>
            <div className="w-full flex flex-col gap-2">
                <Input
                    label="제목"
                    value={title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.target.value)
                    }
                />
                <Input
                    type="time"
                    label="잠든 시간"
                    value={sleep}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSleep(e.target.value)
                    }
                />
                <Input
                    type="time"
                    label="일어난 시간"
                    value={wake}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setWake(e.target.value)
                    }
                />
                <Input
                    size="big"
                    label="일지"
                    value={content}
                    onTextareaChange={(
                        e: React.ChangeEvent<HTMLTextAreaElement>
                    ) => setContent(e.target.value)}
                />
            </div>
        </Modal>
    )
}

interface edit {
    setFunc: React.Dispatch<React.SetStateAction<boolean>>
    diary: SleepLog
    refresh: () => void
}

export function EditModal({ setFunc, diary, refresh }: edit) {
    const [diaryValue, setDiaryValue] = useState<SleepLog>(diary)

    const formatTime = (time: string) => {
        const date = new Date(time)
        const hours = date.getHours().toString().padStart(2, "0")
        const minutes = date.getMinutes().toString().padStart(2, "0")
        return `${hours}:${minutes}`
    }

    const submitHandler = async () => {
        const today = new Date().toISOString().split("T")[0] // 오늘 날짜
        const sleepTime = `${today} ${diaryValue.sleep}:00` // 날짜 + 시간
        const wakeTime = `${today} ${diaryValue.wake}:00` // 날짜 + 시간

        const updatedLog = {
            title: diaryValue.title,
            content: diaryValue.content,
            date: today,
            sleep: sleepTime,
            wake: wakeTime,
        }

        try {
            const result = await NightService.update(diary.nightid, updatedLog)
            if (result == 200) {
                refresh()
                setFunc(false)
            }
        } catch (e) {
            alert("수정에 실패했습니다.")
            console.log(e)
        }
    }

    const deleteHandler = async () => {
        try {
            const result = await NightService.delete(diary.nightid)
            if (result == 200) {
                refresh()
                setFunc(false)
            }
        } catch (e) {
            alert("삭제에 실패했습니다")
            console.error(e)
        }
    }

    useEffect(() => {
        // diaryValue가 처음 설정될 때만 값 수정
        if (diary) {
            setDiaryValue({
                ...diary,
                sleep: diary.sleep ? formatTime(diary.sleep) : "00:00",
                wake: diary.wake ? formatTime(diary.wake) : "00:00",
            })
        }
    }, [diary]) // diary 값이 바뀔 때만 실행

    return (
        <>
            <Modal
                type="edit"
                submit={submitHandler}
                del={deleteHandler}
                setFunc={setFunc}
            >
                <div className="w-full flex flex-col gap-2">
                    <Input
                        label="제목"
                        value={diaryValue.title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDiaryValue({
                                ...diaryValue,
                                title: e.target.value,
                            })
                        }
                    />
                    <Input
                        type="time"
                        label="잠든 시간"
                        value={diaryValue.sleep}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDiaryValue({
                                ...diaryValue,
                                sleep: e.target.value,
                            })
                        }
                    />
                    <Input
                        type="time"
                        label="일어난 시간"
                        value={diaryValue.wake}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDiaryValue({
                                ...diaryValue,
                                wake: e.target.value,
                            })
                        }
                    />
                    <Input
                        size="big"
                        label="일지"
                        value={diaryValue.content}
                        onTextareaChange={(
                            e: React.ChangeEvent<HTMLTextAreaElement>
                        ) =>
                            setDiaryValue({
                                ...diaryValue,
                                content: e.target.value,
                            })
                        }
                    />
                </div>
            </Modal>
        </>
    )
}
