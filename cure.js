/**
 * 
 */
function Cure(){
console.log('This is for Cure');
};

Cure.prototype.CurePump = function(){
	var cureImport = require('./dataDumpClass.js');
	var cureDump = new cureImport('Cure', 'csMongodb');
	cureDump.sendLoad();
};
module.exports = Cure;