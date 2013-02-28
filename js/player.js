(function(window,$,app){
//Player class
  app.Player = function Player(opts, items){
    this.inventory = items || [];
    this.playerName = opts.playerName || "Anonymous";
    this.perception = opts.perception || 0;
  };

  app.Player.prototype = {
    addItem:function(whichItem){
      this.inventory.push(whichItem);
      return this.inventory;
    },
    hasItem:function(whichItem){
      //loop through inventory
      for (var i = 0; i < this.inventory.length; i++) {
        if (whichItem === this.inventory[i].descriptor) {
          return true;
        }else{
          return false;
        }
      }
    }
  };
})(window, $, window.app || {});