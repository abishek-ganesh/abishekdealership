import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import {Bar, Line} from 'react-chartjs-2';
import logo from './Earth.jpg';
import _ from 'lodash';
import {dbUtils} from './common/dbUtils'
import VehiclesTable from './common/vehiclesTable';

class App extends Component {

    constructor(props) {
        super(props);
		
		let dbHelper = dbUtils();
        
		this.state = {
            isVehicleSales: false,
            vehicleSalesArray: [],
			dbUtils: dbHelper
        };
        this.viewVehicles = this.viewVehicles.bind(this);
        this.state.dbUtils.getVehiclesData(this.viewVehicles);
    }
    viewVehicles(data) {
        console.dir(data);
		this.setState({
		                isVehicleSales: true,
		                vehicleSalesArray: data.vehicles
		            })
    }
        
    render() {

        if (this.state.vehicleSalesArray.length == 0){
            return(<div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Abishek's Dealership</h1>
                </header>
                <p className="App-intro">
                    {this.state.vehicleSalesArray.length}
                </p>
            </div>)
        } else {
            return(<div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">Welcome to Abishek's Dealership</h1>
                </header>
                <p className="App-intro">
                    {this.state.vehicleSalesArray.length}
                    <VehiclesTable data={this.state.vehicleSalesArray}/>
                </p>
            </div>)
        }
    }
}

export default App;


