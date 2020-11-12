import React from "react";

import Header from "./Header";
import Content from "./Content";

const Course = ({ course }) => {
  const {name, parts} = course;

  return (
    <div>
      <Header title={name} />
      <Content content={parts}/>
    </div>
  )
};

export default Course; 