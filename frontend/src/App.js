
import Mainpage from "./pages/Mainpage";
import Login from "./pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/home" element={  <Mainpage/>}/>
    <Route path="/login" element={  <Login/>}/>
    
    </Routes>
    </BrowserRouter>
  );
}

export default App;
