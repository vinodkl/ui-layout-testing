'use strict'

var express = require('express');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var multer = require('multer');
var serverActions = require('./src/server/actions');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(multer());

app.use(serveStatic(__dirname));

app.post('/api/create_project', function(req, res) {
    res.header('Content-Type', 'application/json');
    var resultPromise = serverActions.createProject(req);
    resultPromise.then(function(data) {
        res.send({
            result : data
        });
    });
});

app.get('/api/run_project', function(req, res) {
    res.header('Content-Type', 'application/json');
    var resultPromise = serverActions.runProject(req);
    resultPromise.then(function(data) {
        res.send({
            result : data
        });
    });
});

app.get('/api/get_all_projects', function(req, res) {
    res.header('Content-Type', 'application/json');
    var allProjects = serverActions.getAllProjects(req);
    // resultPromise.then(function(data) {
        res.send({
            projects : allProjects
        });
    // });
});

app.get('/api/get_all_runs_for_project', function(req, res) {
    res.header('Content-Type', 'application/json');
    var allProjects = serverActions.getAllRunsForProject(req);
    // resultPromise.then(function(data) {
        res.send({
            projects : allProjects
        });
    // });
});

app.listen(8088);
