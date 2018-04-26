import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Prismic from 'prismic-javascript';
import {Link, RichText, Date} from 'prismic-reactjs';

class App extends Component {
	constructor(props){
		super(props)

		this.state = {
			doc: null
		}

		this.linkResolver = this.linkResolver.bind(this);
		this.render_prismic = this.render_prismic.bind(this);
	}


	componentWillMount() {
		const apiEndpoint = 'https://mercadoni.prismic.io/api/v2';
		// const accessToken = 'your-access-token';

		Prismic.api(apiEndpoint).then(api => {
			api.query(Prismic.Predicates.at('document.type', 'terms__conditions')).then(response => {

				if (response) {
		    		this.setState({ doc: response.results[0] });
				}
			});
		});
	}


	linkResolver(doc) {
		// Define the url depending on the document type
		if (doc.type === 'page') {
			return '/page/' + doc.uid;
		} else if (doc.type === 'blog_post') {
			return '/blog/' + doc.uid;
		}

		// Default to homepage
		return '/';
	}

	render_prismic(){
		if (this.state.doc) {
			console.log(this.state.doc);

			const document = this.state.doc.data;
			return (
				<div style={{ alignText : 'left' }}>
					<h1>{RichText.asText(document.title_terms)}</h1>
					<div style={{ backgroundImage :  `url(${document.imagen_terms.url})`, width: '100%', height: 300, backgroundSize: 'cover' }} ></div>
					<p>{RichText.render(document.descr)}</p>
					<p><a href={Link.url(document.link)} target="_blank">{Link.url(document.link)}</a></p>
					{/*{RichText.render(document.description, this.linkResolver)}*/}
				</div>
			);
		}
		
		return <h1>Loading...</h1>;
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<img src={'https://dev.mercadoni.com/d90fee0169088d6d2354c7db122a0359.png'} className="App-logo" alt="logo" />
					<h1 className="App-title">Prototipo Prismic IO Mercadoni</h1>
				</header>
				<div className="App-intro">
					{/*To get started, edit <code>src/App.js</code> and save to reload.*/}
					{this.render_prismic()}
				</div>
			</div>
		);
	}
}

export default App;
