import React, { Component } from 'react';
import { Steps, Button, message, Select, Row, Col, Form, Slider, InputNumber, Spin, List, Typography } from "antd";
import { discoverPlaylist } from "../services/solution";

const { Option } = Select;
const { Step } = Steps;
const { Title } = Typography;


class MySteps extends Component {
  state = {
    current: 0,
    steps: [{ title: "Liked Genres" }, { title: "Disliked Genres" }, { title: "Features" }],
    likedGenres: [],
    dislikedGenres: [],
    features: { danceability: 0, energy: 0, mode: 0, speechiness: 0, acousticness: 0, instrumentalness: 0, liveness: 0, valence: 0 },
    loading: false,
    done: false,
    playlist: []
  };

  handleSubmit = async () => {
    this.setState({ loading: true });

    const playlist = discoverPlaylist(this.state.likedGenres, this.state.dislikedGenres, this.state.features);

    setTimeout(() => {
      this.setState({ loading: false, done: true, playlist: playlist })
      message.success("Process done");
    }, 500);
  };



  render() {
    const { current, steps } = this.state;

    console.log(this.state.loading);

    return (
      <React.Fragment>
        <section className={this.state.done && "d-none"}>
          <Spin spinning={this.state.loading}>

            <Steps current={current}>
              {steps.map(item => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>

            <this.FirstStepContent />
            <this.SecondStepContent />
            <this.ThirdStepContent />

            <div className="steps-action mt-4">
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => this.setState((state) => ({ current: state.current + 1 }))}>
                  Next
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={this.handleSubmit}>
                  Done
                </Button>
              )}
              {current > 0 && (
                <Button style={{ margin: '0 8px' }} onClick={() => this.setState((state) => ({ current: state.current - 1 }))}>
                  Previous
                </Button>
              )}
            </div>
          </Spin>
        </section>
        <section className={!this.state.done && "d-none"}>
          <Title className={this.state.playlist[0] ? "" : "text-center"} level={2}>Playlist</Title>
          <List
            itemLayout="horizontal"
            dataSource={this.state.playlist}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  title={`${item.artistNames[0]} - ${item.trackName}`}
                />
              </List.Item>
            )}
          />

        </section>
      </React.Fragment>
    );
  }

  FirstStepContent = () => {
    return (
      <Row className={`${this.state.current !== 0 && "d-none"} mt-5`} align="center">
        <Col lg={8} md={10} span={20}>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select Liked Genres"
            onChange={(value) => this.setState({ likedGenres: value })}
          >
            <Option key={"rock"}>Rock</Option>
            <Option key={"metal"}>Metal</Option>
            <Option key={"hip hop"}>Hip Hop</Option>
            <Option key={"rap"}>Rap</Option>
          </Select>
        </Col>
      </Row >
    );
  }

  SecondStepContent = () => {
    return (
      <Row className={`${this.state.current !== 1 && "d-none"} mt-5`} align="center">
        <Col lg={8} md={10} span={20}>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select Disliked Genres"
            onChange={this.handleSelectChange}
          >
            <Option key={"rock"}>Rock</Option>
            <Option key={"metal"}>Metal</Option>
            <Option key={"hip hop"}>Hip Hop</Option>
            <Option key={"rap"}>Rap</Option>
          </Select>
        </Col>
      </Row >
    );
  }

  ThirdStepContent = () => {
    return (
      <Row className={`${this.state.current !== 2 && "d-none"} mt-5`} justify="space-between">
        {Object.keys(this.state.features).map((name, i) =>
          <Col lg={10} span={24}>
            <Row>
              <Col sm={7} xs={7}>
                <Form.Item name={name} label={name[0].toUpperCase() + name.substr(1)}></Form.Item>
              </Col>
              <Col sm={12} xs={10}>
                <Slider
                  min={0}
                  max={10}
                  step={0.1}
                  onChange={(value) => this.setState((state) => ({ features: { ...state.features, [name]: value } }))}
                  value={typeof this.state.features[name] === 'number' ? this.state.features[name] : 0}
                />
              </Col>
              <Col sm={5} xs={5}>
                <InputNumber
                  min={0}
                  max={10}
                  style={{ margin: '0 16px' }}
                  value={this.state.features[name]}
                  onChange={(value) => this.setState((state) => ({ features: { ...state.features, [name]: value } }))}
                />
              </Col>
            </Row>
          </Col>
        )}
      </Row >
    );
  }
}


export default MySteps;
