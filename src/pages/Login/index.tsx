import { useState } from "react";
import loginService from "../../services/loginService";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // State variables to handle input values and form submission
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // // Log form values to the console
    // console.log("Email:", email);
    // console.log("Password:", password);
    // // You can add form validation or API request here
    const result = await loginService.login(email, password);
    console.log(result);

    const token = result.accessToken;
    localStorage.setItem("token", token);
    navigate("/products");
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <form onSubmit={handleSubmit} style={{ width: "300px" }}>
        <h2>Login</h2>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        <button
          type="submit"
          style={{ padding: "10px 15px", width: "100%", cursor: "pointer" }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
