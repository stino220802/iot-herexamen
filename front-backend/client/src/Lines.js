import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios'
import MOCK_DATA from './data.json'

export default class Lines extends Component {

	// Set up state for loading data
	constructor(props){
		super();
		this.state = { data: [] }
	}
    
	// API call upon component mount 
	componentDidMount() {
       this.setState({data : MOCK_DATA});
    
        /*const config = {
            headers: {
                "Content-type": "application/json"
            }
        }
		const endpoint = '/api/users/getData';

		fetch(endpoint, config)
			.then(res => res.json())
			.then(json => this.setState({data : json})
                
			);*/
	}
  

	// Extract and transform data needed for plotting
	addTraces(data){
        let traces = [];

		
		let lines = {'sensor_id': {'y': []},
					 'value': {'y': []}};
		let dates = [];

		// Group counts over time by individual entity
		data.map(each => {
			dates.push(each.created_at)

			lines.sensor_id.y.push(each.sensor_id);
			lines.value.y.push(each.value);
		})

		console.log(lines)

		// Set up traces for each entity 
		for (const [key, value] of Object.entries(lines)){
			traces.push({
				type: 'scatter',
				mode: 'lines',
				x: dates,
				y: value.y,
				name: key
			})
		}

		return traces
	}

	render () {
		return (
			<div>
				<Plot 
					data = {this.addTraces(this.state.data)}
					layout={{ width: 1000,
							  height: 500,
							  title: 'sensor data'}}
				/>
			</div>
		)
	}
}