import styled from "styled-components";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { money } from "../utils/money.format";
import { quoteKey } from "../keys";
import PositionsHead from "./PositionsHead";
import PositionRow from "./PositionRow";
import Balances from "./Balances";
import Watchlist from "./Watchlist";
import NewsArticle from "./NewsArticle";
import { useTradeContext } from "../context/TradeContext";
import { useWatchlistContext } from "../context/WatchlistContext";

const Dashboard = () => {
  const { positions, updatePosition, getPositions } = useTradeContext();

  const { getWatchlists, selectedWl, setSelectedWl } = useWatchlistContext();

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
            updatePosition(positions[i]._id, {
              mark: data.c,
            });
          })
          .catch((error) => console.log(error));
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [positions]);

  return (
    <DashboardStyled>
      <div className="watchlist">
        <Watchlist />
      </div>
      <div className="control-panel">
        <div className="balances">
          <Balances />
        </div>
        <div className="news">
          <NewsArticle />
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
  justify-content: space-evenly;
  align-items: center;
  height: 90%;
  max-width: 100%;

  .watchlist {
    flex-basis: 25%;
    height: 100%;
    padding: 15px;
    overflow: scroll;
  }

  .watchlist::-webkit-scrollbar {
    display: none;
  }
  .control-panel {
    flex-basis: 25%;
    height: 100%;
    padding: 15px;
    overflow: scroll;
  }

  .control-panel::-webkit-scrollbar {
    display: none;
  }

  .balances {
    height: 30%;
  }
  .positions {
    flex-basis: 50%;
    height: 100%;
    padding: 15px;
    overflow: scroll;
  }

  .positions::-webkit-scrollbar {
    display: none;
  }
`;

export default Dashboard;
