import React from "react";

function ExpensiveComponent({ value }) {
  console.log("子组件渲染！");
  return <div>ExpensiveComponent value:{value}</div>;
}

export default React.memo(ExpensiveComponent);
