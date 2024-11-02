import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import PasswordInput from "../Common/passwordInput";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from "../../store/state";

function Register() {
  const register = store((state) => state.register);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const isRegister = await register(username, email, password);
    setTimeout(() => {
      isRegister && navigate("/login");
    }, 3000);
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-50">
      <div className="sm:w-[450px] w-[310px]">
        <form
          className="flex flex-col w-full gap-4 p-6 bg-white border-2 border-gray-200 rounded-lg shadow-md sm:gap-6 sm:p-10"
          onSubmit={handleSignUp}
        >
          <div className="mb-6">
            <h1 className="mb-2 text-3xl font-semibold text-center sm:text-4xl">Welcome</h1>
          </div>
          <TextField
            className=""
            value={username}
            label="Username"
            variant="outlined"
            fullWidth
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="true"
          />
          <TextField
            className=""
            value={email}
            label="Email"
            variant="outlined"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="true"
          />
          <PasswordInput password={password} setPassword={setPassword} label="Password" />
          <button
            className="py-4 mt-4 font-semibold text-white bg-purple-500 rounded hover:bg-purple-600 active:bg-purple-500"
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <div className="flex justify-end mt-2">
        <p>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
      <ToastContainer  position="bottom-right" autoClose={2000} />
    </div>
  );
}

export default Register;