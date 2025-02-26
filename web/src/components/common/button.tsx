interface props {
    children?: React.ReactNode
    act?: string
    onClick?: () => void
}

function Button({ children, act = "blue", onClick }: props) {
    return (
        <button
            onClick={onClick}
            className={`w-full h-9 rounded-md ${
                act == "blue"
                    ? " bg-blue-500"
                    : act == "critical"
                    ? " bg-red-500"
                    : " bg-slate-400"
            } text-white font-bold`}
        >
            {children}
        </button>
    )
}

export default Button
