(function(window,$,app){
//Room class
app.Room = function Room(opts){
  var options = opts || {}; // Null Object Protection
  this.ambientLight = options.ambientLight || 0;
  this.hiddenItems = options.hiddenItems || [];
  this.container = options.container || false;
  this.containedItems = options.containedItems || [];
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
  },
  listContainedItems:function(){
    if (this.container){
      //get contained items
      var numContained = this.containedItems.length,
          list = [];
      if (numContained !== 0) {
        for (var i = 0; i < numContained; i++ ){
          list.push(this.containedItems[i].descriptor[0]);
        }
        return "<p>In the room there is:</p>" + list.join('<br />');
      }else{
        return "The container is empty :(";
      }
    }else{
      return null;
    }
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