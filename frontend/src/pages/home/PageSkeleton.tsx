interface PageSkeletonProps {
    isDarkMode: boolean;
}

export default function PageSkeleton({ isDarkMode }: PageSkeletonProps) {
    return <div className="animate-pulse">
        {/* Category Cards Skeleton */}
        <div className="mb-8 flex space-x-3">
            {Array.from({length: 5}).map((_, i) => (
                <div key={i} className={`h-10 w-28 rounded-lg ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}/>
            ))}
        </div>

        {/* Title Skeleton */}
        <div className={`mb-6 h-8 w-48 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}/>

        {/* Item Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({length: 9}).map((_, i) => (
                <div key={i} className={`h-32 w-full rounded-2xl ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}/>
            ))}
        </div>
    </div>
}
