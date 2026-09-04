import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";



export const VerifyOtp = () => {

    const location = useLocation();


  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://nextcart-backend-kxc0.onrender.com/api/auth/verify-otp",
        {
          email,
          otp,
        },
        {
          withCredentials: true,
        }
      );

      alert(res.data.message || "OTP Verified Successfully!");
      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "OTP Verification Failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">
          Verify OTP
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Enter the OTP sent to your email.
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center tracking-[0.5em] text-lg focus:outline-none focus:ring-2 focus:ring-black"
            maxLength={6}
            required
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

