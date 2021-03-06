var React = require('react');
var Repos = require('./Github/Repos');
var UserProfile = require('./Github/UserProfile');
import Notes from './Notes/Notes';
var ReactFireMixin = require('reactfire');
var firebase = require('firebase');
import getGithubInfo from '../utils/helpers';

var Profile = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      notes: [1, 2, 3],
      bio: {
        name: 'jacekelgda'
      },
      repos: ['a','b','c']
    }
  },
  componentDidMount: function() {
    var config = {
      apiKey: "AIzaSyAXEPZpNDIKvLJixCF6zy03l4UMtT4InYY",
      authDomain: "react-tut-3.firebaseapp.com",
      databaseURL: "https://react-tut-3.firebaseio.com",
      storageBucket: "react-tut-3.appspot.com",
      messagingSenderId: "329879300450"
    };
    this.ref = firebase.initializeApp(config);
    this.init(this.props.params.username);
  },
  componentWillReceiveProps: function(nextProps) {
    this.unbind('notes');
    this.init(nextProps.params.username);
  },
  componentWillUnmount: function() {
    this.unbind('notes');
  },
  handleAddNote: function(newNote) {
    firebase.database().ref('notes').child(this.props.params.username).child(this.state.notes.length).set(newNote);
  },
  init: function(username) {
    var ref = firebase.database().ref('notes');
    this.bindAsArray(ref.child(username), 'notes');

    getGithubInfo(username)
      .then(function(data) {
        this.setState({
          bio: data.bio,
          repos: data.repos
        });
      }.bind(this));
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio} />
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos} />
        </div>
        <div className="col-md-4">
          <Notes username={this.props.params.username}
            notes={this.state.notes}
            addNote={this.handleAddNote}
          />
        </div>
      </div>
    )
  }
})

module.exports = Profile;
