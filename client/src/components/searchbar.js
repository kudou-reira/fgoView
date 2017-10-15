import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SearchBar extends Component {

	constructor() {
		super();
		this.state = {
			widthWindow: '0',
			heightWindow: '0',
			width: 0,
			height: 0,
			x: 0,
			y: 0
		}

		this.buttonClicked = this.buttonClicked.bind(this);
	}

	buttonClicked() {
		console.log("i was clicked");
		this.props.searchBar("fgo");
	}

	renderSearchBar() {
		const style = {
		    marginTop: 6,
		    marginBottom: 6,
		    marginLeft: 13,
		    marginRight: 13
		};

		return(
			<div>
	    		<RaisedButton 
	    			label="default"
	    			style={style}
	    			onClick={this.buttonClicked}
	    		/>
	    	</div>
		);
	}

	renderSearchProps() {
		if(this.props.search.value !== null) {
			return(
				<div>
					Your returned props value from go API is valid.
				</div>
			)
		}
	}

	//how to center within the rnd component

	render(){
		{console.log("this is props search value", this.props.search.value)}
		return(
			<div>
				this is SearchBar
				{this.renderSearchBar()}
				{this.renderSearchProps()}

				<div className="boxBorder">
					<img src='https://d3ieicw58ybon5.cloudfront.net/full/u/06776b146a624e318df43008fe516cd1.jpg' />
					001222222222222222u9e21098329018e092
				</div>
			</div>
		);
	}
}

function mapStateToProps(state){
	return { 
		search: state.search
	};
}


export default connect(mapStateToProps, actions)(SearchBar);