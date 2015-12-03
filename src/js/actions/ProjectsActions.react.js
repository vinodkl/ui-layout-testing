var alt = require('../alt');
var ProjectsService = require('../services/Projects');

var ProjectsActions = {
    requestAllProjects: function() {
        this.dispatch();
        var projectsPromise = ProjectsService.fetchAllProjects();
        var self = this;
        projectsPromise.then(function(projectName) {
            self.actions.getAllProjects(projectName);
        });
    },
    requestRunsForProject: function(project) {
      this.dispatch();
      var runsPromise = ProjectsService.fetchRunsForProject(project);
      var self = this;
      runsPromise.then(function(runs) {
          self.actions.getAllRunsForProject(runs, project);
          self.actions.setSelProject(project);
      });
    },
    createNewProject: function(projectName) {
      this.dispatch();
      var runsPromise = ProjectsService.createProject(projectName);
      var self = this;
      runsPromise.then(function(data) {
          self.actions.projectCreated(data);
      });
    },
    startNewRun: function(projectName) {
      this.dispatch();
      var runsPromise = ProjectsService.runProject(projectName);
      var self = this;
      runsPromise.then(function(data) {
          self.actions.ranProject(data);
      });
    },
    ranProject: function(data) {
      this.dispatch(data);
    },
    projectCreated: function(data) {
      this.dispatch(data);
    },
    getAllRunsForProject: function(runs, project) {
      this.dispatch({
        runs: runs,
        project: project
      });
    },
    closeNewProject: function() {
      this.dispatch();
    },
    setSelProject: function(project) {
      this.dispatch(project);
    },
    getAllProjects: function(projects) {
      this.dispatch(projects);
    },
    errorFetch: function(errorMsg) {
      this.dispatch(errorMsg);
    }
}

module.exports = alt.createActions(ProjectsActions);
