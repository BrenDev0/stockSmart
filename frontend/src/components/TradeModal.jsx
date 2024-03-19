import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect, useState } from "react";
import { detailKey, quoteKey } from "../keys";
import { money } from "../utils/money.format";

const TradeModal = () => {
  const { setTradeModal } = useGlobalContext();

  const [fullDisplay, setFullDisplay] = useState(false);

  const [form, setForm] = useState({
    ticker: "",
    shares: "",
    open: "",
    cost: "",
    mark: "",
  });

  const [search, setSearch] = useState("");
  const [details, setDetails] = useState({});
  const [quote, setQuote] = useState({});
  const [icon, setIcon] = useState("");

  const comapnySearch = async (ticker) => {
    try {
      const [res1, res2] = await Promise.all([
        fetch(
          `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${quoteKey}`
        ),
        fetch(
          `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${detailKey}`
        ),
      ]);

      const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
      const icon = await fetch(
        `${data2.results.branding.icon_url}?apiKey=${detailKey}`
      );

      setQuote(data1);
      setDetails(data2.results);
      setIcon(icon);
      setSearch("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setForm({ ...form, cost: form.shares * form.open });
  }, [form.shares, form.open]);

  return (
    <TradeModalStyled>
      {fullDisplay ? (
        <form className="trade-form">
          <i className="fa-solid fa-x" onClick={() => setTradeModal(false)}></i>

          <div className="form-con">
            <div className="inputs-con">
              <div className="form-inputs">
                <p>Shares:</p>
                <input
                  type="number"
                  required
                  id="shares"
                  value={form.shares}
                  onChange={(e) => setForm({ ...form, shares: e.target.value })}
                />
              </div>
              <div className="form-inputs">
                <p>Price:</p>
                <input
                  type="number"
                  required
                  id="price"
                  value={form.open}
                  onChange={(e) => setForm({ ...form, open: e.target.value })}
                />
              </div>
              <div className="btn-con">
                <button id="buy">Buy</button>
                <button id="sell">Sell</button>
              </div>
            </div>
            <div className="details-con">
              <div className="logo-con">
                <p>{details.ticker}</p>
                <img src={icon.url} alt="" />
              </div>
              <div className="info-con">
                <p>{details.name}</p>

                <p>{details.sic_description}</p>
              </div>
              <div className="quote-con">
                <p>Price:</p>
                <p className="price">{money.format(quote.c)}</p>
              </div>
              <div className="url">
                <a href={`${details.homepage_url}`} target="_blank">
                  {details.homepage_url}
                </a>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <form action="" className="trade-form">
          <i className="fa-solid fa-x" onClick={() => setTradeModal(false)}></i>
          <div className="con">
            <div className="form-inputs">
              <p>Search Company:</p>
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <i
                  className="fa-solid fa-magnifying-glass"
                  onClick={() => {
                    comapnySearch(search.toUpperCase()), setFullDisplay(true);
                  }}
                ></i>
              </div>
            </div>
          </div>
        </form>
      )}
    </TradeModalStyled>
  );
};

const TradeModalStyled = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(43, 45, 66, 0.9);
  position: absolute;
  .inputs-con {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: column;
    height: 100%;
  }
  .form-con {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 95%;
  }
  .details-con {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  .logo-con {
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;

    img {
      width: 100px;
    }
    p {
      color: rgb(43, 45, 66);
      margin: 5px;
    }
  }
  .info-con {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    p {
      color: rgb(43, 45, 66);
    }
  }
  .quote-con {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    p {
      color: rgb(43, 45, 66);
    }
    .price {
      padding-left: 45px;
    }
  }
  .url {
    margin-bottom: 10px;
    a {
      color: rgb(43, 45, 66);
    }
  }
  .trade-form {
    width: 50%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    padding: 15px;
    background: #f4f3ee;
    border-radius: 10px;
    .con {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    .search-bar i {
      margin-left: 10px;
      font-size: 25px;
    }
    .form-inputs {
      margin: 15px;
      padding: 10px;
    }
    .form-inputs input {
      height: 40px;
    }
    .form-inputs p {
      color: rgb(43, 45, 66);
    }
    i {
      color: rgba(43, 45, 66, 0.8);
      align-self: flex-end;
    }

    i:hover {
      cursor: pointer;
      transform: scale(1.1);
    }

    .btn-con {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin-bottom: 10px;

      #buy {
        background: rgba(21, 231, 23, 0.8);
      }

      #sell {
        background: rgba(239, 35, 60, 0.75);
      }

      button {
        width: 100px;
        height: 40px;
        border-radius: 7px;
        padding: 5px;
      }
      button:hover {
        cursor: pointer;
      }

      button:active {
        transform: scale(1.1);
        transition: all 0.3s ease-in-out;
      }
    }
  }
`;

export default TradeModal;
