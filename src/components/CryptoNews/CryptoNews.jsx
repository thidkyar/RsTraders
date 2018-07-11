//REACT COMPONENTS
import React, { Component } from 'react';

//MATERIAL-UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";


//CSS STYLES
import "./CryptoNews.css";
import { CardContent } from '@material-ui/core';

const styles = theme => ({
    title: {
        color: 'white',
    }
});


class CryptoNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: []
        };
    }

    componentDidMount() {
        //News Scroller API
        const url = "https://newsapi.org/v2/everything?q=cryptocurrency&q=blockchain&pageSize=100&from=today&sources=google-news,bbc-news,financial-post,mashable,reuters,techcrunch,the-wall-street-journal,time,wired,the-huffington-post,cbc-news,bloomberg,cnn,the-globe-and-mail,ars-technica,business-insider&sortBy=popularity&Language=en&apiKey=39814515319242c8949940cc311d0121";

        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState("Set state"[result]);
                    var news = Object.values(result.articles)
                    this.setState({ news: news });
                }
            )
    }
    render() {
        const { classes } = this.props;

        return (
            <div className="Crypto-News">
                <Card >
                    <CardHeader
                        title="News"
                        classes={{
                            title: classes.title,
                        }}
                        titleColor="white"
                        color="white"
                        textColor="white"
                        style={{
                            background: '#273954',
                            border: 'bold',
                            titleColor: 'white',
                            textColor: 'white',
                            color: 'white'
                        }}>
                    </CardHeader>
                    <CardContent style={{ height: '38em' }} >
                        <marquee scrolldelay="100" height="600" direction="up" style={{ padding: '1%' }} >
                            <table style={{ padding: '1%' }}>
                                <thead>
                                </thead>
                                <tbody>
                                    {this.state.news.map((ner) => {
                                        // const url = ner.url;
                                        return (
                                            <div>
                                                <tr><a href={ner.url} target="_blank"><img width='90%' align="center" height='auto' src={ner.urlToImage} /></a></tr>
                                                <tr><a href={ner.url} target="_blank"> <b>{ner.title}</b> </a><tr>
                                                    <tr><a href={ner.url} target="_blank"><font size="2"> {ner.description}</font></a><br />
                                                    </tr>
                                                    <hr height='3px' />
                                                </tr>
                                                </tr>
                                            </div>
                                        )
                                    })})
                            </tbody>
                            </table>
                        </marquee>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(CryptoNews);
