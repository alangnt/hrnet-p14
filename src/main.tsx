import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App.tsx'
import EmployeeList from "./pages/EmployeeList.tsx";
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"/employee-list"} element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
