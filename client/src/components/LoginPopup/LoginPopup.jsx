import React, { useState } from "react";
import { assets } from "../../assets/assets";
import "./LoginPopup.css";
import { toast } from "react-toastify";
import axios from "axios";
import validator from "validator";
import { useContext } from "react";
import { StoreItemContext } from "../../context/StoreItemContext";

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");
  const url = import.meta.env.VITE_BASE_URL;
  const {setToken} = useContext(StoreItemContext);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    condition: false,
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { name, email, password } = data;

    // Common validations
    if (currState === "Sign Up" && (!name || !email || !password  || !data.condition)) {
      toast.error("All fields are required.");
      return;
    }
    if (!email || !validator.isEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }
    if (!password || password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    const apiUrl =
      currState === "Sign Up"
        ? `${url}/api/user/register`
        : `${url}/api/user/login`;
    const payload =
      currState === "Sign Up"
        ? { name, email, password }
        : { email, password };

    try {
      await toast.promise(
        axios.post(apiUrl, payload),
        {
          pending: currState === "Sign Up" ? "Creating account..." : "Logging in...",
          success: {
            render({ data }) {
              if (data?.data?.success) {
                setShowLogin(false);
                setData({
                  name: "",
                  email: "",
                  password: "",
                });
                setToken(data.data.token);
                localStorage.setItem("token", data.data.token);
                return data.data.message;
              } else {
                throw new Error(data?.data?.message || "Internal Server Error");
              }
            }
          },
          error: {
            render({ data }) {
              return data?.response.data?.message || "Request failed. Please try again.";
            },
          },
        }
      );
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-popup">
      <div className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currState == "Sign Up" && (
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              required
            />
          )}
          <input
            type="email"
            placeholder="Your Email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            required
          />
        </div>
        <button onClick={handleLogin}>{currState == "Sign Up" ? "Create Account" : "Login"}</button>
        <div
          className="login-popup-condition"
          onClick={() => setData((prev) => ({ ...prev, condition: !prev.condition }))}
          style={{ cursor: "pointer" }}
        >
          <input
            type="checkbox"
            name="condition"
            checked={data.condition}
            onChange={(e) =>
              setData((prev) => ({ ...prev, condition: e.target.checked }))
            }
            required
            onClick={(e) => e.stopPropagation()}
          />
          <p>
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>
        {currState == "Login" && (
          <p>
            Create a new Account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        )}
        {currState == "Sign Up" && (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => {
                setCurrState("Login");
              }}
            >
              Login here
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
