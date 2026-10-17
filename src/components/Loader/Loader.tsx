import { Skeleton } from "@heroui/react";

export default function Loader() {
  return (
    <div className="shadow-panel space-y-5 rounded-lg bg-white p-4 space-y-2">
      <Skeleton className="h-32 rounded-lg" />
      <div className="space-y-3">
        <Skeleton className="h-3 w-3/5 rounded-lg" />
        <Skeleton className="h-3 w-4/5 rounded-lg" />
        <Skeleton className="h-3 w-2/5 rounded-lg" />
      </div>
    </div>
  )
}
