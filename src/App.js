import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import MySteps from "./components/MySteps";
import { Layout } from "antd";

const { Footer, Content } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout>
        <Navbar />
        <Content style={{ paddingBottom: 1000 }} className="bg-content">
          <div className="container mt-5">
            <MySteps />
          </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default App;
