import Header from "@/components/common/header"
import Graph_component from "@/components/graph/graph"

function Graph() {
    const sleeping = [
        {
            date: "2025-02-14",
            time: 4,
        },
        {
            date: "2025-02-15",
            time: 9,
        },
        {
            date: "2025-02-16",
            time: 7,
        },
        {
            date: "2025-02-17",
            time: 6,
        },
        {
            date: "2025-02-18",
            time: 13,
        },
        {
            date: "2025-02-19",
            time: 8,
        },
    ]

    const sleepAt = [
        {
            date: "2025-02-19",
            time: "23:00",
        },
        {
            date: "2025-02-18",
            time: "04:35",
        },
        {
            date: "2025-02-17",
            time: "23:15",
        },
        {
            date: "2025-02-16",
            time: "21:00",
        },
        {
            date: "2025-02-15",
            time: "03:10",
        },
        {
            date: "2025-02-14",
            time: "00:10",
        },
    ]

    const wake = [
        {
            date: "2025-02-19",
            time: "23:00",
        },
        {
            date: "2025-02-18",
            time: "04:35",
        },
        {
            date: "2025-02-17",
            time: "23:15",
        },
        {
            date: "2025-02-16",
            time: "21:00",
        },
        {
            date: "2025-02-15",
            time: "03:10",
        },
        {
            date: "2025-02-14",
            time: "00:10",
        },
    ]

    return (
        <>
            <Header />
            <div className="relative top-12 w-full flex flex-col items-center">
                <div className="w-1/2 flex flex-col gap-8 mt-6">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-extrabold">수면 그래프</h1>
                        <p>이곳에서 수면 그래프를 확인해요!</p>
                    </div>

                    <div>
                        <Graph_component title="잠잔시간" data={sleeping} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Graph
