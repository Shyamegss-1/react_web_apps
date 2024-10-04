import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import NotFound from "./content/notFound";

const SUS = Component => props =>
	(
		<Suspense fallback={<FallBack />}>
			<Component {...props} />
		</Suspense>
	);

const GiftCardPage = React.lazy(() => import("./content/pages/giftcardpage"));
const BookingPage = React.lazy(() => import("./content/pages/bookkingPage"));
const Admin = React.lazy(() => import("./content/pages/admin"));
const Rev = SUS(React.lazy(() => import("./content/pages/reverence")));
const DOC_ADMIN = SUS(React.lazy(() => import("./content/pages/docAdmin")));

function App() {
	const context = useRoutes([
		{
			path: "/cleaner",
			element: <GiftCardPage />,
		},
		{
			path: "/cleaner/booking",
			element: <BookingPage />,
		},
		{
			path: "/cleaner/admin",
			element: <Admin />,
		},
		{
			path: "/cleaner/reverence",
			element: <Rev />,
		},
		{
			path: "/cleaner/doc-admin",
			element: <DOC_ADMIN />,
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);
	return <>{context}</>;
}

export default App;

const FallBack = () => {
	return (
		<div
			className='w-100 d-flex justify-content-center align-items-center'
			style={{ height: "100vh" }}>
			<div className='three-body'>
				<div className='three-body__dot'></div>
				<div className='three-body__dot'></div>
				<div className='three-body__dot'></div>
			</div>
		</div>
	);
};
