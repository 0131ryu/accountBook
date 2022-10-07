import React from "react";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import Image from "next/image";

const TopLayout = () => {
  return (
    <div>
      <Row gutter={8}>
        <Col xs={18} md={12} style={{ margin: "30", textAlign: "center" }}>
          <h2>매일매일 쌓아가는</h2>
          <h3 style={{ fontWeight: "bold" }}>영단어 외우기</h3>
        </Col>
        <Col xs={18} md={6}>
          <Image src="/images/study.png" alt="ye" width="250" height="180" />
        </Col>
      </Row>
    </div>
  );
};

TopLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default TopLayout;
