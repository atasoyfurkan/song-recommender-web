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
    features: { danceability: 5, energy: 5, mode: 5, speechiness: 5, acousticness: 5, instrumentalness: 5, liveness: 5, valence: 5 },
    loading: false,
    done: false,
    playlist: [],
    allGenres: ["Electro", "Rock", "Jazz", "Dubstep", "Blues", "Techno", "Country Music", "Indie Rock", "Pop", "Hip Hop", "Rap", "Metal"].sort()
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
                  title={item.artistNames[0] + " - " + item.trackName}
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
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Select Liked Genres"
            onChange={(value) => this.setState({ likedGenres: value })}
          >
            {this.state.allGenres.map(genre => <Option key={genre}>{genre}</Option>)}
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
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Select Disliked Genres"
            onChange={this.handleSelectChange}
          >
            {this.state.allGenres.map(genre => <Option key={genre}>{genre}</Option>)}
          </Select>
        </Col>
      </Row >
    );
  }

  ThirdStepContent = () => {
    return (
      <Row className={`${this.state.current !== 2 && "d-none"} mt-5`} justify="space-between">
        {Object.keys(this.state.features).sort().map((name, i) =>
          <Col key={i} lg={10} span={24}>
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
