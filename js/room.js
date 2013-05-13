(function(window,$,app){
//Room class
app.Room = function Room(opts){
  var options = opts || {}; // Null Object Protection
  this.ambientLight = options.ambientLight || 0;
  this.isContainer = options.isContainer || true;
  this.containedItems = options.containedItems || [];
  this.descriptor = options.descriptor;
  this.sights = options.sights //+ this.listContainedItems();
  this.visualSecret = options.visualSecret;
  this.visualSecretThreshold = options.visualSecretThreshold || 1;
  this.sounds = options.sounds;
  this.taste = options.taste;
  this.smells = options.smells;
  this.touch = options.touch;
};
app.Room.prototype = new app.Item();
app.Room.prototype = {
  listContainedItems:function(){
    //get contained items
    var numContained = this.containedItems.length,
        list = [];
    if (numContained !== 0) {
      for (var i = 0; i < numContained; i++ ){
        list.push(this.containedItems[i].descriptor[0]);
      }
      return "<p>In the room there is:<br />" + list.join('<br />') + '</p>';
    }else{
      return "There is nothing  :(";
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