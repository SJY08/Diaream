"use client"

import { subMonths } from "date-fns"
import useCalendar from "@/utils/useCalendar"
import React, { useEffect } from "react"
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io"
import NightService from "@/api/nights"
import { useState } from "react"
import { useRouter } from "next/navigation"

function Calendar() {
    const calendar = useCalendar()
    const calendar_list = calendar.weekCalendarList
    const [logDates, setLogDates] = useState<Set<string>>(new Set())
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

    const getData = async () => {
        try {
            const data = await NightService.get() // 수면 일지 가져오기
            const logs = new Set(
                data.map((log) => log.date.split("T")[0]) // 일지가 있는 날짜 추출
            )
            setLogDates(logs) // 일지가 있는 날짜 목록 저장
        } catch (e) {
            console.error("수면 일지 데이터를 가져오는 데 실패했습니다.", e)
        }
    }

    useEffect(() => {
        getData()
    })

    return (
        <>
            <div className="flex gap-10">
                <button
                    onClick={() => {
                        calendar.setCurrentDate(
                            subMonths(calendar.currentDate, 1)
                        )
                    }}
                    className="text-xl text-blue-800"
                >
                    <IoMdArrowDropleft />
                </button>

                <h1 className="text-blue-800">
                    {calendar.currentDate.getFullYear()}년{" "}
                    {calendar.currentDate.getMonth() + 1}월
                </h1>

                <button
                    onClick={() => {
                        calendar.setCurrentDate(
                            subMonths(calendar.currentDate, -1)
                        )
                    }}
                    className="text-xl text-blue-800"
                >
                    <IoMdArrowDropright />
                </button>
            </div>

            <div className="flex gap-8">
                {days.map((v, i) => (
                    <p
                        className="min-h-12 w-24 flex justify-center items-center text-blue-800"
                        key={i}
                    >
                        {v}
                    </p>
                ))}
            </div>

            <div className="flex flex-col gap-3">
                {calendar_list.map((week, weekIndex) => (
                    <div className="flex px-20 w-full gap-8" key={weekIndex}>
                        {week.map((day, dayIndex) => {
                            if (day === 0)
                                return (
                                    <div
                                        key={`empty-${weekIndex}-${dayIndex}`}
                                        className="invisible min-h-12 min-w-24"
                                    ></div>
                                )

                            const dateStr = `${calendar.currentDate.getFullYear()}-${(
                                calendar.currentDate.getMonth() + 1
                            )
                                .toString()
                                .padStart(2, "0")}-${day
                                .toString()
                                .padStart(2, "0")}`
                            const isToday =
                                new Date().toDateString() ===
                                new Date(
                                    calendar.currentDate.getFullYear(),
                                    calendar.currentDate.getMonth(),
                                    day
                                ).toDateString()
                            const hasLog = logDates.has(dateStr)

                            return (
                                <div
                                    className={`flex justify-center min-h-12 min-w-24 rounded-md text-blue-800 border outline-none border-blue-300 items-center text-center
                                        ${
                                            isToday
                                                ? " bg-yellow-100"
                                                : hasLog
                                                ? " bg-blue-100"
                                                : ""
                                        }`}
                                    key={`day-${weekIndex}-${dayIndex}`}
                                >
                                    <div className="mx-auto">{day}</div>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Calendar
