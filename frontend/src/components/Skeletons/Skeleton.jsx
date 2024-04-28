import React from "react";

const Skeleton = (width, height, br, data) => {
  const skeletonStyle = {
    width: width,
    height: height,
    borderRadius: br,
  };
  return (
    <div className="skeleton" style={skeletonStyle}>
      <span>{data}</span>
    </div>
  );
};

export default Skeleton;
