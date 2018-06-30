import React, {Component} from 'react';

class CryptoNews extends Component {
    constructor(props){
        super(props)
        this.state = {
            news: []
        }
    }

    componentDidMount(){
        let url = "https://newsapi.org/v2/everything?q=cryptocurrency&q=blockchain&from=2018-06-30&sortBy=popularity&Language=en&apiKey=39814515319242c8949940cc311d0121";

        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
               this.setState("Set state"[result]);
              const news = Object.values(result.data);
              console.log("Here's the array", news)
            }
          )
      }
    }

  export default CryptoNews;