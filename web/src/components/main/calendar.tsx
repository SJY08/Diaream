"use client"

import { subMonths } from "date-fns"
import useCalendar from "@/utils/useCalendar"
import React from "react"
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io"

function Calendar() {
    const calendar = useCalendar()
    const calendar_list = calendar.weekCalendarList
    const [select, setSelect] = React.useState<number | null>(null)
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

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
                        {week.map((day, dayIndex) => (
                            <button
                                onClick={() => {
                                    if (day === 0) return
                                    setSelect((prev) =>
                                        prev === day ? null : day
                                    )
                                }}
                                className={`flex justify-between min-h-12 min-w-24 rounded-md text-blue-800 border outline-none border-blue-300 active:bg-blue-300 hover:bg-blue-100 items-center text-center
                                ${day === 0 ? " invisible" : ""}
                                ${select === day ? " bg-blue-300" : ""}${
                                    calendar.currentDate.toDateString() ==
                                        new Date().toDateString() &&
                                    day == new Date().getDate()
                                        ? " bg-yellow-100"
                                        : ""
                                }`}
                                key={`day-${weekIndex}-${dayIndex}`}
                            >
                                <div className="mx-auto">{day}</div>
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Calendar
