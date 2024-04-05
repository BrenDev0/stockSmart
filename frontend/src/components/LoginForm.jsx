import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = { email, password };
      const success = await axios.post(
        "http://localhost:5000/api/user/login",
        form
      );
      if (success) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <FormStyled onSubmit={handleSubmit}>
      <div className="form-inputs">
        <label htmlFor="">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-inputs">
        <label htmlFor="">Password:</label>
        <input
          type="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
      {error && <span style={{ color: "red" }}>{error}</span>}
    </FormStyled>
  );
};

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  border-radius: 15px;
  height: 35%;
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(239, 35, 60, 0.8);
  padding: 15px;

  .form-inputs {
    display: flex;
    flex-direction: column;
  }
`;

export default Form;
