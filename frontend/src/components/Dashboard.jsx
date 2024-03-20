import styled from "styled-components";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { money } from "../utils/money.format";
import { quoteKey } from "../keys";

const Dashboard = () => {
  const {
    positions,
    watchlist,
    getPositions,
    updatePosition,
    deleteTrade,
    getWatchlists,
    addToWatchlist,
    editWatchlist,
    setEditWatchlist,
    deleteFromWatchlist,
    selectedWl,
    setSelectedWl,
  } = useGlobalContext();

  //state
  const [listDisplay, setListDisplay] = useState(false);

  const [watchlistInput, setWatchlistInput] = useState("");

  //effects
  useEffect(() => {
    getPositions();
    getWatchlists();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      for (let i = 0; i < positions.length; i++) {
        fetch(
          `https://finnhub.io/api/v1/quote?symbol=${positions[i].ticker}&token=${quoteKey}`
        )
          .then((res) => res.json())
          .then((data) => {
            updatePosition(positions[i]._id, { mark: data.c });
          })
          .catch((error) => console.log(error));
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [positions]);

  //list styles
  const showList = { display: "flex" };
  const hideList = { display: "none" };
  function listHandle() {
    listDisplay ? setListDisplay(false) : setListDisplay(true);
  }

  return (
    <DashboardStyled>
      <div className="watchlist">
        <div className="watchlist-head">
          <div className="watchlist-select">
            {editWatchlist ? (
              <input
                value={watchlistInput}
                type="text"
                required
                onChange={(e) => setWatchlistInput(e.target.value)}
              />
            ) : (
              <p>{selectedWl.name ? selectedWl.name : selectedWl}</p>
            )}
            {editWatchlist ? (
              <i
                className="fa-solid fa-plus"
                onClick={() => {
                  watchlistInput === ""
                    ? null
                    : addToWatchlist(selectedWl._id, watchlistInput);
                  setWatchlistInput("");
                }}
              ></i>
            ) : (
              <i
                className="fa-solid fa-pen-to-square"
                style={selectedWl === "Watchlists" ? { display: "none" } : null}
                onClick={() => setEditWatchlist(true)}
              ></i>
            )}

            {editWatchlist ? (
              <i
                className="fa-solid fa-xmark"
                onClick={() => setEditWatchlist(false)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-chevron-down"
                onClick={() => listHandle()}
              ></i>
            )}
          </div>
          <div className="list" style={listDisplay ? showList : hideList}>
            {watchlist.map((wl) => {
              return (
                <div
                  className="watchlist-con"
                  id={wl._id}
                  key={wl._id}
                  onClick={() => {
                    setSelectedWl(wl);
                    listHandle();
                  }}
                >
                  <p>{wl.name.toUpperCase()}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="watchlist-data-con">
          {editWatchlist
            ? selectedWl.tickers.map((wli) => {
                return (
                  <div className="watchlist-data" key={wli._id} value={wli._id}>
                    <p>{wli.ticker.toUpperCase()}</p>
                    <i
                      className="fa-regular fa-trash-can"
                      onClick={() =>
                        deleteFromWatchlist(selectedWl._id, { _id: wli._id })
                      }
                    ></i>
                  </div>
                );
              })
            : selectedWl !== "Watchlists"
            ? selectedWl.tickers
                .sort((a, b) => a.ticker.localeCompare(b.ticker))
                .map((wli) => {
                  return (
                    <div
                      className="watchlist-data"
                      key={wli._id}
                      value={wli._id}
                    >
                      <p>{wli.ticker.toUpperCase()}</p>
                      <p>{money.format(wli.mark)}</p>
                    </div>
                  );
                })
            : null}
        </div>
      </div>
      <div className="positions">
        <div className="chart-head">
          <div className="head-data" id="ticker">
            <p>Ticker</p>
          </div>
          <div className="head-data">
            <p>Shares</p>
          </div>
          <div className="head-data">
            <p>Average Fill</p>
          </div>
          <div className="head-data">
            <p>Invested</p>
          </div>
          <div className="head-data">
            <p>Mark</p>
          </div>
          <div className="head-data">
            <p>P/L</p>
          </div>
          <div className="head-data">
            <p>Action</p>
          </div>
        </div>
        {positions.map((pos) => {
          return (
            <div
              className="position-con"
              key={pos._id}
              id={pos._id}
              value={pos.ticker}
            >
              <div className="position-data" id="ticker">
                <p>{pos.ticker.toUpperCase()}</p>
              </div>
              <div className="position-data">
                <p>{pos.shares}</p>
              </div>
              <div className="position-data">
                <p>{money.format(pos.cost / pos.shares)}</p>
              </div>
              <div className="position-data">
                <p>{money.format(pos.cost)}</p>
              </div>
              <div className="position-data">
                <p>{money.format(pos.mark)}</p>
              </div>
              <div className="position-data">
                {pos.mark - pos.open > 0 ? (
                  <p style={{ color: "green" }}>
                    {money.format((pos.mark - pos.open) * pos.shares)}
                  </p>
                ) : (
                  <p style={{ color: "red" }}>
                    {money.format((pos.mark - pos.open) * pos.shares)}
                  </p>
                )}
              </div>
              <div className="position-data">
                <div className="icons">
                  <i className="fa-solid fa-money-bill-trend-up"></i>
                  <i className="fa-solid fa-chart-simple"></i>
                  <i
                    className="fa-regular fa-trash-can"
                    onClick={() => deleteTrade(pos._id)}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;

  .watchlist {
    display: flex;
    flex-direction: column;
    width: 30%;

    .watchlist-head {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      border-radius: 10px;
      background: rgba(43, 45, 66, 0.8);
      padding: 25px;
      .list {
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 24.5%;
        left: 4%;
        border-radius: 10px;
        .watchlist-con {
          border-bottom: 1px solid rgba(43, 45, 66, 0.8);
          width: 350px;
          padding: 15px;
          background: rgb(141, 153, 174);
          width: 100%;
        }
        .watchlist-con:hover {
          cursor: pointer;
          transform: scale(1.1);
          transition: all 0.5s ease-in-out;
        }
      }
      .watchlist-select {
        width: 75%;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .watchlist-select i:hover {
        cursor: pointer;
        transform: scale(1.2);
        transition: all 0.5s ease-in-out;
      }
    }

    .watchlist-data {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-radius: 10px;
      background: rgba(239, 35, 60, 0.75);
      padding: 25px;
      margin-top: 5px;
    }

    .watchlist-data:hover {
      cursor: pointer;
    }
    .watchlist-data i:hover {
      transform: scale(1.2);
      transition: all 0.5s ease-in-out;
    }
  }

  .positions {
    display: flex;
    flex-direction: column;
    width: 65%;

    .chart-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-radius: 10px;
      background: rgba(43, 45, 66, 0.8);
      padding: 25px;

      .head-data {
        width: 150px;
        text-align: center;
        border-left: 2px solid rgba(141, 153, 174, 0.8);
      }
      .head-data p {
        color: rgb(237, 242, 244);
      }
      #ticker {
        border: none;
      }
    }
    .position-con {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      border-radius: 10px;
      background: rgba(141, 153, 174, 0.8);
      padding: 25px;
      margin-top: 5px;
      .position-data {
        width: 150px;
        text-align: center;
        border-left: 2px solid rgba(43, 45, 66, 0.8);
        .icons {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .icons i:hover {
          cursor: pointer;
          transform: scale(1.2);
          transition: 0.5s;
        }
      }
    }
    #ticker {
      border: none;
    }
  }
  .positions p {
    color: #2b2d42;
  }
`;
export default Dashboard;
