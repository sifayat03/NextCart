import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../api";
import { AuthContext } from "../context/AuthContext";
import "../style/auth.css"
import { toast } from "react-toastify";

export const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      toast.success(
        "Registration Successful! Please check your email for the Welcome OTP."
      );

      login(res.data);

           navigate("/verify-otp", {
             state: { email },
          });

    } catch (error) {

      console.error(error);

 const validationError = error.response?.data?.errors?.[0]?.msg;

 const serverMessage = error.response?.data?.message;

  toast.error( validationError ||  serverMessage || "Registration Failed" );
    
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn">
          Register
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};




