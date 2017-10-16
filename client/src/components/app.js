import React, { Component  } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ReactGridLayout from 'react-grid-layout';
import {Responsive, WidthProvider} from 'react-grid-layout';

import '../layout/reactGrid/styles.css';
import '../layout/reactResizable/styles.css';

import Header from './header';
import SavedTeams from './savedTeams';
import Searchbar from './searchbar';
import DailyWindow from './dailyWindow';
import RecentSearch from './recentSearch';

//location-search should have the search params

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class App extends Component {

	constructor() {
		super();
		this.state = {
			widthWindow: '0',
			heightWindow: '0'
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

		this.setState({ widthWindow: width, heightWindow: height });
	}

	render(){
		var layout = [
			{i: 'searchbar', x: 9, y: 0, w: 3, h: 4},
			{i: 'savedTeams', x: 9, y: 7, w: 3, h: 3},
			{i: 'dailyWindow', x: 0, y: 0, w: 5, h: 6},
			{i: 'recentSearch', x: 9, y: 4, w: 3, h: 3},
	    ];

	    // var layouts: {
	    // 	lg: layout,
	    // 	md: layout,
	    // 	sm: layout,
	    // 	xs: layout,
	    // 	xxs: layout
	    // }

		return (
			<MuiThemeProvider>
				<div className="full">
					<div>
						<Header />
						<div>
							<Searchbar />
						</div>
						<ReactGridLayout 
							className="layout" 
							layout={layout}
							cols={12}
							rowHeight={30}
							width={this.state.widthWindow}
						>
							
							<div key="savedTeams">
								<SavedTeams />
							</div>
							<div key="dailyWindow">
								<DailyWindow />
							</div>
							<div key="recentSearch">
								<RecentSearch />
							</div>
						</ReactGridLayout>
					</div>
				</div>
			</MuiThemeProvider>
		);
	}
};

export default connect(null, actions)(App);