const ResCardSkeleton = () => (
  <div className="border-[0.8px] border-gray-600 bg-slate-300 flex justify-between shadow-2xl py-2 rounded-lg w-full px-3 animate-pulse">
    <div className="w-1/2 px-2 space-y-2">
      <div className="h-4 bg-gray-400 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
        <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
      </div>
      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    </div>
    <div className="h-32 w-32 bg-gray-400 rounded"></div>
  </div>
);
export default ResCardSkeleton;
