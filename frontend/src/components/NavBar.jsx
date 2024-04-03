import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";

const NavBar = () => {
  const [actions, setActions] = useState(false);
  const { setTradeModal } = useGlobalContext();

  return (
    <NavBarStyled>
      <h1>StockSmart</h1>
      <div className="search-bar">
        <input type="text" name="search" id="search" />
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li id="dropdown">
          <span
            onMouseEnter={(e) => setActions(true)}
            onMouseLeave={(e) => setActions(false)}
          >
            Actions
          </span>
          {actions && (
            <ul
              id="actions-list"
              onMouseLeave={(e) => setActions(false)}
              onMouseEnter={(e) => setActions(true)}
            >
              <li className="list-data" onClick={(e) => setTradeModal(true)}>
                Trade
              </li>
              <li className="list-data">Deposit</li>
              <li className="list-data">Withdrawl</li>
              <li className="list-data">Log out</li>
            </ul>
          )}
        </li>
        <li>
          <a href="/history">History</a>
        </li>
        <li>
          <a href="/news">News</a>
        </li>
        <li>
          <a href="/watchlists">Watchlists</a>
        </li>
        <li>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </li>
      </ul>
    </NavBarStyled>
  );
};

const NavBarStyled = styled.nav`
  background: var(--red);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  h1 {
    font-family: "Dancing Script", cursive;
    font-size: 2.2vw;
    margin-left: 20px;
  }

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  li {
    margin-right: 20px;
    cursor: pointer;
  }
  i {
    margin-left: 7px;
  }

  #actions-list {
    display: block;
    background: var(--white);
    position: absolute;
    z-index: 1;
    border-radius: 10px;
  }

  .list-data {
    display: block;
    text-align: left;
    padding: 7px;
    width: 100%;
    color: var(--dark);
  }

  .list-data:hover {
    background: var(--red);
    color: var(--white);
    cursor: pointer;
  }
`;

export default NavBar;
