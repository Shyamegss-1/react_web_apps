/* eslint-disable react/no-unescaped-entities */
import { routes } from "../constants/router-path";

export default function NotFound() {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-green-200 text-9xl">404</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>

        <p className="mt-4 text-gray-500">We can't find that page.</p>

        <a
          href={routes.BASE}
          className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white base-bg rounded hover:bg-violet-700 focus:outline-none focus:ring"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
