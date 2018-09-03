import React, { Component } from 'react';
import './App.css';
import {Button,Card} from 'antd';
//import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Card title="主题">
              <Button type="primary">我是郎媛勤</Button>
              <Button >我是郎媛勤</Button>
          </Card>
      </div>
    );
  }
}

export default App;
