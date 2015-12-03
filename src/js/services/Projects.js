var Q = require('q');

var apiEndpoint = "http://localhost:8088/api";
var Projects = {
    fetchAllProjects: function() {
        var fetchPromise = Q.defer();
        // setTimeout(function() {
        //     fetchPromise.resolve('Project whooo');
        // }, 1000);
        $.ajax({
            url: apiEndpoint + '/get_all_projects',
            success: function(data) {
                fetchPromise.resolve(data);
            },
            failure: function(err) {

            }
        });
        return fetchPromise.promise;
    },
    fetchRunsForProject: function(project) {
      var fetchPromise = Q.defer();
      $.ajax({
          url: apiEndpoint + '/get_all_runs_for_project?name=' + project,
          success: function(data) {
              fetchPromise.resolve(data);
          },
          failure: function(err) {

          }
      });
      return fetchPromise.promise;
    },
    runProject: function(projectName) {
      var runPromise = Q.defer();
      $.ajax({
          url: apiEndpoint + '/run_project?name=' + projectName,
          success: function(data) {
            runPromise.resolve(data);
          },
          failure: function(err) {

          }
      });
      return runPromise.promise;
    },
    createProject: function(projectName) {
      var promise = Q.defer();
      $.ajax({
          url: apiEndpoint + '/create_project',
          method: 'POST',
          data: {
            name: projectName
          },
          success: function(data) {
            promise.resolve(data);
          },
          failure: function(err) {

          }
      });
      return promise.promise;
    }
}

module.exports = Projects;
