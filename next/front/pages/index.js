import React from "react";
import AppLayout from "../components/AppLayout";
import TopLayout from "../components/index/TopLayout";
import MiddleLayout from "../components/index/MiddleLayout";

const Home = () => {
  return (
    <AppLayout>
      <TopLayout />
      <MiddleLayout />
      Home
    </AppLayout>
  );
};

export default Home;
