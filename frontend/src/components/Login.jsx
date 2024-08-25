import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
import { BASE_URL } from '..';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }
  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col justify-center items-center gap-2 border-[#67e8f9] bg-white border-[1px] w-[370px] mx-auto p-5 rounded-lg shadow-md my-24">
      <h1 className="text-2xl font-semibold font-sans mb-4">Login</h1>

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

      <button className="border-[1px] border-[#67e8f9] px-4 py-2 rounded-md hover:bg-[#79d9e6] w-full bg-[#67e8f9] hover:shadow-md">
        Login
      </button>

      <div className="flex justify-center items-center gap-2 mt-2 text-sm">
        <p>Don't have account ? </p>
        <Link to="/signup">
          {" "}
          <span className="text-blue-600">Register</span>{" "}
        </Link>
      </div>
    </form>
  )
}

export default Login