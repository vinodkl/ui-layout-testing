import React from 'react';
import screenviewer from '../../less/screenviewer.less';
var RunsStore = require('../stores/RunsStore.react');
var ProjectsActions = require('../actions/ProjectsActions.react');
var Button = require('./Button.react');

var ScreenViewer = React.createClass({
  getInitialState() {
    var state = RunsStore.getState();
    return state;
  },
  componentWillUnmount() {
    RunsStore.unlisten(this.onChange);
  },
  componentDidMount() {
    RunsStore.listen(this.onChange);
  },
  render() {
    var self=this, content, selProject = this.state.runsInfo.project;
    if(this.state.runsInfo.project) {
      content = <div className="mdl-card__supporting-text mdl-color-text--grey-600">
          <span className="run_title">Runs for {selProject}</span>
          <Button name="start_run" label="Start new run" class="primary" clickHandler={self.startNewRun}/>
          <ul>
            {this.state.runsInfo.runs.projects.map((run, i) => {
              var ts = run.name * 1000;
              var name = new Date(ts);
              name = name.toString();
              return (
                <li key={i}>
                  <a href="#" onClick={self.openScreenshot} data-run={run.name}>{name}</a>
                </li>
              );
            })}
          </ul>
        </div>;
    } else {
      content = <div className="mdl-card__supporting-text mdl-color-text--grey-600">Select a project form the list or create new project</div>;
    }
    var toggleRunList = "mdl-grid demo-content";
    var toggleScreen = "screenshot-wrapper";
    if(!this.state.runUrl) {
      toggleScreen += " hide";
    } else {
      toggleRunList += " hide";
    }
    var loaderClass = "loader";

    if(this.state.runsInfo.runStarted) {
      loaderClass += " show";
      toggleScreen += " hide";
      toggleRunList += " hide";
    }

    return (
      <main className="viewer mdl-layout__content mdl-color--grey-100">
        <div className={loaderClass}>
          Generating & comparing screenshots...
          <div className="spinner"> </div>
        </div>
        <div className={toggleRunList}>
          <div className="demo-updates mdl-card mdl-shadow--2dp mdl-cell mdl-cell--4-col mdl-cell--4-col-tablet mdl-cell--12-col-desktop">
            {content}
          </div>
        </div>
        <div className={toggleScreen}>
          <a href="#" className="back" onClick={self.closeScreen}> &lt; Back </a>
          <iframe src={this.state.runUrl} />
        </div>
      </main>
    )
  },
  startNewRun() {
    ProjectsActions.startNewRun(this.state.runsInfo.project);
  },
  closeScreen: function() {
    this.setState({"runUrl": null});
  },
  onChange(state) {
    this.setState(state);
  },
  openScreenshot(e) {
    var project = this.state.runsInfo.project,
      run = $(e.target).attr('data-run'),
      runUrl = 'http://localhost:8088/projects/' + project + '/' + run + '/shots/gallery.html';

    this.setState({
      runUrl: runUrl
    });
  }
});

module.exports = ScreenViewer;
