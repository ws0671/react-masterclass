import React from "react";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { theme, darkTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { themeAtom } from "./recoil_state";

function ThemeCotainer() {
  const mode = useRecoilValue(themeAtom);

  return (
    <ThemeProvider theme={mode ? theme : darkTheme}>
      <App />
    </ThemeProvider>
  );
}

export default ThemeCotainer;
