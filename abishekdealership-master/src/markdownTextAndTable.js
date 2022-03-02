import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Button, FormGroup } from 'react-bootstrap';
import MarkdownTable from './markdownTable';
import MarkdownTextArea from './markdownTextArea';
import MarkdownDeleteUpdate from './markdownDeleteUpdate';

// This functional component will display text area and table used by markdown form.
function MarkdownTextAndTable(props) {
    //console.log('MarkdownTextAndTable ' );
    //console.dir (props);
    if (props.images.length == 0 ) {
        return (
            <form onSubmit={props.handleSubmit}>
                <MarkdownTextArea  id='TEXT_AREA' value={props.markdownText} cols={60} rows={30} onChange={props.onChange} submit={true} />
            </form>
        );
    } else {
        let newImages=props.getNewImages();
        if (newImages.length == 0 ) {
            return (
                <form onSubmit={props.handleSubmit}>
                    <MarkdownTextArea  id='TEXT_AREA' value={props.markdownText} cols={60} rows={30} onChange={props.onChange} submit={true} />
                </form>
            );
        } else {
            if (props.rowSelected == undefined) {
                return (
                    <form onSubmit={props.handleSubmit}>
                        <MarkdownTextArea  id='TEXT_AREA' value={props.markdownText} cols={60} rows={30} onChange={props.onChange} submit={true} />
                        <p/>
                        <label>
                            Saved markdowns are listed below:
                        </label>
                        <MarkdownTable data={newImages} rowSelected={props.rowSelected} convertMarkdownText={props.convertMarkdownText}  />
                    </form>
                );

            } else {
                let isSubmit=true;
                if (props.mode === 'UPDATE' && props.isTextAreaChanged === false ) {
                    // During update if text area content has not changed,then submit button must be disabled.
                    isSubmit=false;
                }
                return (
                    <form onSubmit={props.handleSubmit}>
                        <MarkdownTextArea  id='TEXT_AREA' value={props.markdownText} cols={60} rows={30} onChange={props.onChange} submit={isSubmit} />
                        <MarkdownDeleteUpdate onChange={props.onChange} isDelete={props.isDelete} selectedRow={props.selectedRow} deleteYesNo={props.isDelete} />
                        <label>
                            Saved markdowns are listed below:
                        </label>
                        <MarkdownTable data={newImages} rowSelected={props.rowSelected} convertMarkdownText={props.convertMarkdownText}  />
                    </form>
                );
            }
        }
    }    
}
export default MarkdownTextAndTable


