import React, { Component, Fragment } from 'react';
import Cabecalho from './components/Cabecalho'
import NavMenu from './components/NavMenu'
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'
import TrendsArea from './components/TrendsArea'
import Tweet from './components/Tweet'

class App extends Component {

    constructor() {
        super()
        this.state = {
            novoTweet: '',
            tweets: []
        }

        this.adicionarOTweet = this.adicionarOTweet.bind(this)
    }

    adicionarOTweet(event) {
        event.preventDefault()
        const novoTweet = this.state.novoTweet
        if (novoTweet) {
            fetch('http://localhost:3001/tweets', {
                method: 'POST',
                body: JSON.stringify({ login: 'omariosouto', conteudo: novoTweet })
            })
                .then((respostaDoservidor) => {
                    return respostaDoservidor.json()
                })
                .then((tweetVindoDoServidor) => {
                    console.log(tweetVindoDoServidor)
                    this.setState({
                        tweets: [tweetVindoDoServidor, ...this.state.tweets],
                        novoTweet: ''
                    })
                })
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/tweets').then((respostaDoservidor) => {
            return respostaDoservidor.json().then((respostaEmJson) => {
                this.setState({
                    tweets: respostaEmJson
                })
            })
        })
    }

    render() {
        return (
            <Fragment>
                <Cabecalho>
                    <NavMenu usuario="@vwvvvw" />
                </Cabecalho>
                <div className="container">
                    <Dashboard>
                        <Widget>
                            <form className="novoTweet" onSubmit={this.adicionarOTweet}>
                                <div className="novoTweet__editorArea">
                                    <span className={'novoTweet__status' + (this.state.novoTweet.length > 140 ? ' novoTweet__status--invalido' : '')} >{this.state.novoTweet.length}/140</span>
                                    <textarea
                                        value={this.state.novoTweet}
                                        onChange={(event) => { this.setState({ novoTweet: event.target.value }) }}
                                        className="novoTweet__editor" placeholder="O que está acontecendo?"></textarea>
                                </div>
                                <button type="submit" disabled={this.state.novoTweet.length > 140} className="novoTweet__envia">Tweetar</button>
                            </form>
                        </Widget>
                        <Widget>
                            <TrendsArea />
                        </Widget>
                    </Dashboard>
                    <Dashboard posicao="centro">
                        <Widget>
                            <div className="tweetsArea">
                                {
                                    this.state.tweets.map(function (tweetEmObjeto, indice) {
                                        return <Tweet key={indice} texto={tweetEmObjeto.conteudo} foto={tweetEmObjeto.foto} />
                                    })
                                }
                            </div>
                        </Widget>
                    </Dashboard>
                </div>
            </Fragment>
        );
    }
}

export default App;
