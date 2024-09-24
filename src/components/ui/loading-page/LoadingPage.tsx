
export const LoadingPage = () => {
    return (
        <div className="fade-in mt-2 z-40 relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
            <div className="flex items-center justify-center min-h-64 p-1 bg-gray-100 min-w-screen">
                <div className="flex space-x-1 animate-pulse">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                </div>
            </div>
        </div>
    )
}
