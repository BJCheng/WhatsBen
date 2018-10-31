import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import urlJoin from 'url-join';

class Incr extends React.Component {
	constructor() {
		super();
		this.state = {
			incValue: -1,
			hasError: false,
		};
	}

	render() {
		if (this.state.hasError)
			return <p>API Server Error</p>;
		if (this.state.incValue < 0)
			return <p>Fetching...</p>;
		else {
			return <p>Incremental Value is {this.state.incValue}</p>
		}
	}

	componentDidMount() {
		Axios.get(urlJoin(global.__apiUrl__, 'json-test')).then((res) => {
			this.setState({incValue: res.data.incResult});
		});
	}
}

export default Incr;