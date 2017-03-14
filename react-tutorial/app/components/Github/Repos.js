var React = require('react');

var Repos = React.createClass({
  render: function(){
    console.log('repos', this.props.repos);
    return (
      <div>
        <p>Repos:</p>
      </div>
    )
  }
});

module.exports = Repos;
