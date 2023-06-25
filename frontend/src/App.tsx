import React from 'react'
import Dashboard from './pages/Dashboard/Dashboard'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Task from './pages/Task/Task'
import Auth from './pages/Auth/Auth'
import { useSelector } from "react-redux"
import { RootState } from "./redux/store"
import { Navigate } from "react-router-dom"
import { useLoadingWithRefresh } from "./hook/useWithLoading"
import Detail from './pages/Detail/Detail';
function App() {

  const { isAuthenticated } = useSelector((state: RootState) => state.authSlice)
  useLoadingWithRefresh()
  return (
    <BrowserRouter>
      <React.Fragment>
        <Routes>
          {!isAuthenticated && <Route path='/' element={<Auth />} />}
          {isAuthenticated && <Route path='/task' element={<Task />} />}
          {isAuthenticated && <Route path='/dashboard' element={<Dashboard />} />}
          {isAuthenticated && <Route path='/details' element={<Detail />} />}
          <Route path="*" element={<Navigate to={
            isAuthenticated ? window.location.pathname === "/" ? "/dashboard" : window.location.pathname : "/"
          } />} />
        </Routes>

      </React.Fragment>
      <Toaster
        position="top-right"
      />
    </BrowserRouter>
  )
}

export default App