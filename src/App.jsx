import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyBox from "./routes/MyBox";
import Register from "./routes/Register";
import Login from "./routes/Login";
import NotFoundPage from './routes/NotFoundPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MyBox />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </BrowserRouter> 
    </>
  );
}

export default App;
