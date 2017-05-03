/**
 * 
 */

console.log('This is for AD');
var adImport = require('./dataDumpClass.js');
var adDump = new adImport('AD', 'csMongodb');
adDump.sendLoad();