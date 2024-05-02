import React from "react";
import styled from "styled-components";
import Skeleton from "./Skeleton";

const NewsPageSkeleton = () => {
  return (
    <SkeletonStyled>
      <Skeleton width={"100%"} height={"7%"} />
      <div className="charts-skeleton">
        <Skeleton width={"20%"} height={"100%"} br={"10px"} />
        <Skeleton width={"20%"} height={"100%"} br={"10px"} />
        <Skeleton width={"20%"} height={"100%"} br={"10px"} />
        <Skeleton width={"20%"} height={"100%"} br={"10px"} />
      </div>
      <div className="news-skeleton">
        <Skeleton width={"95%"} height={"20%"} br={"10px"} />
        <Skeleton width={"95%"} height={"20%"} br={"10px"} />
        <Skeleton width={"95%"} height={"20%"} br={"10px"} />
        <Skeleton width={"95%"} height={"20%"} br={"10px"} />
      </div>
    </SkeletonStyled>
  );
};

const SkeletonStyled = styled.div`
  width: 100%;
  height: 100%;
  .charts-skeleton {
    margin-top: 2%;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: 20%;
  }

  .news-skeleton {
    margin-top: 2%;
    width: 100%;
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;

export default NewsPageSkeleton;
