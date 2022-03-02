import React, { Component } from 'react';
import { Radio, Button, FormGroup, Grid, Row, Col, ControlLabel, FormControl, Label } from 'react-bootstrap';
import PageFormYesNo from './pageFormYesNo';

// This functional component will display buttons for delete and update
function MarkdownDeleteUpdate(props) {
    //console.log('MarkdownDeleteUpdate props');
    //console.dir(props);
    if ( props.selectedRow != undefined ) {
        if (props.isDelete && props.selectedRow != undefined ) {
            let label='Do you really want to delete? ';
            return (
                <div>
                    <PageFormYesNo controlLabel={label} radioId='MD_CONFIRM_DELETE' checked={props.deleteYesNo} onChange={props.onChange} />
                    <table>
                        <thead>
                        <tr>
                            <th>Created On</th>
                            <th>Updated On</th>
                            <th>Description</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{props.selectedRow.createdOn}</td>
                            <td>{props.selectedRow.updatedOn}</td>
                            <td>{props.selectedRow.description}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div>
                    <p/>
                    <p/>
                    <FormGroup onChange= {props.onChange} id='CRUD' >
                        <Button id="MD_DELETE_BUTTON" as="input" type="button" value="Input" onClick={props.onChange} >Delete</Button>
                        <Button id="MD_UPDATE_BUTTON" as="input" type="button" value="Input" onClick={props.onChange} >Update</Button>
                    </FormGroup>
                </div>
            )
        }

    } else {
        return (
            <div>
            </div>
        )
    }

}
export default MarkdownDeleteUpdate

