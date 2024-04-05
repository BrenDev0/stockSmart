import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";
import { money } from "../utils/money.format";

const Balances = ({ cash }) => {
  const { positions } = useGlobalContext();
  const [account, setAccount] = useState();

  useEffect(() => {
    let total = 0;
    for (let pos of positions) {
      console.log(pos);
      total += pos.profit + pos.cost;
    }
    setAccount(money.format(total));
  }, [positions]);
  return (
    <BalancesStyled>
      <div className="account">
        <span>Account</span>

        {account ? (
          <span>{account}</span>
        ) : (
          <i className="fa-solid fa-dollar-sign"></i>
        )}
      </div>
      <div className="cash">
        <span>Cash</span>

        <span></span>
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
    border: 1px solid var(--dark);
    width: 45%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 2px 3px 10px var(--dark);
  }
  .account {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background: var(--light);
    border: 1px solid var(--dark);
    width: 45%;
    height: 100%;
    border-radius: 10px;
    box-shadow: 2px 3px 10px var(--dark);
  }
`;

export default Balances;
