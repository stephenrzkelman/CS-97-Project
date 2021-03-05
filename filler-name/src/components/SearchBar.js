import React from 'react';
import Exercise from '../../database/Exercise.js';

class SearchBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {value: ''};

		this. handleChange = 
			this.handleChange.bind(this);
		this.handleSearch = 
			this.handleSubmit.bind(this);
	}

	handleChange(event){
		this.setState({value: event.target.value});
	}

	handleSearch(event){
		return Exercise.search(this.state.value);
	}

	render(){
		return(
			<form onSubmit = 
			{this.handleSearch}>
			<label>
			Search:
			<input type="text" value = {this.state.value} onChange=
			{this.handleChange} />
			</label>
			<input type="submit"
			value="Search" />
			</form>
		);
	}
}
// use Exercise.search(query) to find by tag/id
export default SearchBar;
