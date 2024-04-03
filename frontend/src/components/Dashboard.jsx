import styled from "styled-components";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { money } from "../utils/money.format";
import { quoteKey } from "../keys";
import PositionsHead from "./PositionsHead";
import PositionRow from "./PositionRow";
import Balances from "./Balances";
import WatchlistHead from "./WatchlistHead";

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
    editTrade,
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

  return (
    <DashboardStyled>
      <div className="watchlist">
        <WatchlistHead />
      </div>
      <div className="control-panel">
        <div className="balances">
          <Balances />
        </div>
      </div>
      <div className="positions">
        <PositionsHead />
        {positions.map((pos) => {
          return (
            <PositionRow
              _id={pos._id}
              key={pos._id}
              ticker={pos.ticker}
              icon={pos.icon}
              shares={pos.shares}
              averageFill={money.format(pos.open)}
              invested={money.format(pos.cost)}
              mark={money.format(pos.mark)}
              pl={
                pos.orientation === "LONG"
                  ? money.format(
                      pos.profit + (pos.mark - pos.open) * pos.shares
                    )
                  : money.format(
                      pos.profit + (pos.open - pos.mark) * pos.shares * -1
                    )
              }
              style={
                pos.orientation === "LONG" && pos.mark - pos.open > 0
                  ? { color: "green" }
                  : pos.orientaion === "LONG" && pos.mark - pos.open < 0
                  ? { color: "red" }
                  : pos.orientation === "SHORT" && pos.mark - pos.open < 0
                  ? { color: "green" }
                  : { color: "red" }
              }
            />
          );
        })}
      </div>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div`
  display: flex;
  align-items: center;
  height: 90%;
  width: 100%;

  .watchlist {
    width: 25%;
    height: 100%;
    padding: 25px 15px 25px 15px;
  }
  .control-panel {
    width: 25%;
    height: 100%;
    padding: 25px 15px 25px 15px;
  }

  .balances {
    height: 30%;
  }
  .positions {
    width: 50%;
    height: 100%;
    padding: 25px 15px 25px 15px;
  }
`;

export default Dashboard;
