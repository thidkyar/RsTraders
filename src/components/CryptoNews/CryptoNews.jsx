//REACT COMPONENTS
import React, { Component } from 'react';

//MATERIAL-UI
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';

//CSS STYLES
import "./CryptoNews.css";

class CryptoNews extends Component {
    constructor(props) {
        super(props)
        this.state = {
            news: []
        }
    }

    componentDidMount() {
        //News Scroller API
        const url = "https://newsapi.org/v2/everything?q=cryptocurrency&q=blockchain&pageSize=100&from=today&sources=google-news,bbc-news,engadget,financial-post,mashable,reuters,techcrunch,the-wall-street-journal,time,wired,the-huffington-post,cbc-news,bloomberg,cnn,the-globe-and-mail,ars-technica,business-insider&sortBy=publishedAt&Language=en&apiKey=39814515319242c8949940cc311d0121";

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
                <Card >
                    <CardHeader 
                                title="News"
                                style={{   background: '#273954',height:'25%', border: 'bold', color: 'white' }}>
                    <h1>News</h1>
                        </CardHeader>
                    <marquee scrolldelay="200" height="500" direction="up" style={{ padding: '5%' }} >
                        <table style={{ padding: '5%' }}>
                            <thead>
                            </thead>
                            <tbody>
                                {this.state.news.map((ner, n) => {
                                    const url = ner.url;
                                    return (
                                        <tr key={n}>
                                            <tr><a href={url} target="_blank"><img width='90%' align="center" height='auto' src={ner.urlToImage} /></a></tr>
                                            <tr><a href={url} target="_blank"> <b>{ner.title}</b> </a><tr>
                                                <tr><a href={url} target="_blank"><font size="2"> {ner.description}</font></a><br /></tr>
                                                <hr height='3px' />
                                                <tr height='30%'></tr>
                                            </tr>
                                            </tr>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </marquee>
                </Card>
            </div>
        );
    }
}
export default CryptoNews;