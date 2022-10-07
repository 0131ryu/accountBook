import React from "react";
import { List, Row, Col, Input, Button, Checkbox } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

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

const BottomLayout = () => {
  return (
    <div>
      <Row justify="space-evenly">
        <Col span={7}>
          <List
            header={
              <div>
                🥉 Easy
                <div>
                  <Row span={3}>
                    <Input
                      placeholder="영어 입력"
                      style={{ width: 85, height: 37, marginLeft: 10 }}
                    />
                    <Input
                      placeholder="한글 입력"
                      style={{ width: 85, height: 37, marginLeft: 10 }}
                    />
                    <Button style={{ width: 70, height: 37, marginLeft: 10 }}>
                      등록
                    </Button>
                  </Row>
                </div>
              </div>
            }
            bordered
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  button={<Button>테스트</Button>}
                  title={
                    <>
                      <Button>
                        <Checkbox onChange={onChange} />
                        {item.title} {item.subTitle}
                        <EditOutlined />
                        <DeleteOutlined />
                      </Button>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={7}>
          <List
            header={
              <div>
                🥉 Easy
                <div>
                  <Row span={3}>
                    <Input
                      placeholder="영어 입력"
                      style={{ width: 85, height: 37, marginLeft: 10 }}
                    />
                    <Input
                      placeholder="한글 입력"
                      style={{ width: 85, height: 37, marginLeft: 10 }}
                    />
                    <Button style={{ width: 70, height: 37, marginLeft: 10 }}>
                      등록
                    </Button>
                  </Row>
                </div>
              </div>
            }
            bordered
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  button={<Button>테스트</Button>}
                  title={
                    <>
                      <Button>
                        <Checkbox onChange={onChange} />
                        {item.title} {item.subTitle}
                        <EditOutlined />
                        <DeleteOutlined />
                      </Button>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={7}>
          <List
            header={
              <div>
                🥉 Easy
                <div>
                  <Row span={3}>
                    <Input
                      placeholder="영어 입력"
                      style={{ width: 85, height: 37, marginLeft: 10 }}
                    />
                    <Input
                      placeholder="한글 입력"
                      style={{ width: 85, height: 37, marginLeft: 10 }}
                    />
                    <Button style={{ width: 70, height: 37, marginLeft: 10 }}>
                      등록
                    </Button>
                  </Row>
                </div>
              </div>
            }
            bordered
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  button={<Button>테스트</Button>}
                  title={
                    <>
                      <Button>
                        <Checkbox onChange={onChange} />
                        {item.title} {item.subTitle}
                        <EditOutlined />
                        <DeleteOutlined />
                      </Button>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

BottomLayout.prototype = {
  children: PropTypes.node.isRequired,
};

export default BottomLayout;
