(function(window,$,app){
//Room class
app.Room = function Room(opts){
  var options = opts || {}; // Null Object Protection
  this.ambientLight = options.ambientLight || 0;
  this.visual_secret_threshold = options.visual_secret_threshold || 1;
  this.hiddenItems = options.hiddenItems || [];
  this.descriptor = options.descriptor;
  this.sights = options.sights;
  this.sounds = options.sounds;
  this.taste = options.taste;
  this.smells = options.smells;
  this.feels = options.feels;
};
app.Room.prototype = new app.Item();
app.Room.prototype = {
  //Move items from hidden to discovered
  revealItem:function(hiddenItem){
    this.discoveredItems.push(hiddenItem);
    return this.discoveredItems;
  }

  // hasItem:function(whichItem){
  //   //loop through discoveredItems
  //   for (var i = 0; i < this.discoveredItems.length; i++) {
  //     if (whichItem === this.discoveredItems[i].descriptor) {
  //       return true;
  //     }
  //   }
  // }
  //Move items from discoverd to hidden
};

})(window, $, window.app || {});