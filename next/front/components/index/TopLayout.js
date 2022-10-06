import React from "react";
import { Row, Col, Image } from "antd";
import PropTypes from "prop-types";

const TopLayout = () => {
  return (
    <div>
      <Row gutter={8}>
        <Col xs={18} md={15}>
          매일매일 쌓아가는, 영단어 외우기
        </Col>
        <Col xs={18} md={3}>
          {/* <Image width={200} src="./study.png" alt="" /> */}
          이미지 넣기
        </Col>
      </Row>
    </div>
  );
};

TopLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default TopLayout;
