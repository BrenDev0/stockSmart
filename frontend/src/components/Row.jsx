import styled from "styled-components";

const Row = ({ data }) => {
  return (
    <HeadStyled>
      {data.map((i) => {
        return (
          <div key={i} className="data">
            <span>{i}</span>
          </div>
        );
      })}
    </HeadStyled>
  );
};

const HeadStyled = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  background: var(--dark);
  padding: 10px;
  border-radius: 10px;

  .data {
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 2px solid var(--red);
    width: 100%;

    span {
      font-size: 1vw;
    }
  }
  .data:first-child {
    border: none;
  }
`;

export default Row;
