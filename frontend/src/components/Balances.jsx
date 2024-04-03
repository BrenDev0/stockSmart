import React from "react";
import styled from "styled-components";

const Balances = ({ account, cash }) => {
  return (
    <BalancesStyled>
      <div className="account">
        <span>Account</span>
        <div>
          <i className="fa-solid fa-dollar-sign"></i>
          <span>{account}</span>
        </div>
      </div>
      <div className="cash">
        <span>Cash</span>
        <div>
          <i className="fa-solid fa-dollar-sign"></i>
          <span>{cash}</span>
        </div>
      </div>
    </BalancesStyled>
  );
};

const BalancesStyled = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  height: 100%;

  .cash {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background: var(--light);
    border: 2px solid var(--dark);
    width: 45%;
    height: 100%;
    border-radius: 10px;
  }
  .account {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background: var(--light);
    border: 2px solid var(--dark);
    width: 45%;
    height: 100%;
    border-radius: 10px;
  }
`;

export default Balances;
