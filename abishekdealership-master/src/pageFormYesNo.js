import React, { Component } from 'react';
import { Radio, Button, FormGroup, Grid, Row, Col, ControlLabel, FormControl, Label } from 'react-bootstrap';

// This functional component will display yes/no dialog.
function PageFormYesNo(props) {

    //console.log('PageFormYesNo');
    //console.dir(props);
    let checked=props.checked;
    let controlLabel=props.controlLabel;
    let radioId=props.radioId;
    let radios = [];
    if (checked === 'Yes') {
        radios.push({value: 'Yes', checked: true});
        radios.push({value: 'No', checked: false});
    } else {
        if (checked === 'No') {
            radios.push({value: 'Yes', checked: false});
            radios.push({value: 'No', checked: true});
        } else {
            // force the end user to make a selection to transition to the next page
            radios.push({value: 'Yes', checked: false});
            radios.push({value: 'No', checked: false});
        }
    }
    let myOnChange=props.onChange;
    let radioRows=[];

    radios.forEach(function(radio, index) {
        radioRows.push(<Radio key={index} id={radioId} name={controlLabel} value={radio.value} inline  onChange={myOnChange}  checked={radio.checked}> {radio.value} </Radio>);
    });

    return (
        <FormGroup onChange= {props.onChange} id={radioId} >
            <label className="unset-display">{controlLabel}</label>
            {radioRows}
        </FormGroup>
    )
}
export default PageFormYesNo

