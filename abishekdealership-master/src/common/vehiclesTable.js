import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class VehiclesTable extends React.Component {
    constructor(props) {
        super(props);
        // this.onRowSelect = this.onRowSelect.bind(this);
//         this.state = {
//             selected: [],
//             key: 0
//         };
    }
	
	render() {
		console.log('vehiclesTable props = ');
		console.dir(this.props);
		let mykey = 123;
		return(
			<BootstrapTable key={mykey} bordered={ true }  striped={ true } hover={ true } responsive data={this.props.data}  >
				<TableHeaderColumn  isKey={ true } hidden = { true } dataField='ID' dataAlign='left' headerAlign='left' >ID</TableHeaderColumn>
				<TableHeaderColumn dataField='Manufacturer' dataAlign='left' headerAlign='left' >Manufacturer</TableHeaderColumn>
				<TableHeaderColumn dataField='Mileage' dataAlign='left' headerAlign='left' >Mileage</TableHeaderColumn>
				<TableHeaderColumn dataField='Model' dataAlign='left' headerAlign='left' >Model</TableHeaderColumn>
				<TableHeaderColumn dataField='Price' dataAlign='left' headerAlign='left' >Price</TableHeaderColumn>
				<TableHeaderColumn dataField='Type' dataAlign='left' headerAlign='left' >Type</TableHeaderColumn>
				<TableHeaderColumn dataField='VIN' dataAlign='left' headerAlign='left' >VIN</TableHeaderColumn>
				<TableHeaderColumn dataField='Year' dataAlign='left' headerAlign='left' >Year</TableHeaderColumn>
			</BootstrapTable>
		)
	}
}

export default VehiclesTable

/*
Colors: (2) ["Red", "Black"]
 Manufacturer: "Tesla"
 Mileage: 32120
 Model: "Model S"
 Price: 69000
 Type: "Sedan"
 VIN: "A001"
 Year: 2019
 */