var fs = require('fs');
var Q = require('q');
var constants = require('./constants');
var sh = require('execSync');
var path = require('path');

var FSActions = function() {
    var _createNewProject = function(projectName) {
        fs.mkdirSync(constants.PROJECTS_ROOT + '/' + projectName);
    }
    var _copyFileSync = function(srcFile, destFile) {


    }
    return {
        checkIfProjectExists: function(projectName) {
            var createPromise = Q.defer();
            var stats = fs.lstat(constants.PROJECTS_ROOT + '/' + projectName, function(err, stats) {
                if(!stats) {
                    _createNewProject(projectName);
                }
                createPromise.resolve(stats);
            });
            return createPromise.promise;
        },
        generateRunFiles: function(projectName) {
            var projectPath = constants.PROJECTS_ROOT + '/' + projectName;
            var runFolderName = Math.floor(Date.now() / 1000);
            var runFolderPath =  projectPath + '/' + runFolderName;
            var configSpec = fs.readFileSync(constants.SPECS_PATH + '/spec.yaml').toString();
            configSpec = configSpec.replace(/\${shots-path}/, runFolderPath + '/shots');

            fs.mkdirSync(runFolderPath);
            fs.writeFileSync(runFolderPath + '/spec.yaml', configSpec);

            var retCode = sh.exec('wraith capture ' + runFolderPath + '/spec.yaml');
            var fileStat = fs.statSync(runFolderPath);
            return {
              runName: runFolderName,
              date: new Date(fileStat.ctime),
              status: 'success'
            };
        },
        getAllProjects: function() {
            var srcpath = constants.PROJECTS_ROOT;
            var projects = [];
            try {
                var projFolders = fs.readdirSync(srcpath);
                for(var i=0;i<projFolders.length;i++) {
                    var file = projFolders[i];
                    var fileStat = fs.statSync(path.join(srcpath, file));
                    var retObj = {
                        name: file,
                        date: new Date(fileStat.ctime)
                    }
                    projects.push(retObj);
                }
            } catch (e) {
                if(e.errno === 34) {
                    //No projects folder found
                    fs.mkdirSync(constants.PROJECTS_ROOT);
                }
            }
            return projects;
        },
        getAllRunsForProject: function(projectName) {
            var srcpath = constants.PROJECTS_ROOT + '/' + projectName;
            var projectRuns = [];
            var projFolders = fs.readdirSync(srcpath);

            for(var i=0;i<projFolders.length;i++) {
                var file = projFolders[i];
                var fileStat = fs.statSync(path.join(srcpath, file));
                var retObj = {
                    name: file,
                    date: new Date(fileStat.ctime)
                }
                projectRuns.push(retObj);
            }
            return projectRuns;
        }
    }
}

module.exports = FSActions();
