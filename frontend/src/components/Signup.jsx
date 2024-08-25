import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '..';

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, gender: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col justify-center items-center gap-2 border-[#67e8f9] bg-white border-[1px] w-[370px] mx-auto p-5 rounded-lg shadow-md my-24">
      <h1 className="text-2xl font-semibold font-sans mb-4">Signup</h1>

      <input
        type="text"
        value={user.fullName}
        onChange={(e) => setUser({ ...user, fullName: e.target.value })}
        placeholder="Full Name"
        className="input input-bordered input-accent w-full max-w-xs outline-none"
        style={{ outline: 'none' }}

      />

      <input
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
        className="input input-bordered input-accent w-full max-w-xs outline-none"
        style={{ outline: 'none' }}

      />

      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
        className="input input-bordered input-accent w-full max-w-xs outline-none"
        style={{ outline: 'none' }}

      />

      <input
        type="password"
        value={user.confirmPassword}
        onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
        placeholder="Confirm Password"
        className="input input-bordered input-accent w-full max-w-xs outline-none"
        style={{ outline: 'none' }}

      />

      <div className="flex gap-4 my-3 ml-0">
        <input
          type="radio"
          name="gender"
          value="male"
          checked={user.gender === "male"}
          onChange={handleChange}
          className="radio radio-info"
          style={{ outline: 'none' }}

        />
        <label>Male</label>

        <input
          type="radio"
          name="gender"
          value="female"
          checked={user.gender === "female"}
          onChange={handleChange}
          className="radio radio-info"
          style={{ outline: 'none' }}

        />
        <label>Female</label>
      </div>

      <button className="border-[1px] border-[#67e8f9] px-4 py-2 rounded-md hover:bg-[#79d9e6] w-full bg-[#67e8f9] hover:shadow-md">
        Signup
      </button>

      <div className="flex justify-center items-center gap-2 mt-2 text-sm">
        <p>Already have an account?</p>
        <Link to="/login">
          <span className="text-blue-600">Login</span>
        </Link>
      </div>
    </form>
  );
}

export default Signup;
