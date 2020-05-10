import React, { Component } from 'react';
import { Drawer, Layout, Menu, Space, Row, Col, Typography } from 'antd';

const { Text } = Typography;
const { Header } = Layout;

class Navbar extends Component {
  state = {
    drawerVisible: false,
    width: window.innerWidth
  };

  componentDidMount() {
    window.addEventListener("resize", () => this.setState({ width: window.innerWidth }));
  }

  MyMenu = (props) => {
    if (props.visible)
      return (
        <Header style={{ padding: 0 }}>
          <Menu className="bg-header" theme="dark" mode={props.vertical ? "vertical" : "horizontal"} defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
      );
    else return null;
  }

  render() {
    const { width } = this.state;

    return (
      <div className="bg-header">
        <Row className="container" justify="space-between">
          <Col className="logo" onClick={() => window.location = "/song-recommender"}>
            <Space align="baseline">
              <i className="icofont-music-alt icofont-2x gray"></i>
              <Text className="gray" style={{ fontSize: 23, fontWeight: 800 }}>Song Recommender</Text>
            </Space>
          </Col>
          <Col style={width <= 575 && { marginTop: 4, padding: 15 }}>
            <Drawer
              title="Navigation"
              placement="left"
              closable={false}
              onClose={() => this.setState({ drawerVisible: false })}
              visible={this.state.drawerVisible}
            >
              <this.MyMenu vertical={true} visible={width > 575 ? false : true} />
            </Drawer>
            <i onClick={() => this.setState({ drawerVisible: true })} className={`icofont-navigation-menu icofont-2x gray header-margin ${width > 575 && "invisible"}`} />
            <this.MyMenu visible={width > 575 ? true : false} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Navbar;
