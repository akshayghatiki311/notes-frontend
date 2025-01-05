import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button"
import { loginUser } from "../services/api";

export default function AuthForm({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      const token = response.token;
      setToken(token);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Collaborative Notes</h2>
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="flex justify-between">
        <Button variant="outline">Register</Button>
        <Button type="submit">Login</Button>
      </div>
    </form>
  );
}
