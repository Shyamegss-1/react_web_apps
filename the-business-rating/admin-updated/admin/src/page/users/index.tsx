import UserTable from "./sections/userTable";

export default function Index() {
  return (
    <div className="w-full px-4 py-6 mx-auto xl:w-5/6 md:w-4/5">
      <h1 className=" bg-zinc-600 inline-block px-4 py-2 rounded-lg text-white text-4xl font-semibold my-10  underline">
        Reveiw Users
      </h1>
      <div className=" border bg-white shadow-sm rounded-2xl p-5 ">
        <div className="flex flex-col">
          <div className="-m-1.5 overflow-x-auto">
            <div className="p-1.5 min-w-full inline-block align-middle">
              <div className="overflow-hidden">
                <UserTable />
              </div>
            </div>
          </div>
        </div>

        <nav
          aria-label="Page navigation example"
          className=" mt-5 flex justify-end"
        >
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-green-900 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-green-500  dark:border-green-900 dark:text-white dark:hover:bg-green-900 dark:hover:text-white dark:bg-green-900"
              >
                Previous
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 border border-gray-700"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 border border-gray-700"
              >
                2
              </a>
            </li>

            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 border border-gray-700"
              >
                3
              </a>
            </li>

            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 border border-gray-700"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 border border-gray-700"
              >
                5
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-green-900 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-green-500  dark:border-green-900 dark:text-white dark:hover:bg-green-900 dark:hover:text-white dark:bg-green-900"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
