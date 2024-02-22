import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppPage, LoginPage } from "../pages/index";
import ProtectedViews from "./ProtectedViews";

const Views = () =>  {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedViews />}>
          <Route path="*" element={<AppPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Views;
