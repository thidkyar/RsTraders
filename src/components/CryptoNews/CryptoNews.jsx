import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class CryptoNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }

  componentDidMount() {
    //News API
    const url =
      "https://newsapi.org/v2/everything?q=cryptocurrency&q=blockchain&pageSize=10&from=today&sortBy=popularity&Language=en&apiKey=39814515319242c8949940cc311d0121";

    fetch(url)
      .then(res => res.json())
      .then(result => {
        this.setState("Set state"[result]);
        console.log("Original News Format", result);
        var news = Object.values(result.articles);
        this.setState({ news: news });
        console.log("Here's the news array", news);
      });
  }
  render() {
    return (
      <div className="Crypto-News">
        <h1>Crypto News</h1>
        <hr />
        <Card>
          <CardHeader>News</CardHeader>
          <marquee scrolldelay="400" height="200" direction="up">
            <table>
              <thead />
              <tbody>
                {this.state.news.map((ner, n) => {
                  return (
                    <tr key={n}>
                      <tr>
                        <img
                          width="100px"
                          height="100px"
                          src={ner.urlToImage}
                        />
                      </tr>
                      <td>
                        <b>{ner.title}</b>
                        <br /> {ner.description}
                        <br />
                        <br />
                      </td>
                      <br />
                    </tr>
                  );
                })}
              </tbody>
            </table>{" "}
          </marquee>
        </Card>
      </div>
    );
  }
}
export default CryptoNews;
