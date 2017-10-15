import React, { Component  } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import * as actions from '../actions';

import '../layout/reactGrid/styles.css';
import '../layout/reactResizable/styles.css';

import Header from './header';
import SavedTeams from './savedTeams';
import Searchbar from './searchbar';

//location-search should have the search params

class App extends Component {

	constructor() {
		super();
		this.state = {
			widthWindow: '0',
			heightWindow: '0',
			width: 0,
			height: 0
		}

		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}

	componentWillMount() {
		this.updateWindowDimensions();
	}

	componentDidMount() {
		this.props.fetchUser();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		var w = window,
	        d = document,
	        documentElement = d.documentElement,
	        body = d.getElementsByTagName('body')[0],
	        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
	        height = w.innerHeight || documentElement.clientHeight || body.clientHeight;

		this.setState({ widthWindow: width, heightWindow: height }, () => {
			// console.log(typeof(this.state.widthWindow));
			this.setState({
				width: 0.3 * this.state.widthWindow,
				height: 0.2 * this.state.heightWindow
			}, () => {
				console.log(this.state.width);
			})
		});
	}

	render(){
		var layout = [
			{i: 'a', x: 0, y: 0, w: 1, h: 2, static: true},
			{i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
			{i: 'c', x: 4, y: 0, w: 1, h: 2}
	    ];

		return (
			<MuiThemeProvider>
				<div className="full">
					<BrowserRouter>
						<div>
							<Header />
							<Route exact path="/saved" component={SavedTeams} />
							<Route path='/' component={Searchbar} />
						</div>
					</BrowserRouter>
				</div>
			</MuiThemeProvider>
		);
	}
};

export default connect(null, actions)(App);