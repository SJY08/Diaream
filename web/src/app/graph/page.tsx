"use client"

import NightService from "@/api/nights"
import Header from "@/components/common/header"
import Graph_component from "@/components/graph/graph"
import { useEffect, useState } from "react"

function Graph() {
    const [sleeping, setSleeping] = useState<{ date: string; time: number }[]>(
        []
    )
    const [stat, setStatic] = useState<{ date: string; time: number }[]>([])

    const getData = async () => {
        try {
            const data = (await NightService.get()).slice(0, 7).reverse()
            const stat_data = await NightService.getStat()

            const formattedData = data.map((v) => ({
                date: v.date.split("T")[0],
                time: Math.round(v.sleep_duration / 60),
            }))

            const formattedStat = stat_data.map((v) => ({
                date: v.sleep_date.split("T")[0],
                time: Math.round(v.avg_sleep_hours),
            }))

            setSleeping(formattedData)
            setStatic(formattedStat)
        } catch (e) {
            console.error("데이터 불러오기 실패", e)
        }
    }

    const avg = stat.map((v) => v.time).reduce((a, b) => a + b, 0) / stat.length

    useEffect(() => {
        getData()
        console.log(stat)
    }, [])

    return (
        <>
            <Header />
            <div className="relative top-12 w-full flex flex-col items-center">
                <div className="w-1/2 flex flex-col gap-8 mt-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-extrabold">수면 그래프</h1>
                        <p>이곳에서 수면 그래프를 확인해요!</p>
                    </div>

                    <h3>최근 수면시간 평균은 {avg}시간 이에요 !</h3>

                    <div>
                        <Graph_component
                            title="최근 기록된 수면시간"
                            data={sleeping}
                        />
                        <Graph_component
                            title="유저 평균 수면시간"
                            data={stat}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Graph
