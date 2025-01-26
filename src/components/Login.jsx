import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("pratham1234@gmail.com");
  const [password, setPassword] = useState("pratham@1234M");
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState("");
  const [isloginform , setIsLoginForm] = useState(false);

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err.message);
      console.error(err?.response?.data);
    }
  };

  const handelSignup = async()=>{
    try {
      const res = await axios.post(BASE_URL + "/signup" , {firstName , lastName , emailId , password} , {withCredentials:true});
      
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      res.status(400).send("error on signUp")
    }
  }
  return (
    <div className="flex justify-center my-28">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{isloginform ? "Login" : "SignUp"}</h2>
          <div>

           { !isloginform &&<> <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label></>}

            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs my-4">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isloginform ? handleLogin : handelSignup}>
              {isloginform ? "Login" : "SignUp" }
            </button>
          </div>
          <p className="m-auto cursor-pointer py-4" onClick={()=>setIsLoginForm((value) => !value)}>{isloginform ? "New User? Signup Here   " : "Existing User? Login Here "}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
