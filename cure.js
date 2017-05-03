/**
 * 
 */
console.log('This is for Cure');
var cureImport = require('./dataDumpClass.js');
var cureDump = new cureImport('Cure', 'csMongodb');
cureDump.sendLoad();