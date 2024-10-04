import { HambergerMenu } from "iconsax-react";

export default function UserTable() {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr className="">
          <th
            scope="col"
            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
          >
            s.no
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
          >
            Name
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
          >
            email
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
          >
            reg date
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
          >
            status
          </th>

          <th
            scope="col"
            className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
          >
            Action
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-200 ">
        {[...Array(10)].map((_, e) => (
          <tr className="hover:bg-gray-100 " key={e}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
              {e + 1}.
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
              John Brown
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800  ">
              45
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800  ">
              45
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800  ">
              New York No. 1 Lake Park
            </td>
            <td className="px-6 space-x-2 py-4 whitespace-nowrap text-end text-sm font-medium">
              <span
                className={`inline-block relative rounded-lg border p-1 cursor-pointer`}
              >
                <HambergerMenu color="#000" size={16} variant="Outline" />
                {e === 6 && (
                  <div className="absolute p-3 border-dashed rounded-lg border-2 h-auto w-[200px] -top-10 z-50 right-0 bg-white">
                    <div>
                      <ul className="space-y-1">
                        <li>
                          <a
                            href="#"
                            className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5 opacity-75"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                              />
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                            </svg>

                            <span className="text-sm font-medium">
                              {" "}
                              General{" "}
                            </span>
                          </a>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5 opacity-75"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>

                            <span className="text-sm font-medium"> Teams </span>
                          </a>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5 opacity-75"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                              />
                            </svg>

                            <span className="text-sm font-medium">
                              {" "}
                              Billing{" "}
                            </span>
                          </a>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5 opacity-75"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>

                            <span className="text-sm font-medium">
                              {" "}
                              Invoices{" "}
                            </span>
                          </a>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="size-5 opacity-75"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              stroke-width="2"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                              />
                            </svg>

                            <span className="text-sm font-medium">
                              {" "}
                              Account{" "}
                            </span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
