var system = require('system');
var page = require('webpage').create();
var fs = require('fs');

if (system.args.length === 3) {
    console.log('Usage: snap.js <some URL> <view port width> <target image name>');
    phantom.exit();
}

var url = system.args[1];
var image_name = system.args[3];
var view_port_width = system.args[2];
var current_requests = 0;
var last_request_timeout;
var final_timeout;


page.viewportSize = { width: view_port_width, height: 1500};
page.settings = { loadImages: true, javascriptEnabled: true };

// If you want to use additional phantomjs commands, place them here
page.settings.userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.17';

// You can place custom headers here, example below.
// page.customHeaders = {

//      'X-Candy-OVERRIDE': 'https://api.live.bbc.co.uk/'

//  };

// If you want to set a cookie, just add your details below in the following way.

phantom.addCookie({
    'name': 'nonsession',
    'value': 'BAQAAAU3vXZmEAAaAAAQACVdgSBp2aW5vZGtsODMACAAcVak7FDE0MzQ0NzU5Mzh4MTUxNzA3MzkwNzQ4eDB4MlkAEAAJV2LhlHZpbm9ka2w4MwAzAA5XYuGUOTUwNTEtNzQwMSxVU0EAQAAJV2LhlHZpbm9ka2w4MwCaAApVgbeadmlub2RrbDgzcgCcADhXYuGUblkrc0haMlByQm1kajZ3Vm5ZK3NFWjJQckEyZGo2QUZrSWFqQ1ptQm9nNmRqNng5blkrc2VRPT0AnQAIV2LhlDAwMDAwMDAwAKoAAVdi4ZQwAMoAIF7nr5Q4MWJiZTIwMjE0YzBhMzU3ZjQwYzUzNWRmZmZmZmZmZgDLAAFVgbUjMQDzACJXYuGUJDIkUjFSajhESzQkYUIzbzJCZC9pNXFHNUxoZWVCYy9VLwFkAAJXYuGUI2EC+P4wsRd8ORxVya3WM0AfbKzLJw**',
    'domain': '.ebay.com',
    'path': '/'
});
phantom.addCookie({
    'name': 'dp1',
    'value': 'bu1p/dmlub2RrbDgz5762e194^a1p/05582ff9b^kms/in59441514^pcid/12910026115762e194^pbf/%23208040e000e000008188820000045762e194^exc/1%3A0%3A1%3A155a93b14^u1f/Vinod5762e194^expt/0001434391730704566fae72^mpc/0%7C055a93b1b^idm/15581e5cc^bl/US59441514^',
    'domain': '.ebay.com',
    'path': '/'
});

page.onResourceRequested = function(req) {
  current_requests += 1;
};

page.onResourceReceived = function(res) {
  if (res.stage === 'end') {
    current_requests -= 1;
    debounced_render();
  }
};

page.open(url, function(status) {
  if (status !== 'success') {
    console.log('Error with page ' + url);
    phantom.exit();
  }
});


function debounced_render() {
  clearTimeout(last_request_timeout);
  clearTimeout(final_timeout);

  // If there's no more ongoing resource requests, wait for 1 second before
  // rendering, just in case the page kicks off another request
  if (current_requests < 1) {
      clearTimeout(final_timeout);
      last_request_timeout = setTimeout(function() {
          console.log('Snapping ' + url + ' at width ' + view_port_width);
          page.render(image_name);
          phantom.exit();
      }, 5000);
  }

  // Sometimes, straggling requests never make it back, in which
  // case, timeout after 5 seconds and render the page anyway
  final_timeout = setTimeout(function() {
    console.log('Snapping ' + url + ' at width ' + view_port_width);
    page.render(image_name);
    phantom.exit();
  }, 5000);
}