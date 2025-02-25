"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { ApexOptions } from "apexcharts"

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

interface Data {
    date: string
    time: number
}

interface Props {
    title?: string
    data: Data[]
}

function GraphComponent({ title, data }: Props) {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const options: ApexOptions = {
        xaxis: {
            categories: data.map((item) => item.date),
        },
    }

    const series = [
        {
            name: "time",
            data: data.map((item) => item.time),
        },
    ]

    if (!isClient) return null

    return (
        <div className="w-full">
            <p className="font-semibold text-blue-600 ml-8">{title}</p>
            <ReactApexChart
                options={options}
                series={series}
                type="bar"
                height={350}
            />
        </div>
    )
}

export default GraphComponent
