/* eslint-disable react/prop-types */
export default function CustomSkeleton({ row = 4, height = 8 }) {
  return (
    <div className=" animate-pulse">
      <ul className="mt-5 space-y-3">
        {[...Array(row)].map((_, e) => (
          <li
            className={`w-full h-${height} bg-gray-200 rounded-md dark:bg-gray-300`}
            key={e}
          ></li>
        ))}
      </ul>
    </div>
  );
}
