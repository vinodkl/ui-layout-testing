'use strict';
var Q = require('q');
var fsActions = require('./fs-actions');
var constants = require('./constants');

var ServerActions = {
    createProject: function(req) {
        var createPromise = Q.defer();
        var postBody = req.body;
        if(!postBody.name) {
            return;
        }
        var projectName = postBody.name;
        var projectConfig = postBody.config; //TODO: use it later to setup the urls to diff, etc..
        var checkPromise = fsActions.checkIfProjectExists(projectName);
        checkPromise.then(function(stats) {
            var res;
            if(stats) {
                res = {
                  status: 'project already created',
                  name: projectName
                };
            } else {
                res = {
                  status: 'new project created',
                  name: projectName
                };
            }
            createPromise.resolve(res);
        });

        return createPromise.promise;
    },

    runProject: function(req) {
        var createPromise = Q.defer();
        var params = req.query;

        if(!params.name) {
            return;
        }
        var projectName = params.name;

        var checkPromise = fsActions.checkIfProjectExists(projectName);
        checkPromise.then(function(stats) {
            var res;
            if(stats) {
                var runFiles = fsActions.generateRunFiles(projectName);
                res = {
                  status: runFiles.status,
                  project: projectName,
                  date: runFiles.date,
                  runName: runFiles.runName
                };
            } else {
                res = {
                  status: 'No project by name ' + projectName + '. Please create the project before running'
                };
            }
            createPromise.resolve(res);
        });

        return createPromise.promise;
    },

    getAllProjects: function(req) {
        return fsActions.getAllProjects();
    },

    getAllRunsForProject: function(req) {
        var params = req.query;

        if(!params.name) {
            return;
        }
        var projectName = params.name;

        return fsActions.getAllRunsForProject(projectName);
    }
}

module.exports = ServerActions;
