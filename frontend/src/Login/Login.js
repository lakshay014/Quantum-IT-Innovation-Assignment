import React, { useState , useEffect } from 'react';
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      navigate("/dashboard");
    }
  }, [localStorage.getItem('userData')]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      const response = await axios.post('http://127.0.0.1:5000/api/user/login', {
        email,
        password,
      }, config);
  
      const { token, userData } = response.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('userData', JSON.stringify(userData));
  
      toast.success('Login successful!');
  
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
  
      toast.error(`Login failed: ${error.response ? error.response.data.message : 'Unexpected error'}`);
    }
  };
  

  return (
    <div className='Loginpage'>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className=" cb card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5"> <b>Sign In</b></h5>
                <form onSubmit={handleLogin}>
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="rememberPasswordCheck"
                    />
                    <label className="form-check-label" htmlFor="rememberPasswordCheck">
                     <b>Remember password</b> 
                    </label>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                    >
                      Sign in
                    </button>
                  </div>
                  <div className="text-center mt-3">
                    <a href="/forgot-password">Forgot Password?</a>
                  </div>
                  <div className="text-center mt-3">
                   <b> Don't have an account</b>
                    ?{" "}
                    <a href="/signup" onClick={() => navigate("/signup")}>
                      Signup Here
                    </a>
                  </div>
                  <hr className="my-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
