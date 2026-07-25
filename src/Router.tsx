import { lazy, Suspense } from 'react'
import { Route, Routes } from "react-router";
import App from './App.tsx'

const EmployeeList = lazy(() => import('./pages/EmployeeList.tsx'));

function Router() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path={"/"} element={<App />} />
        <Route path={"/employee-list"} element={<EmployeeList />} />
      </Routes>
    </Suspense>
  )
}

export default Router;
