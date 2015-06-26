var
  React = require('react'),
  ModuleList = require('./ModuleList'),
  ModuleViewContainer = require('./ModuleViewContainer'),    
  moduleStore = require('../stores/moduleStore'),   
  synthesizerActions = require('../actions/synthesizerActions'),
  appConstants = require('../constants/appConstants'),
  Grid = require('react-bootstrap').Grid,
  Row = require('react-bootstrap').Row,
  Col = require('react-bootstrap').Col;

var Synthesizer = React.createClass({
  getInitialState: function() {
    moduleStore.addNewModuleListener(this._onNewModule);
    return {
      audioContext: new AudioContext,
      modules: {}
    } 
  },  
  componentDidMount: function(){
    synthesizerActions.addModule({name: "Primary Input", type: appConstants.moduleTypes.INPUT})
    synthesizerActions.addModule({name: "Synth Module", type: appConstants.moduleTypes.SYNTH_MODULE})
    synthesizerActions.addModule({name: "Primary Output", type: appConstants.moduleTypes.OUTPUT})    
  },     
  render: function(){
    return (
      <Grid>
        <Row>
          <Col md={2}>
            <ModuleList moduleList={this.state.modules}/>
          </Col>
          <Col md={10}>
            <Row>
              <Col md={12}>
                <ModuleViewContainer audioContext={this.state.audioContext} modules={this.state.modules}/>
              </Col>
            </Row>           
          </Col>        
        </Row>
      </Grid>
    )
  },
  _onNewModule: function(value){
    this.setState({modules: moduleStore.getModuleList()});
  }
});

module.exports = Synthesizer;