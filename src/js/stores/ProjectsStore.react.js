import React from 'react';
import alt from '../alt';

import ProjectsActions from '../actions/ProjectsActions.react';

class ProjectsStore {
    constructor() {
        this.projects = {
            projects: [],
            selProject: null,
            showOverlay: false
        };
        this.bindListeners({
            handleGetAllProjects: ProjectsActions.GET_ALL_PROJECTS,
            handleSetSelProject: ProjectsActions.SET_SEL_PROJECT,
            handleProjectCreated: ProjectsActions.PROJECT_CREATED,
            handleProjectCreateClose: ProjectsActions.CLOSE_NEW_PROJECT
        });
    }
    handleProjectCreateClose() {
      this.showOverlay = false;
    }
    handleProjectCreated(project) {
      if(project.result.status === "new project created") {
        var newProject = {
          name: project.result.name,
          date: ''
        };
        this.projects.projects.push(newProject);
      }
      this.showOverlay = false;
    }
    handleSetSelProject(project) {
      this.projects.selProject = project;
    }
    handleGetAllProjects(projects) {
      this.projects = projects;
    }
}

module.exports = alt.createStore(ProjectsStore, 'ProjectsStore');
