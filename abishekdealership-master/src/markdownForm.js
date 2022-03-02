import React, {Component} from 'react';
import { Button, FormGroup } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import _ from 'lodash'
import marked from 'marked';
import MarkdownTable from './markdownTable';
import MarkdownTextArea from './markdownTextArea';
import MarkdownTextAndTable from './markdownTextAndTable';
import MarkdownDeleteUpdate from './markdownDeleteUpdate';
import PageFormYesNo from './pageFormYesNo';
import {markdownStateHelper} from './markdownStateMachine'
const MARKDOWN_SAVE_CONTROL_LABEL = 'Do you want to save the markdown displayed below ? ';
const MARKDOWN_UPDATE_CONTROL_LABEL = 'Do you want to update the markdown displayed below ? ';
const SAVE_RADIO_ID='SAVE_MARKDOWN';

class MarkdownForm extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createMarkup = this.createMarkup.bind(this);
        this.checkId = this.checkId.bind(this);
        this.rowSelected = this.rowSelected.bind(this);
        this.convertMarkdownText = this.convertMarkdownText.bind(this);
        this.getNewImages = this.getNewImages.bind(this);
        this.changeMarkdownText = this.changeMarkdownText.bind(this);

        let images=[];
        let tmpStateHelper = markdownStateHelper();
        this.state = {
            images: images,
            stateHelper: tmpStateHelper,
            selectedRow: undefined,
            isDelete: false,
            deleteYesNo: '',
            tmpDesc: '',
            tmpText: '',
            mode: 'ADD',
            isTextAreaChanged: true, // This field is used when the mode is UPDATE only
            stateMachineState: '' // When the state machine state changes, this react component render method must be called by reactjs library. So this variable is needed.
        };
    }
    convertMarkdownText(input) {
        let options= {
            "baseUrl": null,
            "breaks": false,
            "gfm": true,
            "headerIds": true,
            "headerPrefix": "",
            "highlight": null,
            "langPrefix": "language-",
            "mangle": true,
            "pedantic": false,
            "sanitize": false,
            "sanitizer": null,
            "silent": false,
            "smartLists": false,
            "smartypants": false,
            "xhtml": false
        };
        let converted=marked(input, options);
        return converted;
    }

    rowSelected(id) {
        //console.log('row selected = ' + id);
        let found = this.state.images.find(function(image){
            if (image.id === id ) {
                return true;
            }
        });
        if (found != undefined) {
            this.setState({selectedRow: found});
        }
    }

    onChange(event) {
        let id = event.target.getAttribute("id");
        this.checkId(event,id);
    }
    changeMarkdownText(newText) {
        if (newText.length > 0 ) {
            // if some text is entered in the text area
            if (this.state.stateHelper.stateMachine.can('begin')) {
                this.state.stateHelper.stateMachine.begin();
                this.setState({stateMachineState: this.state.stateHelper.stateMachine.state});
            }
        } else {
            if (this.state.stateHelper.stateMachine.can('restart')) {
                this.state.stateHelper.stateMachine.restart();
                this.setState({stateMachineState: this.state.stateHelper.stateMachine.state});
            }
        }
        this.state.stateHelper.currentSelection.markdownText=newText;
    }
    checkId(event, id) {
        //console.log('checkId id = ' + id);
        if (id == 'TEXT') {
            this.state.stateHelper.currentSelection.description=event.target.value;
            this.setState({tmpDesc: event.target.value}); // This is needed so that reactjs library will call the render method when some text is entered in the description input field.
        } else {
            if (id == 'TEXT_AREA') {
                //console.log ('text area length = ' + event.target.value.length + ' mode = ' + this.state.mode);
                //console.dir (this);
                if ( this.state.mode == 'UPDATE' && this.state.selectedRow != undefined ) {
                    let isTextAreaChanged = true;
                    if (event.target.value != undefined ) {
                        if (event.target.value.length != this.state.stateHelper.currentSelection.markdownText.length) {
                            //console.log ('Detected change in text area length = ' + event.target.value.length );
                            this.changeMarkdownText(event.target.value);
                        } else {
                            // this.state.selectedRow.markdownText
                            // this.state.stateHelper.currentSelection.markdownText
                            if (this.state.selectedRow.markdownText ===  this.state.stateHelper.currentSelection.markdownText) {
                                //console.log ('No content change in text area '  );
                                isTextAreaChanged=false;
                            } else {
                                //console.log ('Detected content change in text area '  );
                                this.changeMarkdownText(event.target.value);
                            }
                        }
                    }
                    this.setState({isTextAreaChanged: isTextAreaChanged})

                } else {
                    this.changeMarkdownText(event.target.value);
                }
                this.setState({tmpText: event.target.value}); // a state change is needed so that whenever text in the text area is changed, reactjs library will rerender
            } else {
                if (id == 'SAVE_BUTTON') {

                    if (this.state.stateHelper.stateMachine.can('save')) {
                        this.state.stateHelper.stateMachine.save();
                        let newDesc = this.state.stateHelper.currentSelection.description;
                        let d = new Date();
                        let month =  d.getMonth()+1;
                        let todayString = d.getFullYear() + '/' + month +'/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() ;
                        if (this.state.stateHelper.currentSelection.description.length == 0 ) {
                            newDesc='Created on '+todayString;
                            //console.log ('todayString = ' + todayString );
                        }
                        //console.log ('TODO: Check mode. For update take a different path this = ' );
                        //console.dir (this);
                        if ( this.state.mode == 'UPDATE' && this.state.selectedRow != undefined ) {
                            let selectedId = this.state.selectedRow.id;
                            let found = this.state.images.find(function(image){
                                if (image.id === selectedId ) {
                                    return true;
                                }
                            });
                            if (found != undefined) {
                                found.description=newDesc;
                                found.markdownText=this.state.stateHelper.currentSelection.markdownText;
                            } else {
                                console.log ('This is an error condition. Must not enter here. Investigate');
                            }
                        } else {
                            let tmpImages=this.state.images;
                            let count=tmpImages.length;
                            let newImage={
                                id: ++count,
                                author: 'guest',
                                authorId: 123,
                                description: newDesc,
                                createdOn: todayString,
                                updatedOn: todayString,
                                markdownText: this.state.stateHelper.currentSelection.markdownText,
                                refCount: 0, // Keep a count of how many pages are referring to markdown text. It can be deleted only when refCount is zero.
                                isDeleted: false
                            };
                            tmpImages.push(newImage);
                        }
                        let tmpStateHelper = markdownStateHelper();
                        this.setState({stateHelper: tmpStateHelper});
                        this.setState({stateMachineState: this.state.stateHelper.stateMachine.state});
                        this.setState({mode: 'ADD'});

                        // TODO: images must be persisted to a database table.
                        // Information from that table must be used to create the images array.
                        // The images row must have description, last updated and created date and a delete button.
                    }
                } else {
                    if (id == SAVE_RADIO_ID ) {
                        //console.log ('SAVE_RADIO_ID event.target.value = ' + event.target.value );
                        if (event.target.value === 'Yes') {
                            if (this.state.stateHelper.stateMachine.can('description')) {
                                this.state.stateHelper.stateMachine.description();
                                this.state.stateHelper.currentSelection.saveMarkdown='Yes';
                                this.setState({stateMachineState: this.state.stateHelper.stateMachine.state});
                            }

                        } else {
                            if (event.target.value === 'No') {
                                if (this.state.stateHelper.stateMachine.can('cancelPreview')) {
                                    this.state.stateHelper.stateMachine.cancelPreview();
                                    this.state.stateHelper.currentSelection.saveMarkdown='No';
                                    this.setState({stateMachineState: this.state.stateHelper.stateMachine.state});
                                }
                            }
                        }
                        event.target.value=' '; // This is necessary to clear Yes/No radio button.
                    } else {
                        if (id == 'MD_DELETE_BUTTON' ) {
                            this.setState({isDelete: true});
                        } else {
                            if (id == 'MD_CONFIRM_DELETE' ) {
                                if (this.state.selectedRow != undefined && event.target.value === 'Yes' ) {
                                    let selectedId = this.state.selectedRow.id;
                                    let tmpImages=[];
                                    this.state.images.forEach(function(image){
                                        if (image.id != selectedId ) {
                                            tmpImages.push(image);
                                        }
                                    });
                                    let newState=Object.assign({}, this.state,{isDelete: false},{images: tmpImages},{deleteYesNo: ''} ,{selectedRow: undefined} );
                                    //console.log('selectedId = ' + selectedId +' event.target.value =  ' + event.target.value +  ' Changing state newState = ' );
                                    //console.dir(newState);
                                    //console.dir(this);

                                    this.setState(newState);

                                    //this.setState({state: newState});
                                }
                            } else {
                                if (id == 'MD_UPDATE_BUTTON' ) {
                                    if (this.state.selectedRow != undefined ) {
                                        this.state.stateHelper.currentSelection.markdownText=this.state.selectedRow.markdownText;
                                        this.state.stateHelper.currentSelection.description=this.state.selectedRow.description;
                                        this.setState({mode: 'UPDATE'});

                                        //console.log ('MD_UPDATE_BUTTON this = ');
                                        //console.dir(this);

                                        //if (this.state.stateHelper.stateMachine.can('begin')) {
                                        //    this.state.stateHelper.stateMachine.begin();
                                        //}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    createMarkup() {
        return {__html: this.state.stateHelper.currentSelection.converted};
    }


    handleSubmit(event) {
      //alert('Markdown saved: ' + this.state.value);
      event.preventDefault();

        if (this.state.stateHelper.stateMachine.can('preview')) {
            this.state.stateHelper.stateMachine.preview();
            let converted=  this.convertMarkdownText(this.state.stateHelper.currentSelection.markdownText);
            this.state.stateHelper.currentSelection.converted=converted;
            this.setState({stateMachineState: this.state.stateHelper.stateMachine.state});
        }

        //console.log('converted = ' + converted);
    }
    getNewImages() {
        let newImages=[];
        this.state.images.forEach(function(image, index){
            if (!image.isDeleted) {
                newImages.push(image);
            }
        });
        return newImages;
    }


    render() {
        //console.log('current state = ' + this.state.stateHelper.stateMachine.state + ' mode = ' + this.state.mode + ' current text area length = ' + this.state.stateHelper.currentSelection.markdownText.length);
        //console.log('saveMarkdown  = ' + this.state.stateHelper.currentSelection.saveMarkdown);
        //console.log('markdownText  = ' + this.state.stateHelper.currentSelection.markdownText);
        //console.log('images.length  = ' + this.state.images.length);
        //console.dir(this.state);

        if (this.state.stateHelper.stateMachine.state === 'start') {
            let newImages=this.getNewImages();
            if (newImages.length == 0 ) {
                return (
                    <div>
                        <MarkdownTextArea  id='TEXT_AREA' value={this.state.stateHelper.currentSelection.markdownText} cols={60} rows={30} onChange={this.onChange} submit={false} />
                    </div>
                );
            } else {
                return (
                    <div>
                        <MarkdownTextArea  id='TEXT_AREA' value={this.state.stateHelper.currentSelection.markdownText} cols={60} rows={30} onChange={this.onChange} submit={false} />
                        <MarkdownDeleteUpdate onChange={this.onChange} isDelete={this.state.isDelete} selectedRow={this.state.selectedRow} deleteYesNo={this.state.isDelete} />
                        <label>
                            Saved markdowns are listed below:
                        </label>
                        <MarkdownTable data={newImages} rowSelected={this.rowSelected} convertMarkdownText={this.convertMarkdownText}  />
                    </div>
                );
            }
        } else {
            if (this.state.stateHelper.stateMachine.state === 'begin') {
                return(
                    <MarkdownTextAndTable images={this.state.images} handleSubmit={this.handleSubmit} onChange={this.onChange} isDelete={this.state.isDelete} selectedRow={this.state.selectedRow}
                                          markdownText={this.state.stateHelper.currentSelection.markdownText} convertMarkdownText={this.convertMarkdownText} deleteYesNo={this.state.isDelete}
                                          getNewImages={this.getNewImages} rowSelected={this.rowSelected}
                                          mode={this.state.mode} isTextAreaChanged={this.state.isTextAreaChanged} />
                );
            } else {
                if (this.state.stateHelper.stateMachine.state === 'preview') {
                    let tmpLabel=MARKDOWN_SAVE_CONTROL_LABEL;
                    if (this.state.mode == 'UPDATE') {
                        tmpLabel=MARKDOWN_UPDATE_CONTROL_LABEL;
                    }
                    //console.log ('Check mode and decide on label  tmpLabel = ' + tmpLabel);
                    //console.dir(this);
                    return (
                    <FormGroup onChange= {this.onChange} id='TEXT' >
                        <PageFormYesNo controlLabel={tmpLabel} radioId={SAVE_RADIO_ID} checked={this.state.stateHelper.currentSelection.saveMarkdown} onChange={this.onChange} stateHelper={this.state.stateHelper}/>
                        <div dangerouslySetInnerHTML={this.createMarkup()} />;
                    </FormGroup>
                    )
                } else {
                    if (this.state.stateHelper.stateMachine.state === 'description') {
                        //console.log('description state = ');
                        //console.dir(this.state);
                        //console.dir(this);
                        return (
                            <FormGroup onChange= {this.onChange} id='TEXT' >
                                <label className="unset-display">Enter description</label>
                                <input id='TEXT' required autoFocus type='text' value={this.state.stateHelper.currentSelection.description} onChange={this.onChange} placeholder='Description'  />
                                <Button id="SAVE_BUTTON" as="input" type="button" value="Input" onClick={this.onChange} >Save</Button>
                            </FormGroup>
                        )
                    } else {
                        return (
                            <div>
                                Unknown state {this.state.stateHelper.stateMachine.state}
                            </div>
                        );
                    }
                }

            }
        }
    }
}


export default MarkdownForm;

