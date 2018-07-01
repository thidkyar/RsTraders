import React, { Component } from 'react';
// import './CryptoNews.css';

class CryptoNews extends Component {
    constructor(props) {
        super(props)
        this.state = {
            news: []
        }
    }

    componentDidMount() {
        //News API
        const url = "https://newsapi.org/v2/everything?q=cryptocurrency&q=blockchain&pageSize=10&from=2018-06-30&sortBy=popularity&Language=en&apiKey=39814515319242c8949940cc311d0121";

        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState("Set state"[result]);
                    console.log("Original News Format", result);
                    var news = Object.values(result.articles)
                    this.setState({ news: news });
                    console.log("Here's the news array", news)
                }
            )
    }
    render() {
        return (
            <div className="Crypto-News">
            <h1>Crypto News</h1>
              <marquee> This is some text. This is some text. </marquee>
              <hr />
              <table>
              <thead>
                <tr>
                  <th>Headlines</th>
                </tr>
              </thead>
              <tbody>
                
                {this.state.news.map((ner, n) => {
                  return (
                    <tr key={n}>
                      <td>{ner.title}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </div>
        );
}
    }
export default CryptoNews;