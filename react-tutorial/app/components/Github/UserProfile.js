var React = require('react');

var UserProfile = React.createClass({
  render: function(){
    return (
      <div>
        <h3>User profile:</h3>
        {this.props.bio.avatar_url && <li className="list-group-item"><img src={this.props.bio.avatar_url} className="img-thumbnail"></img></li>}
        {this.props.bio.name && <li className="list-group-item"><p>{this.props.bio.name}</p></li>}
      </div>
    )
  }
});

module.exports = UserProfile;
