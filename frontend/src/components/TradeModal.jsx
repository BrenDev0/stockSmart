import styled from "styled-components";
import { useGlobalContext } from "../context/GlobalContext";
import { useEffect, useState } from "react";
import { money } from "../utils/money.format";
import { useTradeContext } from "../context/TradeContext";

const TradeModal = () => {
  //button values
  const long = "LONG";
  const short = "SHORT";

  //states
  const {
    setTradeModal,
    setFullDisplay,
    form,
    details,
    icon,
    quote,
    search,
    setSearch,
    fullDisplay,
    setForm,
    companySearch,
    setError,
    error,
    dividendDisplay,
    setDividendDisplay,
  } = useGlobalContext();
  const { newPosition, updatePosition, positions } = useTradeContext();

  const [dividendAmount, setDividendAmount] = useState("");

  //functions

  //add a dividend to position

  const addDividend = () => {
    const position = positions.find((pos) => pos.ticker === details.ticker);
    position.orientation === "LONG"
      ? updatePosition(position._id, {
          profit: position.profit + parseInt(dividendAmount),
        })
      : updatePosition(position._id, {
          profit: position.profit - parseInt(dividendAmount),
        });

    setTradeModal(false);
    setFullDisplay(false);
    setSearch("");
    setDividendAmount("");
    setDividendDisplay(false);
  };

  //open a new trade
  const trade = (direction) => {
    const { shares, open, cost } = form;
    const currentPosition = positions.find((pos) => {
      return pos.ticker === details.ticker;
    });

    const position =
      direction === "LONG"
        ? {
            ticker: details.ticker,
            shares: shares,
            open: open,
            mark: quote.c,
            orientation: direction,
            cost: cost,
            icon: icon,
          }
        : {
            ticker: details.ticker,
            shares: Math.round(0 - shares),
            open: open,
            mark: quote.c,
            orientation: direction,
            cost: cost,
            icon: icon,
          };
    if (shares && cost) {
      if (currentPosition) {
        if (currentPosition.orientation === long) {
          if (direction === short) {
            if (currentPosition.shares > shares) {
              updatePosition(currentPosition._id, {
                shares: parseInt(currentPosition.shares) - parseInt(shares),
                cost: currentPosition.cost - cost,
                profit:
                  (currentPosition.shares - shares) * currentPosition.open -
                  (currentPosition.cost - cost),
              });

              //closed long position
            } else {
              if (currentPosition.shares < shares) {
                setError(
                  `Your Current Position only has ${currentPosition.shares} shares`
                );
                return error;
              } else {
                updatePosition(currentPosition._id, {
                  shares: 0,
                  status: "closed",
                  profit:
                    (currentPosition.shares - shares) * currentPosition.open -
                    (currentPosition.cost - cost),
                });
              }
            }
            //if current position && orientation === long && direction === long
          } else {
            updatePosition(currentPosition._id, {
              shares: parseInt(currentPosition.shares) + parseInt(shares),
              cost: currentPosition.cost + cost,
              open:
                (currentPosition.cost + cost) /
                (parseInt(currentPosition.shares) + parseInt(shares)),
            });
          }
        }
        //if current position && orientaion === short
        else {
          if (direction === long) {
            if (currentPosition.shares < 0 - shares) {
              updatePosition(currentPosition._id, {
                shares: parseInt(currentPosition.shares) + parseInt(shares),
                cost: currentPosition.cost - cost,
                profit:
                  currentPosition.cost -
                  cost -
                  (currentPosition.shares * -1 - shares) * currentPosition.open,
              });
            }
            // closed short  position
            else {
              if (currentPosition.shares > 0 - shares) {
                setError(
                  `Your Current Position only has ${currentPosition.shares} shares`
                );
                return error;
              } else {
                updatePosition(currentPosition._id, {
                  shares: 0,
                  status: "closed",
                  profit:
                    currentPosition.cost -
                    cost -
                    (currentPosition.shares * -1 - shares) *
                      currentPosition.open,
                });
              }
            }
          }
          //current position && orirentaion === short && direction short
          else {
            updatePosition(currentPosition._id, {
              shares: parseInt(currentPosition.shares) - parseInt(shares),
              cost: currentPosition.cost + cost,
              open:
                (currentPosition.cost + cost) /
                (currentPosition.shares - shares),
            });
          }
        }
      } else {
        newPosition(position);
      }
    } else {
      setError("ALL FIEDS REQUIRED");
      return error;
    }

    setTradeModal(false);
    setFullDisplay(false);
    setSearch("");
    setForm({
      ...form,
      shares: "",
      open: "",
    });
  };

  //effects
  useEffect(() => {
    setForm({ ...form, cost: form.shares * form.open });
  }, [form.shares, form.open]);

  return (
    <TradeModalStyled>
      {fullDisplay ? (
        <div className="trade-form">
          {error ? <p id="error">{error}</p> : null}
          <i
            className="fa-solid fa-x"
            onClick={() => {
              setTradeModal(false);
              setFullDisplay(false);
              setSearch("");
              setForm({ ...form, shares: "", open: "" });
              setError("");
            }}
          ></i>

          <div className="form-con">
            {dividendDisplay ? (
              <div className="inputs-con">
                <div className="form-inputs">
                  <p>Dividend Amount:</p>
                  <input
                    type="number"
                    required
                    id="shares"
                    value={dividendAmount}
                    onChange={(e) => {
                      setDividendAmount(e.target.value);
                      setError("");
                    }}
                  />
                </div>

                <div className="btn-con">
                  <button
                    id="sell"
                    value={short}
                    onClick={(e) => {
                      addDividend();
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <div className="inputs-con">
                <div className="form-inputs">
                  <p>Shares:</p>
                  <input
                    type="number"
                    required
                    id="shares"
                    value={form.shares}
                    onChange={(e) => {
                      setForm({ ...form, shares: e.target.value });
                      setError("");
                    }}
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
                  <button
                    id="buy"
                    value={long}
                    onClick={(e) => {
                      trade(e.target.value);
                    }}
                  >
                    Buy
                  </button>
                  <button
                    id="sell"
                    value={short}
                    onClick={(e) => {
                      trade(e.target.value);
                    }}
                  >
                    Sell
                  </button>
                </div>
              </div>
            )}
            <div className="details-con">
              <div className="logo-con">
                <p>{details.ticker}</p>
                <img src={icon} alt="icon/logo" />
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
        </div>
      ) : (
        <div action="" className="trade-form">
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
                    if (search) {
                      companySearch(search.toUpperCase());
                      setFullDisplay(true);
                    } else {
                      null;
                    }
                  }}
                ></i>
              </div>
            </div>
          </div>
        </div>
      )}
    </TradeModalStyled>
  );
};

const TradeModalStyled = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(43, 45, 66, 0.9);
  position: absolute;
  z-index: 2;
  #error {
    position: absolute;
    left: 25%;
    top: 3%;
    color: red;
  }
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
