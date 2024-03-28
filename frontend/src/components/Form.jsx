import React from "react";
import styled from "styled-components";

const Form = () => {
  return (
    <FormStyled>
      <div className="form-inputs">
        <label htmlFor="">Email:</label>
        <input type="text" placeholder="Email" />
      </div>
      <div className="form-inputs">
        <label htmlFor="">Password:</label>
        <input type="text" placeholder="Password" />
      </div>
      <button>Login</button>
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
