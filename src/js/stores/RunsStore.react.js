import React from 'react';
import alt from '../alt';

import ProjectsActions from '../actions/ProjectsActions.react';

class RunsStore {
    constructor() {
        this.runsInfo = {
            runs: [],
            project: '',
            runStarted: false
        };
        this.bindListeners({
            handleGetAllRunsForProject: ProjectsActions.GET_ALL_RUNS_FOR_PROJECT,
            handleRunStarted: ProjectsActions.START_NEW_RUN,
            handleNewRunComplete: ProjectsActions.RAN_PROJECT
        });
    }
    handleRunStarted() {
      this.runsInfo.runStarted = true;
    }
    handleNewRunComplete(runInfo) {
      var run = {
        date: runInfo.result.date,
        name: runInfo.result.runName
      };
      var project = runInfo.result.project;
      var runName = runInfo.result.runName;
      this.runUrl = 'http://localhost:8088/projects/' + project + '/' + runName + '/shots/gallery.html';
      this.runsInfo.runs.projects.push(run);
      this.runsInfo.runStarted = false;
    }
    handleGetAllRunsForProject(runs) {
        this.runsInfo = runs;
    }
}

module.exports = alt.createStore(RunsStore, 'RunsStore');
