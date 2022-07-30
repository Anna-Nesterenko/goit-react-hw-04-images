import React, { Component } from 'react';

class App extends Component {
  state = {
    image: [],
  };

  //   componentDidMount() {
  //     fetch(
  //       'https://pixabay.com/api/?key=28157961-50aacf6d1ff0efe2e77cab6d2&q=yellow+flowers&image_type=photo'
  //     )
  //       .then(res => res.json())
  //       .then(image => this.setState(image));
  //   }

  render() {
    return <div>App</div>;
  }
}

export default App;
