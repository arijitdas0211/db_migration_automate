import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {

  return (
    <>
    <Routes>
      {/* <Route path={'/'} element={<Navigate to="/login" />} /> */}
      <Route path={'/'} element={<Navigate to="/home" />} />
      <Route path={'/login'} element={<Login />} />
      <Route path={'/home'} element={<Home />} />
    </Routes>
    </>
  )
}

export default App;