import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [actions, setActions] = useState(false);
  const [newsDropdown, setNewsDropdown] = useState(false);
  const [modelsDropdown, setModelsDropdown] = useState(false);
  const { setTradeModal, getUser } = useGlobalContext();
  const navigate = useNavigate();

  const logout = async () => {
    await axios.get("http://localhost:5000/api/user/logout");
    getUser();
    navigate("/login");
  };

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
        <li>
          <span
            onMouseEnter={() => setActions(true)}
            onMouseLeave={() => setActions(false)}
          >
            Actions
          </span>
          {actions && (
            <ul
              className="drop-down"
              id="actions-list"
              onMouseLeave={() => setActions(false)}
              onMouseEnter={() => setActions(true)}
            >
              <li className="list-data" onClick={() => setTradeModal(true)}>
                Trade
              </li>
              <li className="list-data">Deposit</li>
              <li className="list-data">Withdrawl</li>
              <li className="list-data" onClick={() => logout()}>
                Log out
              </li>
            </ul>
          )}
        </li>
        <li>
          <a href="/history">History</a>
        </li>
        <li>
          <span
            onMouseEnter={() => setModelsDropdown(true)}
            onMouseLeave={() => setModelsDropdown(false)}
          >
            Models
          </span>
          {modelsDropdown && (
            <ul className="drop-down">
              <li
                className="list-data"
                onMouseEnter={() => setModelsDropdown(true)}
                onMouseLeave={() => setModelsDropdown(false)}
              >
                <a href="/pricing">Pricing Models</a>
              </li>
              <li
                className="list-data"
                onMouseEnter={() => setModelsDropdown(true)}
                onMouseLeave={() => setModelsDropdown(false)}
              >
                <a href="">Valuation Models</a>
              </li>
            </ul>
          )}
        </li>
        <li>
          <span
            onMouseEnter={() => setNewsDropdown(true)}
            onMouseLeave={() => setNewsDropdown(false)}
          >
            News
          </span>
          {newsDropdown && (
            <ul className="drop-down">
              <li
                onMouseEnter={() => setNewsDropdown(true)}
                onMouseLeave={() => setNewsDropdown(false)}
                className="list-data"
              >
                <a href="/news/topnews">TopNews</a>
              </li>
              <li
                onMouseEnter={() => setNewsDropdown(true)}
                onMouseLeave={() => setNewsDropdown(false)}
                className="list-data"
              >
                <a href="/news/crypto">Crypto</a>
              </li>

              <li
                onMouseEnter={() => setNewsDropdown(true)}
                onMouseLeave={() => setNewsDropdown(false)}
                className="list-data"
              >
                <a href="/news/forex">Forex</a>
              </li>
              <li
                onMouseEnter={() => setNewsDropdown(true)}
                onMouseLeave={() => setNewsDropdown(false)}
                className="list-data"
              >
                <a href="/news/merger">Mergers</a>
              </li>
            </ul>
          )}
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
  max-width: 100%;
  box-shadow: 0 5px 5px var(--light);

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

  .drop-down {
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
  .list-data a {
    color: var(--dark);
  }

  .list-data:hover {
    background: var(--red);
    color: var(--white);
    cursor: pointer;
  }

  .drop-down li:last-child {
    border-radius: 0 0 10px 10px;
  }
  .drop-down li:first-child {
    border-radius: 10px 10px 0 0;
  }
`;

export default NavBar;
