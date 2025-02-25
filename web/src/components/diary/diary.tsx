interface props {
    title?: string
    content?: string
    date?: string
    sleep?: string
    wake?: string
}

function Diary_component({ title, content, date, sleep, wake }: props) {
    return (
        <>
            <div className="w-full h-20 border-t cursor-pointer">
                <div className="flex gap-4">
                    <div className="flex gap-2">
                        <h1 className="font-semibold text-2xl text-slate-700">
                            {title}
                        </h1>
                        <p className="mt-auto font-medium text-slate-500">
                            {sleep} ~ {wake}
                        </p>
                    </div>

                    <p className="ml-auto text-1xl font-medium text-slate-400">
                        {date}
                    </p>
                </div>
                <div className="overflow-hidden text-ellipsis text-slate-500">
                    {content}
                </div>
            </div>
        </>
    )
}

export default Diary_component
