export const markdownStateHelper = () => {
    var StateMachine = require('javascript-state-machine');
    var fsm = new StateMachine({
        init: 'start',
        transitions: [
            { name: 'begin',     from: 'start',  to: 'begin' },
            { name: 'preview',     from: 'begin',  to: 'preview' },
            { name: 'description',     from: 'preview',  to: 'description' },
            { name: 'save',     from: 'description',  to: 'begin' },
            { name: 'cancelPreview',     from: 'preview',  to: 'begin' },
            { name: 'cancelDescription',     from: 'description',  to: 'begin' }
        ],
        methods: {
            onBegin:     function() {//console.log('StateMachine - Begin started');
            },
            onPreview:     function() { // console.log('StateMachine - Preview started');
            },
            onDescription:     function() { //console.log('StateMachine - Description started');
            },
            onSave:     function() { // console.log('StateMachine - Save started');
            },
            onCancelPreview:     function() { //console.log('StateMachine - Cancel preview started');
            },
            onCancelDescription:     function() { //console.log('StateMachine - Cancel Description started');
            }
        }
        });
    //var setHelper = function (stateHelper) {
    //    fsm.helper=stateHelper;  // the state machine needs to access to helper to save information.
    //}
    // verified currentSelection is getting initialized after save
    let currentSelection = {
        markdownText: '',
            converted: '',
            description: '',
            saveMarkdown: ''
    };
    return {
        stateMachine: fsm,
        currentSelection: currentSelection
        //setHelper: setHelper
    }
}
