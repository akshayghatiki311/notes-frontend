import React, { useState } from "react";
import { login, register } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      const success = await register(email, password);
      if (success) {
        alert("Registration successful! Please login.");
        setIsRegistering(false); // Switch to login form
      } else {
        alert("Registration failed!");
      }
    } else {
      const success = await login(email, password);
      if (success) {
        window.location.href = "/dashboard";
      } else {
        alert("Login failed!");
      }
    }
  };

  return (
    <>
      <Navbar showTabs={false} />
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 mt-16">
        <h1 className="text-2xl font-bold mb-4">{isRegistering ? "Register" : "Login"}</h1>
        <Input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between mt-4">
          <Button type="submit">{isRegistering ? "Register" : "Login"}</Button>
          <Button type="button" variant="secondary" onClick={() => setIsRegistering(!isRegistering)}>
            {isRegistering ? "Switch to Login" : "Switch to Register"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default Login;