import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  document.body.appendChild(div);

  // ✅ Use `createRoot` instead of `ReactDOM.render`
  const root = createRoot(div);
  root.render(<App />);

  // ✅ Use `.unmount()` instead of `unmountComponentAtNode`
  root.unmount();
});
