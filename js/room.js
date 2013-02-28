(function(window,$,app){
//Room class
app.Room = function Room(opts){
  var options = opts || {}; // Null Object Protection

  this.visual_secret_threshold = options.visual_secret_threshold || 0;
  this.ambientLight = options.ambientLight || 0;
  this.discoveredItems = options.discoveredItems || [];
  this.hiddenItems = options.hiddenItems || [];
  this.descriptor = options.descriptor;
  this.sights = options.sights;
};
app.Room.prototype = new app.Item();
app.Room.prototype = {
  //My First Override!
  look:function(perception){
    var playerPerception = perception || 0;
      //console.log('room'+this.ambientLight);
      //console.log('room'+this.playerPerception);
      //console.log('room'+this.visual_secret_threshold);
    if (this.ambientLight * playerPerception > this.visual_secret_threshold) {
      return this.sights || "It\'s Just four walls, a floor, and ceiling";
    } else {
      return 'It\'s black as night';
    }
  },
  //Move items from hidden to discovered
  revealItem:function(hiddenItem){
    this.discoveredItems.push(hiddenItem);
    return this.discoveredItems;
  },

  hasItem:function(whichItem){
    //loop through discoveredItems
    for (var i = 0; i < this.discoveredItems.length; i++) {
      if (whichItem === this.discoveredItems[i].descriptor) {
        return true;
      }else{
        return false;
      }
    }
  }
  //Move items from discoverd to hidden
};

})(window, $, window.app || {});