import React from "react";

const Skeleton = (width, height, br) => {
  const skeletonStyle = {
    width: width,
    height: height,
    borderRadius: br,
  };
  return <div className="skeleton" style={skeletonStyle}></div>;
};

export default Skeleton;
