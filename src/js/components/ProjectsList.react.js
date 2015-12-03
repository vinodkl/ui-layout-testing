var React = require('react');
var ProjectsStore = require('../stores/ProjectsStore.react');
var ProjectsActions = require('../actions/ProjectsActions.react');
var CreateProjectModal = require('./CreateProjectModal.react');
var Button = require('./Button.react');
require('../../less/list.less');

var ProjectsList = React.createClass({
    getInitialState() {
        var state = ProjectsStore.getState();
        return state;
    },
    componentWillUnmount() {
        ProjectsStore.unlisten(this.onChange);
    },
    componentDidMount() {
        ProjectsStore.listen(this.onChange);
        ProjectsActions.requestAllProjects();
    },

    render() {
        var self = this;
        var divStyle = {
            border: '1px solid black'
        }
        var overlayClass = 'overlay';
        if(this.state.showOverlay) {
          overlayClass += ' show';
        } else {
          overlayClass += ' hide';
        }
        return (
            <div className="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
                <CreateProjectModal class={overlayClass} />
                <header className="demo-drawer-header">
                  <span>Projects List</span>
                  <Button name="create_proj" label="+" class="icon-plus small" clickHandler={self.openCreateProjectDialog}/>
                </header>
                <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
                {this.state.projects.projects.map((project, i) => {
                    var selClass = '';
                    if (this.state.projects.selProject === project.name) {
                      selClass = "mdl-navigation__link project-link selected";
                    } else {
                      selClass = "mdl-navigation__link project-link";
                    }
                    return (
                        <a className={selClass} key={i} onClick={self.openRuns} data-project={project.name}>{project.name}</a>
                    );
                })}
                </nav>
            </div>
        );
    },
    openCreateProjectDialog: function() {
      this.setState({showOverlay: true});
    },
    openRuns(e) {
        var project = $(e.target).data('project');
        this.state.projects.selProject = project;
        ProjectsActions.requestRunsForProject(project);
    },
    onChange(state) {
      this.setState(state);
    }
});

module.exports = ProjectsList;
