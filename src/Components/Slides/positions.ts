import React from "react";

const leftPosition: React.CSSProperties = {
  top: 0,
  bottom: 0,
  right: "auto",
};

const rightPosition: React.CSSProperties = {
  top: 0,
  bottom: 0,
  left: "auto",
};

const topPosition: React.CSSProperties = {
  bottom: "auto",
  left: 0,
  right: 0,
};

const bottomPosition: React.CSSProperties = {
  top: "auto",
  left: 0,
  right: 0,
};

export const positions = {
  top: topPosition,
  right: rightPosition,
  bottom: bottomPosition,
  left: leftPosition,
};
