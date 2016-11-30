var React = require('react');
var ReactDOM = require('react-dom');
var SourceManifestWindow = require('SourceManifestWindow');
var uuid = require('node-uuid');

var SourceManifestBrowser = React.createClass({
  getInitialState: function() {
    var sourceManifests = localStorage.getItem('sourceManifests') ? JSON.parse(localStorage.getItem('sourceManifests')) : [];
    return {
      sourceManifests: sourceManifests,
      uuid: uuid()
    }
  },
  addSourceManifestToState: function(manifestData) {
    // create a copy of the source manifests
    var sourceManifests = [...this.state.sourceManifests];

    // append the manifest to the list of source manifests
    sourceManifests.push(manifestData);

    // update the list of source manifests in the state
    this.setState({
      sourceManifests: sourceManifests,
      uuid: uuid()
    }, function() {
      // auto scroll to the end of the Sequence Browser when a new sequence is opened
      var $manifestBrowser = $(ReactDOM.findDOMNode(this.refs.manifestBrowser));
      var scrollPosition = 0;
      $manifestBrowser.children().each(function(index, elem){
        scrollPosition += ($(elem).width());
      });
      $manifestBrowser.animate({scrollLeft: scrollPosition}, 600);

      // retain the state of the opened source manifests in local storage
      localStorage.setItem('sourceManifests', JSON.stringify(sourceManifests));
    });
  },
  removeSourceManifestFromState: function(manifestIndex) {
    // create a copy of the source manifests
    var sourceManifests = [...this.state.sourceManifests];

    // remove the manifest from the list of source manifests
    sourceManifests.splice(manifestIndex, 1);

    // update the list of source manifests in the state
    this.setState({
      sourceManifests: sourceManifests,
      uuid: uuid()
    });

    // retain the state of the opened source manifests in local storage
    localStorage.setItem('sourceManifests', JSON.stringify(sourceManifests));
    if(localStorage.getItem('sourceManifests') == '[]') {
      localStorage.removeItem('sourceManifests');
    }
  },
  renderOpenSequenceMessage: function() {
    if(this.state.sourceManifests.length === 0) {
      return (
        <div className="alert alert-info no-source-manifests-message"><i className="fa fa-info-circle"></i> To import canvases, click on the "Open Sequence" button in the sidebar and open a sequence from a remote manifest.</div>
      );
    }
  },
  render: function() {
    var _this = this;
    return (
      <div key={this.state.uuid} className="source-manifest-browser" ref="manifestBrowser">
      {this.renderOpenSequenceMessage()}
        {
          Object.keys(this.state.sourceManifests).map(function(manifestIndex) {
            var manifestData = _this.state.sourceManifests[manifestIndex];
            return(
              <SourceManifestWindow key={manifestIndex} manifestIndex={manifestIndex} manifestData={manifestData} sourceManifests={_this.state.sourceManifests} onRemoveHandler={_this.removeSourceManifestFromState}/>
            );
          })
        }
      </div>
    );
  }
});

module.exports = SourceManifestBrowser;