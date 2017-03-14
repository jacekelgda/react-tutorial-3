var React = require('react');

var UserProfile = React.createClass({
  render: function(){
    console.log('bio', this.props.bio);
    return (
      <div>
        <p>User profile:</p>
        <p>Username: {this.props.username}</p>
      </div>
    )
  }
});

module.exports = UserProfile;
