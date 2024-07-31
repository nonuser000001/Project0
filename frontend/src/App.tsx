import LoginPage from "./pages/main/LoginPage";
import DashBoardPage, { loader as DashPageLoader } from "./pages/main/DashBoardPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddPage from "./pages/main/AddPage";
import InfoPage from "./pages/main/InfoPage";
import { WhoIsCtx } from "./store/WhoIsCtx";
import { loader as AddLoader } from "./pages/main/AddPage";
import ThemeProvider from "./store/ThemeModeCtx";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  {
    path: "DashBoardPage/:userId",
    element: <DashBoardPage />,
    loader: DashPageLoader,
  },
  { path: "Add/:userId", element: <AddPage />, loader: AddLoader },
  { path: "info", element: <InfoPage /> },
]);

function App() {
  return (
    <ThemeProvider>{
      <WhoIsCtx.Provider value={{ WhoIs: "" }}>
        <RouterProvider router={router} />
      </WhoIsCtx.Provider>}
    </ThemeProvider>
  );
}

export default App;
