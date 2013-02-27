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
    }
  };
})(window, $, window.app || {});