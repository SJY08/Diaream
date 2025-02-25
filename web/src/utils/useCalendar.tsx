import { getDaysInMonth } from "date-fns"
import React from "react"

const DEFAULT_TRASH_VALUE = 0
const DAY_OF_WEEK = 7
const CALENDER_LENGTH = 42

const useCalendar = () => {
    const [currentDate, setCurrentDate] = React.useState(new Date())
    const totalMonthDays = getDaysInMonth(currentDate)

    const firstDayOfMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
    ).getDay()

    const prevDayList = Array.from({ length: firstDayOfMonth }).map(
        () => DEFAULT_TRASH_VALUE
    )

    const currentDayList = Array.from({ length: totalMonthDays }).map(
        (_, i) => i + 1
    )

    const nextDayList = Array.from({
        length: CALENDER_LENGTH - (prevDayList.length + currentDayList.length),
    }).map(() => DEFAULT_TRASH_VALUE)

    const currentCalendarList = [
        ...prevDayList,
        ...currentDayList,
        ...nextDayList,
    ]

    const weekCalendarList = currentCalendarList.reduce(
        (acc: number[][], cur, idx) => {
            const chunkIndex = Math.floor(idx / DAY_OF_WEEK)
            if (!acc[chunkIndex]) {
                acc[chunkIndex] = []
            }
            acc[chunkIndex].push(cur)
            return acc
        },
        []
    )

    return {
        weekCalendarList: weekCalendarList,
        currentDate: currentDate,
        setCurrentDate: setCurrentDate,
    }
}

export default useCalendar
