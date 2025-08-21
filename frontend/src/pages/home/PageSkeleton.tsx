export default function  PageSkeleton() {
    return <div className="animate-pulse">
        {/* Category Cards Skeleton */}
        <div className="mb-8 flex space-x-3">
            {Array.from({length: 5}).map((_, i) => (
                <div key={i} className="h-10 w-28 rounded-lg bg-gray-200 dark:bg-gray-700"/>
            ))}
        </div>

        {/* Title Skeleton */}
        <div className="mb-6 h-8 w-48 rounded bg-gray-200 dark:bg-gray-700"/>

        {/* Item Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({length: 9}).map((_, i) => (
                <div key={i} className="h-32 w-full rounded-2xl bg-gray-200 dark:bg-gray-700"/>
            ))}
        </div>
    </div>
}