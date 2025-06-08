import { Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login/Login";
import SignupPage from "./components/Signup/Signup";
import UserDashboard from "./components/User/userDashboard"; // <-- Import this
import Chatbot from "./components/User/chatBot"; // <-- Import this
import BuyMeds from "./components/User/buyMeds"; // <-- Import this
import Profile from "./components/Profile/Profile";
import History from "./components/User/history";
// import Messages from "./components/Chats/Message/Messages";
// import DoctorDashboard from "./components/Doctor/DoctorDashboard"; // Optional: Replace if needed

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup/:role" element={<SignupPage />} />
      <Route path="/user/*" element={<UserDashboard />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/buy-meds" element={<BuyMeds />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/user/history" element={<History />} />
      {/* <Route path="/user/messages" element={<Messages />} /> */}


      {/* <Route path="/doctor" element={<DoctorDashboard />} /> */}
    </Routes>
  );
}

export default App;
