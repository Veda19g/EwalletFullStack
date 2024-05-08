import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Send } from "./pages/Send";
import { Dashboard } from "./pages/Dashboard";
import { Request } from "./pages/Request";
import  Home  from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AcceptRequests from "./pages/AcceptRequests";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/send" element={<Send />} />
        <Route path="/request" element={<Request/>} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/requests" element={<AcceptRequests/>} />
      </Routes>
    </Router>
  );
}

export default App;

