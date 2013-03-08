(function(window,$,app){

//Item class
app.Item = function Item(opts){
  var options = opts || {};
  this.descriptor = options.descriptor;
  this.container = options.container || false;
  this.containedItems = options.containedItems;
  this.comprisedOf = options.comprisedOf || [];
  this.combineWith = options.combineWith || [];
  this.visual_secret_threshold = options.visual_secret_threshold || 1;
  this.getting = options.getting;
  this.sights = options.sights;
  this.sounds = options.sounds;
  this.taste = options.taste;
  this.smells = options.smells;
  this.feels = options.feels;
  this.dropping = options.dropping;
};

app.Item.prototype = {
  // getDescriptor:function(){
  //   if(typeof this.descriptor !== "undefined")
  //     return app.fn.article(this.descriptor) + this.descriptor;
  //   else
  //     return 'It has no name';
  // }
};

})(window, $, window.app || {});