import React, { useState, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import router from "./router";

function App() {
	const content = useRoutes(router);

	return <>{content}</>;
}

export default App;
