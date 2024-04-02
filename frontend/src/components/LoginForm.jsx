import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = { email, password };
      const success = await axios.post("");
      if (success) {
        const verified = await axios.get(
          "http://localhost:5000/api/user",
          form
        );

        verified.data.status ? navigate("/") : navigate("/login"),
          setError(verified.data.message);
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <FormStyled>
      <div className="form-inputs">
        <label htmlFor="">Email:</label>
        <input type="email" placeholder="Email" />
      </div>
      <div className="form-inputs">
        <label htmlFor="">Password:</label>
        <input type="Password" placeholder="Password" />
      </div>
      <button>Login</button>
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
