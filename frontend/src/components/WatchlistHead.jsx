import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";
styled;

const WatchlistHead = () => {
  const { watchlist } = useGlobalContext();
  const [selectedWl, setSelectedWl] = useState("Select a watchlist");
  const [dropdown, setDropdown] = useState(false);
  return (
    <HeadStyled>
      <div className="selected">
        <span>
          {typeof selectedWl === "object" ? selectedWl.name : selectedWl}
        </span>
        <i
          className="fa-solid fa-chevron-down"
          onClick={() => (dropdown ? setDropdown(false) : setDropdown(true))}
        ></i>
      </div>
      <div>
        {dropdown && (
          <ul className="list">
            {watchlist.map((wl) => {
              return (
                <li
                  key={wl._id}
                  className="list-data"
                  onClick={() => {
                    console.log(wl);
                    setSelectedWl({
                      name: wl.name,
                      id: wl._id,
                      tickers: [...wl.tickers],
                    });
                    setDropdown(false);
                  }}
                >
                  {wl.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </HeadStyled>
  );
};

const HeadStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background: var(--dark);
  padding: 15px;

  .selected {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
  }
  .list {
    display: block;
    background: var(--white);
    position: absolute;
    z-index: 1;
    border-radius: 10px;
    border: 2px solid var(--dark);
  }

  .list-data {
    display: block;
    text-align: left;
    padding: 7px;
    width: 100%;
    color: var(--dark);
  }

  .list-data:hover {
    background: var(--light);
    color: var(--white);
    cursor: pointer;
  }
`;

export default WatchlistHead;
