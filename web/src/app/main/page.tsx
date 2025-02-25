"use client"

import Header from "@/components/common/header"
import Calendar from "@/components/main/calendar"

function Main() {
    return (
        <>
            <Header />
            <div className="relative top-12">
                <div className=" w-full h-32 bg-gradient-to-b from-blue-600 to-blue-800"></div>

                <div className="w-full mt-4 flex items-center flex-col gap-4">
                    <Calendar />
                </div>
            </div>
        </>
    )
}

export default Main
