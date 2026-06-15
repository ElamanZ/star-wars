import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import { store } from "./store/store";
import App from "./App";
import "./index.css";
import "antd/dist/reset.css";

const darkTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: "#FFE81F",
    colorBgContainer: "rgba(10, 15, 30, 0.95)",
    colorBgElevated: "#0d1225",
    fontFamily: "'Exo 2', sans-serif",
    borderRadius: 8,
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider theme={darkTheme}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);