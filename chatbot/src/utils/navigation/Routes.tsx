import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { Welcome } from "../../pages/welcome";
import { Santa } from "../../pages/santa";

export const AppRoutes: FC = () => {
  return(
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/santa" element={<Santa />} />
    </Routes>
  )
}