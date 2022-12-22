import type { NextPage } from "next";
import React from "react";
import WebGLCanvas from "../components/threeComponents/WebGLCanvas";

const IndexPage: NextPage = () => {
  return (
    <>
      <WebGLCanvas />
    </>
  );
};

export default IndexPage;
