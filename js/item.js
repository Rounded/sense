(function(window,$,app){

//Item class
app.Item = function Item(opts){
  var options = opts || {};
  this.container = options.container || false;
  this.comprisedOf = options.comprisedOf || [];
  this.combineWith = options.combineWith || [];
  this.discoveredItems = options.discoveredItems || [];
  //this.ambientLight = options.ambientLight || 0;
  // the item accesses the ambient light set in the room var and passes it in to the look function
  this.visual_secret_threshold = options.visual_secret_threshold || 1;
  this.descriptor = options.descriptor;
  this.sights = options.sights;
  this.sounds = options.sounds;
  this.getting = options.getting;
  this.containedItems = options.containedItems;
  this.dropping = options.dropping;
  this.feels = options.feels;
};

app.Item.prototype = {
  getDescriptor:function(){
    if(typeof this.descriptor !== "undefined")
      return app.fn.article(this.descriptor) + this.descriptor;
    else
      return 'It has no name';
  }
};

})(window, $, window.app || {});