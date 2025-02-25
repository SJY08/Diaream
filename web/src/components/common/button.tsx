interface props {
    children?: React.ReactNode
    act?: boolean
    onClick?: () => void
}

function Button({ children, act = true, onClick }: props) {
    return (
        <button
            onClick={onClick}
            className={`w-full h-9 rounded-md ${
                act ? " bg-blue-500" : " bg-slate-400"
            } text-white font-bold`}
        >
            {children}
        </button>
    )
}

export default Button
