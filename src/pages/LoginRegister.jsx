import React, { useState } from "react";
import "./LoginRegister.css"; 

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? "Doctor Login" : "Doctor Registration"}</h2>

        <form className="auth-form">
          {!isLogin && (
            <input type="text" placeholder="Full Name" required />
          )}
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>

        <p onClick={toggleForm} className="toggle-text">
          {isLogin
            ? "Don’t have an account? Register here"
            : "Already registered? Login here"}
        </p>
      </div>
    </div>
  );
}

export default LoginRegister;
