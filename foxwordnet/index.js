//var { ToggleButton } = require('sdk/ui/button/toggle');//creating button
var panels = require("sdk/panel");//lib for panel
var self = require("sdk/self");
var cm = require("sdk/context-menu");//lib for context menu
var textselected;

var menuItem = cm.Item({
  label: "Malayalam Wordnet",
  context: cm.SelectionContext(),
  contentScript: 'self.on("context", function () {' +
                 '  var text = window.getSelection().toString();' +                     //Script for  menu printing
                 '  if (text.length > 20)' +
                 '    text = text.substr(0, 20) + "...";' +
                 '  return "Malayalam-Wordnet : " + text;' +
                 '});'+
                 'self.on("click", function () {' +
                 '  var text = window.getSelection().toString();' +
                 '  if (text.length > 20)' +
                 '    text = text.substr(0, 20);' +
                 '  self.postMessage(text);' +
                 '});',
  onMessage: function (text) {
    panel.contentURL = "http://www.cfilt.iitb.ac.in/indowordnet/first?langno=9&queryword="+text;    //opening this url in a panel
    panel.show();
  }
});
var selection = require("sdk/selection");


var panel = panels.Panel({
  contentURL: self.data.url("panel.html"),
  onHide: handleHide,
  width: 300,
  height: 400,
  //contentScript: myScript
  //contentScriptFile: data.url("get-text.js")
});

function handleChange(state) {
	panel.contentURL =  self.data.url("loading.html");
	panel.show({
		  position: button
		});
	  if (state.checked) {
	  if(selection.text != null && selection.text!=""){
		  panel.contentURL = "http://www.cfilt.iitb.ac.in/indowordnet/first?langno=9&queryword="+selection.text;
	  }else{
		panel.contentURL =  self.data.url("panel.html");
	  }
		panel.show({
		  position: button
		});
  }
}

function handleHide() {
	panel.contentURL =  self.data.url("loading.html");
  button.state('window', {checked: false});
}