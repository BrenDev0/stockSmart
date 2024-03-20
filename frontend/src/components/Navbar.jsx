import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";

const NavBar = ({ setDisplay }) => {
  const { setTradeModal } = useGlobalContext();

  return (
    <NavBarStyled>
      <div className="nav-links" id="balances">
        <div className="cash-account">
          <p>Cash: $ 0</p>
          <p>Account: $ 0</p>
        </div>
        <div className="adjust-balance">
          <i className="fa-solid fa-money-bill-transfer"></i>
        </div>
      </div>
      <div className="nav-links" id="dashboard" onClick={() => setDisplay(1)}>
        <p>Dashboard</p>
      </div>
      <div className="nav-links" id="Trade" onClick={() => setTradeModal(true)}>
        <p>Trade</p>
      </div>
      <div className="nav-links" id="watchlists">
        <p>Watchlists</p>
      </div>
      <div className="nav-links" id="news">
        <p>News</p>
      </div>
      <div
        className="nav-links"
        id="trade-history"
        onClick={() => setDisplay(5)}
      >
        <p>History</p>
      </div>
      <div className="nav-links" id="search-bar">
        <input type="text" id="search" />
        <button>search</button>
      </div>
    </NavBarStyled>
  );
};

const NavBarStyled = styled.nav`
  display: flex;
  justify-content: space-between;

  padding: 15px;
  .nav-links {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 10px;
    margin-top: 10px;
    width: 125px;
    height: 75px;
    padding: 5px;

    background: rgba(239, 35, 60, 0.75);
  }
  .nav-links:hover {
    cursor: pointer;
    transform: scale(1.2);
    transition: 0.5s;
  }
  #balances {
    width: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    background: rgba(43, 45, 66, 0.8);
    transform: none;
    .cash-account {
      padding-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .adjust-balance {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  #search-bar {
    width: 350px;
    background: rgba(43, 45, 66, 0.8);
    transform: none;
  }
`;

export default NavBar;
