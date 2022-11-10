import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { RecoilRoot } from "recoil";
import ThemeCotainer from "./ThemeCotainer";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeCotainer />
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
