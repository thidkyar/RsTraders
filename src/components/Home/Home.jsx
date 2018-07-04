import React, { Component } from 'react';
import Crypto from "../CryptoAPI/Crypto.jsx"


class Home extends Component {
  render() {
    return (
      <div>
        <Crypto />
      </div>
    );
  }
}
export default Home;
