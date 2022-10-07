import React from "react";
import AppLayout from "../components/AppLayout";
import TopLayout from "../components/index/TopLayout";
import MiddleLayout from "../components/index/MiddleLayout";
import BottomLayout from "../components/index/Bottomlayout";
import { Row, Col } from "antd";
import Image from "next/image";

const Home = () => {
  return (
    <AppLayout>
      {/* <TopLayout /> */}
      <Row gutter={8}>
        <Col
          xs={18}
          md={12}
          style={{
            textAlign: "center",
            position: "relative",
            top: 70,
            left: 130,
          }}
        >
          <h2>매일매일 쌓아가는,</h2>
          <h3 style={{ fontWeight: "bold" }}>영단어 외우기</h3>
        </Col>
        <Col xs={18} md={6}>
          <Image src="/images/study.png" alt="ye" width="250" height="180" />
        </Col>
      </Row>
      <MiddleLayout />
      <br />
      <BottomLayout />
    </AppLayout>
  );
};

export default Home;
