import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { connect } from 'react-redux';
import * as actions from '../actions';


class SearchBar extends Component {

	constructor() {
		super();
		this.state = {
			search: '',
			placeholder: ''
		}

		this.buttonClicked = this.buttonClicked.bind(this);
		this.onInputChange = this.onInputChange.bind(this);
	}

	buttonClicked() {
		console.log("i was clicked");
		this.props.searchBar("fgo");
	}

	onInputChange(val){
		this.setState({
			search: val.value
		}, () => {
			console.log("input value is", this.state.search)
		});
	}

				// <div className="searchbar">
				// 	<input
				// 		type="text" 
				// 		className="input" 
				// 		onChange={this.onInputChange.bind(this)}
				// 		value={this.state.search}
				// 	>
				// 	</input>
				// </div>


	renderSearchBar() {
		// on component mount, do the fetching and searching and pass in the json with all the names of CEs and servants
		// use regex to narrow down the choices and display them as results in the dropdown

		var tempServants = [];
    	var options = [
			{value: 12, label: '12 results per page'},
			{value: 16, label: '16 results per page'},
			{value: 20, label: '20 results per page'}
		];


		if(this.props.search.results !== null) {
			tempServants = this.props.search.results.Results.servants.map((servant) => {
				return(
					{
						value: servant.pageLink, 
						label:
							<div className="searchContainer">
								<div className="equalHMWrap eqWrap">
									<div className="equalHM">
										<img src={servant.icon}></img>
									</div>
									<div className="equalMid">
										{servant.engName} <br />
										{servant.jpName}
									</div>
									<div className="equalHM">
										<div className="vert">
											{servant.rarity}
										</div>
									</div>
								</div>
							</div>
					}
				)
			})

			console.log(tempServants);

			options = tempServants
		}


		return(
			<div>
				<div className="bind">
	    			<Select
	    				name="form-field-name"
	    				placeholder={this.state.placeholder}
	    				options={options}
	    				onChange={this.onInputChange}
	    			/>
	    		</div>
	    	</div>
		);
	}

	renderSearchProps() {
		if(this.props.search.results !== null) {
			return(
				<div>
					Your returned props value from go API is valid.
				</div>
			)
		}
	}

	//how to center within the rnd component

	render(){
		{console.log("this is props search value", this.props.search.results)}

		const style = {
		    marginTop: 6,
		    marginBottom: 6,
		    marginLeft: 13,
		    marginRight: 13
		};

		return(
			<div className="boxBorder">
				this is SearchBar
				{this.renderSearchBar()}
				<RaisedButton 
	    			label="default"
	    			style={style}
	    			onClick={this.buttonClicked}
	    		/>
				{this.renderSearchProps()}
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