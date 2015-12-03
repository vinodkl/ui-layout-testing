var React = require('react');
var ProjectsActions = require('../actions/ProjectsActions.react');
var Button = require('./Button.react');

var CreateProjectModal = React.createClass({
    getInitialState() {
      return {
        value: this.props.value || ''
      };
    },
    componentWillUnmount() {

    },
    componentDidMount() {
    },

    render() {
      var overlayClass = this.props.class;
      var self = this;

      return (
        <div className={overlayClass}>
          <div className="overlay-inner">
            <h4>New Project</h4>
            <input
              type="text"
              name="project_name"
              id="project_name"
              onBlur={this._save}
              onChange={this._onChange}
              onKeyDown={this._onKeyDown}
              value={this.state.value}
              placeholder="Add project name" />
            <div className="">
              <Button name="add_proj" label="Save" class="primary save_btn" clickHandler={self.saveNewProject}/>
              <Button name="cancel_proj" label="Cancel" class="primary cancel_btn" clickHandler={self.cancelNewProject}/>
            </div>
          </div>
        </div>
      );
    },
    _onChange: function(e) {
      this.setState({
          value: e.target.value
      });
    },
    _onKeyDown: function(e) {
      if(e.keyCode === 13) {
          this.saveNewProject();
      }
    },
    saveNewProject: function() {
      ProjectsActions.createNewProject(this.state.value);
      this.setState({
        value: ''
      });
    },
    cancelNewProject: function() {
      ProjectsActions.closeNewProject();
      this.setState({
        value: ''
      });
    }
});

module.exports = CreateProjectModal;
