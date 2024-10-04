export default function Index() {
  return (
    <div>
      <div className=" mt-5 ml-5">
        <div className="flex">
          {/* <div className="bg-white mb-10 rounded-xl w-auto p-5 "></div> */}
        </div>

        <div>
          <div>
            <span className="text-2xl font-bold bg-green-300 px-4 py-1 rounded-lg ">
              User Stats
            </span>
          </div>
          <div className="w-full flex gap-3  mt-5">
            {[...Array(3)].map((_, e) => (
              <StatCard key={e} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div>
            <span className="text-2xl font-bold bg-green-300 px-4 py-1 rounded-lg ">
              Business Listing Stats
            </span>
          </div>
          <div className="w-full flex gap-3 mt-5">
            {[...Array(4)].map((_, e) => (
              <StatCard key={e} />
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div>
            <span className="text-2xl font-bold bg-green-300 px-4 py-1 rounded-lg ">
              Other Stats
            </span>
          </div>
          <div className="w-full flex gap-3 mt-5">
            {[...Array(2)].map((_, e) => (
              <StatCard key={e} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const StatCard = () => {
  return (
    <div className="w-fit rounded-[25px] bg-white p-8 aspect transition-transform hover:-translate-y-2 cursor-pointer">
      <div className="h-12">
        <svg
          className=" fill-white stroke-blue-500 h-10 w-10"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
          />
        </svg>
      </div>
      <div className="my-2">
        <h2 className="text-4xl font-bold">
          <span>2680</span> +
        </h2>
      </div>

      <div>
        <p className="mt-2 font-sans text-base font-medium text-gray-500">
          Put The Client First
        </p>
      </div>
    </div>
  );
};
