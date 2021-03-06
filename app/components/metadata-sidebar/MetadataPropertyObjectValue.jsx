var React = require('react');
var EditableTextArea = require('EditableTextArea');
var Utils = require('Utils');

var MetadataPropertyObjectValue = React.createClass({
  getInitialState: function() {
    return {
      fieldName: this.props.fieldName,
      fieldValue: this.props.fieldValue,
      updateHandler: this.props.updateValueHandler
    }
  },
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      fieldValue: nextProps.fieldValue
    });
  },
  render: function() {
    var _this = this;
    return (
      <div>
        {
          Object.keys(this.state.fieldValue).map(function(propertyName, propertyIndex) {
            var propertyValue = _this.state.fieldValue[propertyName];
            return (
              <dd key={propertyIndex} className="metadata-field-value">
                <EditableTextArea
                  fieldName={propertyName}
                  fieldValue={propertyValue}
                  labelPrefix={Utils.getTranslatedPropertyName(_this.state.fieldName, propertyName) + ': '}
                  updateHandler={_this.state.updateHandler}
                />
              </dd>
            );
          })
        }
      </div>
    );
  }
});

module.exports = MetadataPropertyObjectValue;