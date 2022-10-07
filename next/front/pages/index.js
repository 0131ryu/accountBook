import React from "react";
import AppLayout from "../components/AppLayout";
import TopLayout from "../components/index/TopLayout";
import MiddleLayout from "../components/index/MiddleLayout";
import BottomLayout from "../components/index/Bottomlayout";
import { List, Row, Col, Input, Button, Checkbox } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Image from "next/image";

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const data = [
  {
    title: "Ant Design Title 1",
    subTitle: "subTitle 1",
  },
  {
    title: "Ant Design Title 2",
    subTitle: "subTitle 2",
  },
  {
    title: "Ant Design Title 3",
    subTitle: "subTitle 3",
  },
  {
    title: "Ant Design Title 4",
    subTitle: "subTitle 4",
  },
];

const Home = () => {
  return (
    <AppLayout>
      <TopLayout />
      <MiddleLayout />
      <br />
      <BottomLayout />
    </AppLayout>
  );
};

export default Home;
