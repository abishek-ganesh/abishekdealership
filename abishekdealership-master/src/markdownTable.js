import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {FormGroup } from 'react-bootstrap';

function getCaretFile(direction) {
    // ascending order 1 to 9, arrow is ->
    // ascending order a to z arrow is ->
    if (direction === 'asc') {
        return (
            <span className="glyphicon glyphicon-arrow-up"></span>
        );
    }
    if (direction === 'desc') {
        return (
            <span className="glyphicon glyphicon-arrow-down"></span>
        );
    }
    return (
        <span className="glyphicon glyphicon-resize-vertical"></span>
    );
}
function sortCallbackFile(a, b, order, field) {
    var first= getColumnData(a,field);
    var second= getColumnData(b,field);
    //console.log ('sortCallbackFile order = ' + order + ' field = ' + field);
    if (order === 'desc') {
        if (first > second ) {
            return 1;
        } else if (first < second) {
            return -1;
        }
        return 0;
    } else {
        if (first > second ) {
            return -1;
        } else if (first < second) {
            return 1;
        }
        return 0;
    }
}

class MarkdownTable extends React.Component {
    constructor(props) {
        super(props);
        this.onRowSelect = this.onRowSelect.bind(this);
        this.createMarkup = this.createMarkup.bind(this);
        this.dangerousInnerHtml = this.dangerousInnerHtml.bind(this);

        this.state = {
            selected: [],
            key: 0
        };
    }
    onRowSelect(row, isSelected, e) {
        let array=[];
        array.push(row.id);
        this.setState({selected: array});
        //console.log('onRowSelect selected = ' + row.id);
        if (this.props.rowSelected !== undefined)  {
          this.props.rowSelected(row.id);
        }
        //this.props.rowSelected(row.id);
    }

    //componentWillReceiveProps(newProps) {
    //    console.log('componentWillReceiveProps');
    //    //this.setState({pageIndex: newProps.startPage, startPage:newProps.startPage, pageSize: newProps.pageSize,previousFilter: newProps.previousFilter,
    //    //    totalPages: newProps.totalPages});
    //}
    createMarkup(converted) {
        return {__html: converted};
    }
    dangerousInnerHtml(cell, row) {
        //console.log ('Inside dangerousInnerHtml');
        // The BootstrapTable will pass the information from 'converted' column as cell parameter
        return (
            <FormGroup  id='MD_ID' >
                <div dangerouslySetInnerHTML={this.createMarkup(cell)} />;
            </FormGroup>
        )
    }
    render() {
        let selectRowProp = {
            mode: 'checkbox',
            onSelect: this.onRowSelect,
            selected: this.state.selected,
            bgColor: 'pink', // you should give a bgcolor, otherwise, you can't recognize which row has been selected
            hideSelectColumn: true,  // enable hide selection column.
            clickToSelect: true  // you should enable clickToSelect, otherwise, you can't select column.
        };
        //console.log('MarkdownTable props');
        //console.dir(this.props);
        let convert=this.props.convertMarkdownText;
        this.props.data.forEach(function(row, index) {
            row['converted']=convert(row.markdownText);
        });
        let dangerousInnerHtml=this.dangerousInnerHtml;
        //console.log ('MarkdownTable data.length = '+ this.props.data.length);
        return(
            <BootstrapTable key={this.state.key} bordered={ true }  striped={ true } hover={ true } responsive data={this.props.data} selectRow={ selectRowProp }  >
                <TableHeaderColumn  isKey={ true } hidden = { true } dataField='id' dataAlign='left' headerAlign='left' >ID</TableHeaderColumn>
                <TableHeaderColumn dataField='description' dataAlign='left' headerAlign='left' dataSort={ true } sortFunc={ sortCallbackFile } caretRender = { getCaretFile } filter={ { type: 'TextFilter', placeholder: 'Enter description' } } >Description</TableHeaderColumn>
                <TableHeaderColumn dataField='createdOn' dataAlign='left' headerAlign='left' dataSort={ true } sortFunc={ sortCallbackFile } caretRender = { getCaretFile } filter={ { type: 'TextFilter', placeholder: 'Enter create date' } } >Created on</TableHeaderColumn>
                <TableHeaderColumn dataField='updatedOn' dataAlign='left' headerAlign='left' dataSort={ true } sortFunc={ sortCallbackFile } caretRender = { getCaretFile } filter={ { type: 'TextFilter', placeholder: 'Enter date' } } >Last updated</TableHeaderColumn>
                <TableHeaderColumn dataField='converted' dataFormat={ dangerousInnerHtml } dataAlign='left' headerAlign='left'  >Markdown</TableHeaderColumn>
            </BootstrapTable>
        )
    }

}

export default MarkdownTable

// From http://allenfang.github.io/react-bootstrap-table/start.html
// You need to import the css file to your app, the css is under the dist folder
// node_modules\react-bootstrap-table\css\react-bootstrap-table.css
