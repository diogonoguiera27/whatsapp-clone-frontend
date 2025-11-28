import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import NoMatch from "../pages/NoMatch";

export const Rotas: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="*" element={<NoMatch />} />
  </Routes>
);
