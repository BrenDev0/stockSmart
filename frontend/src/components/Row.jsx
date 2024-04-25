import styled from "styled-components";

const Row = ({ data, tag }) => {
  return (
    <HeadStyled className={tag}>
      {data.map((i) => {
        return (
          <div key={i + tag} className="data">
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
  background: var(--red);
  justify-content: space-between;

  padding: 10px;
  border-radius: 10px;
  margin-bottom: 2px;

  .data {
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 2px solid var(--dark);
    width: 100%;

    span {
      font-size: 0.9vw;
    }
  }
  .data:first-child {
    border: none;
  }
`;

export default Row;
