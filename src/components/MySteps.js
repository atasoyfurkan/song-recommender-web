import React, { Component } from 'react';
import { Steps, Button, message, Select, Row, Col, Form, Slider, InputNumber } from "antd";

const { Option } = Select;
const { Step } = Steps;

class MySteps extends Component {
  state = {
    current: 0,
    steps: [{ title: "Liked Genres" }, { title: "Disliked Genres" }, { title: "Features" }],
    likedGenres: [],
    dislikedGenres: [],
    features: { danceability: 0, energy: 0, mode: 0, speechiness: 0, acousticness: 0, instrumentalness: 0, liveness: 0, valence: 0 }
  };

  render() {
    const { current, steps } = this.state;

    return (
      <React.Fragment>
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
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => this.setState((state) => ({ current: state.current - 1 }))}>
              Previous
            </Button>
          )}
        </div>
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
            <Option key={"Rock"}>Rock</Option>
            <Option key={"Metal"}>Metal</Option>
            <Option key={"Hip Hop"}>Hip Hop</Option>
            <Option key={"Rap"}>Rap</Option>
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
            <Option key={"Rock"}>Rock</Option>
            <Option key={"Metal"}>Metal</Option>
            <Option key={"Hip Hop"}>Hip Hop</Option>
            <Option key={"Rap"}>Rap</Option>
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
                  min={1}
                  max={10}
                  step={0.1}
                  onChange={(value) => this.setState((state) => ({ features: { ...state.features, [name]: value } }))}
                  value={typeof this.state.features[name] === 'number' ? this.state.features[name] : 0}
                />
              </Col>
              <Col sm={5} xs={5}>
                <InputNumber
                  min={1}
                  max={20}
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
