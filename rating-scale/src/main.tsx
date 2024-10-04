import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "react-international-phone/style.css";
import "yet-another-react-lightbox/styles.css";

import { BrowserRouter, useRoutes } from "react-router-dom";
import router from "./routes/main.tsx";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BackdropLoader,
  BackdropLoaderProvider,
} from "./components/backdropLoader/backdropLoader.tsx";

import "react-responsive-pagination/themes/classic.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BackdropLoaderProvider>
          <BackdropLoader>
            <Main />
          </BackdropLoader>
        </BackdropLoaderProvider>

        {/* <BackdropLoader /> */}
        <Toaster position="top-right" richColors closeButton />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

export default function Main() {
  const content = useRoutes(router);
  return <div>{content}</div>;
}
