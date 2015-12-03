import React from 'react';
import Header from './components/Header.react';
import ProjectsList from './components/ProjectsList.react';
import ScreenViewer from './components/ScreenViewer.react';
import mainLess from '../less/main.less';
main();

function main() {
    var app = document.getElementById('content');

    React.render(
        <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header reg-app">
            <Header />
            <ProjectsList />
            <ScreenViewer />
        </div>,
        app
    );
}
