(function(window,$,app){

//Item class
app.Item = function Item(opts){
  var options = opts || {};
  this.ambientLight = options.ambientLight || 0;
  this.isStationary = options.isStationary || false;
  this.descriptor = options.descriptor;
  this.isContainer = options.isContainer || false;
  this.containedItems = options.containedItems || [];
  this.comprisedOf = options.comprisedOf || [];
  this.combineWith = options.combineWith || [];
  this.getting = options.getting;
  this.sightDescription = options.sightDescription;
  this.visualSecret = options.visualSecret;
  this.visualSecretThreshold = options.visualSecretThreshold || 1;
  this.sounds = options.sounds;
  this.tastes = options.tastes;
  this.smells = options.smells;
  this.touch = options.touch;
  this.dropping = options.dropping;
};

app.Item.prototype = {
  listContainedItems:function(){
    if (!this.isContainer){
      return 'The ' + this.descriptor[0] + ' isn\'t a container.'
    }
    //get contained items
    var numContained = this.containedItems.length,
        list = [];
    if (numContained == 0) {
      return "The container is empty :(";
    }
    for (var i = 0; i < numContained; i++ ){
      list.push(this.containedItems[i].descriptor[0]);
    }
    return "<p>The "+this.descriptor[0]+" contains:</p>" + list.join('<br />');
  },
  hasItem:function(whichItem){
    return roomItems;
    for (var i = 0; i < this.containedItems.length; i++) {
      if (whichItem === this.containedItems[i]) {
        return true;
      }
    }
  }
  
  // getDescriptor:function(){
  //   if(typeof this.descriptor !== "undefined")
  //     return app.fn.article(this.descriptor) + this.descriptor;
  //   else
  //     return 'It has no name';
  // }
};

})(window, $, window.app || {});