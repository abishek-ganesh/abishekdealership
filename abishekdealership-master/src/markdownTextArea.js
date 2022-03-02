import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {FormGroup } from 'react-bootstrap';
// This functional component will display text area used by markdown form.
function MarkdownTextArea(props) {
    //console.log('MarkdownTextArea props.value.length = ' +  props.value.length);
    //console.dir (props);
    if (props.submit && props.value.length > 0 ) {
        return (
            <FormGroup onChange= {props.onChange} id={props.id} >
                <label>
                    Enter Markdown text:
                    <textarea id={props.id} value={props.value} autoFocus cols={props.cols} rows={props.rows} onChange={props.onChange} />
                </label>
                <input type="submit" value="Preview" />
            </FormGroup>
        )
    } else {
        return (
            <FormGroup onChange= {props.onChange} id={props.id} >
                <label>
                    Enter Markdown text:
                    <textarea id={props.id}  value={props.value} autoFocus cols={props.cols} rows={props.rows} onChange={props.onChange} />
                </label>
            </FormGroup>
        )
    }
}
export default MarkdownTextArea


