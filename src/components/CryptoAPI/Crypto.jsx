import React, {Component} from 'react';


class Crypto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
  }

  
  componentDidMount() {
    //PATH to GET coin tickers API
const url = "https://api.coinmarketcap.com/v2/ticker/?convert=CAD&limit=20";
    //call to fetch cryptocurrency
    fetch(url)
      .then(res => res.json())  
      .then(
        (result) => {
          console.log(result);
          // this.setState({
          //   items: result.items
          // });
        }
      )
  }
    render(){
      return(
    
      <div>
        <button type="button">Hello</button>
        </div>
    )
  }
}

export default Crypto;