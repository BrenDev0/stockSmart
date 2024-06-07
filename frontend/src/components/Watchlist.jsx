import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useWatchlistContext } from "../context/WatchlistContext";
styled;

const Watchlist = () => {
  const { watchlist, getWatchlists, deleteFromWatchlist,selectedWl, setSelectedWl } = useWatchlistContext();
  const [dropdown, setDropdown] = useState(false);
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    getWatchlists();
  }, []);
  return (
    <WlStyled>
      <HeadStyled>
        <div className="selected">
          <span>
            {typeof selectedWl === "object" ? selectedWl.name : selectedWl}
          </span>
          <i
            className="fa-solid fa-chevron-down"
            onClick={() => (dropdown ? setDropdown(false) : setDropdown(true))}
          ></i>
          {selectedWl.tickers ? (
            <i className="fa-solid fa-pen-to-square" onClick={() => editMode ? setEditMode(false) : setEditMode(true)}></i>
          ) : null}
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
                      setSelectedWl(wl);
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
      {selectedWl.tickers
        ? selectedWl.tickers
            .sort((a, b) => a.ticker.localeCompare(b.ticker))
            .map((wli) => {
              return (
                <WliStyled key={wli._id}>
                  <span>{wli.ticker.toUpperCase()}</span>
                  {
                    editMode ?
                    <i className="fa-solid fa-trash-can" onClick={() => deleteFromWatchlist(selectedWl._id, wli._id) }></i>
                    : 
                    <span>
                    <i className="fa-solid fa-dollar-sign"></i> {wli.mark}
                  </span>
                  }

                </WliStyled>
              );
            })
        : null}
    </WlStyled>
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
  box-shadow: 2px 3px 5px var(--light);
`;

const WliStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background: var(--light);
  padding: 15px;
  margin: 10px 0 10px 0;
`;
const WlStyled = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;

  i {
    cursor: pointer;
  }
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

  .wli {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    border-radius: 10px;
    background: var(--dark);
    padding: 15px;
  }
`;

export default Watchlist;
