import React from "react";

const Skeleton = ({ width, height, br, data, dataStyle }) => {
  const skeletonStyle = {
    width: width,
    height: height,
    borderRadius: br,
  };
  return (
    <div className="skeleton" style={skeletonStyle}>
      {data && <span style={dataStyle}>{data}</span>}
    </div>
  );
};

export default Skeleton;
