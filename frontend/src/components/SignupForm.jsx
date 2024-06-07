import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { getUser, setIsLoading } = useGlobalContext();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (confirm === password){
        const form = { email, password };
      await axios.post("http://localhost:5000/api/user/signup", form);
      setIsLoading(true);
      await getUser();
      navigate("/");
      } else{
        setError("Passwords don't match")
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <FormStyled onSubmit={handleSubmit}>
      <h1>StockSmart</h1>
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
        <label htmlFor="">Confirm Password:</label>
        <input
          type="Password"
          placeholder="confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>
      <button type="submit">Signup</button>
      <span>
        Already have an account? <a href="/login">Login</a>
      </span>
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
  height: 60%;
  width: 30%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--white);
  padding: 15px;

  h1 {
    font-family: "Dancing Script", cursive;
    font-size: 2.2vw;
    color: var(--red);
  }

  label {
    color: var(--dark);
    margin: 10px 0 10px 0;
  }

  .form-inputs {
    display: flex;
    flex-direction: column;
  }

  button {
    color: var(--dark);
  }

  span {
    color: var(--dark);
  }
  a {
    color: var(--red);
  }
`;

export default Form;
