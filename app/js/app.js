/**
* Contact Manager experimental app with Flux architecture - React
* Developed by Pooria Atarzadeh - @p0zart
*
* This project is using browserify to handle module requirements 
*/
var React = require('react');

var ContactApp = require('./components/ContactApp.react');


React.render(
  <ContactApp />,
  document.getElementById('contact-holder')
);
