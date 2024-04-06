import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { money } from "../utils/money.format";
import { useTradeContext } from "../context/TradeContext";

const Balances = ({ cash }) => {
  const { positions } = useTradeContext();
  const [account, setAccount] = useState();
  const [pl, setPl] = useState();

  useEffect(() => {
    let total = 0;
    let profit = 0;
    for (let pos of positions) {
      total += pos.profit + pos.cost;
      pos.orientation === "LONG"
        ? money.format(
            (profit += pos.profit + (pos.mark - pos.open) * pos.shares)
          )
        : money.format(
            (profit += pos.profit + (pos.open - pos.mark) * pos.shares * -1)
          );
    }
    setAccount(money.format(total));
    setPl(money.format(profit));
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
        <span>P/L</span>
        {pl ? (
          <span style={pl > 0 ? { color: "green" } : { color: "red" }}>
            {pl}
          </span>
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
