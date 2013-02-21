(function(window,$,app){

//Item class
app.Item = function Item(opts){
  var options = opts || {};

  this.descriptor = options.descriptor || 'It has no name';
  this.sights = options.sights || 'You must be blind';
  this.sounds = options.sounds || 'You must be deaf';
  this.container = options.container || 'Not a container';
  this.containedItems = options.containedItems || 'nothing';
  this.getting = options.getting || 'Fingers?';
  //this.getting = options.getting || 'Fingers?';
  //this.getting = options.getting || 'Fingers?';
};

app.Item.prototype = {
  container:false,
  comprisedOf:[],
  combineWith:[],

  getDescriptor:function(){
    if(this.descriptor.length > 0)
      return app.fn.article(this.descriptor) + this.descriptor;
    else
      return 'There is no name';
  },
  look:function(){
    if (app.options.player_sight * app.options.player_perception > app.options.item_visual_secret_threshold) {
      if(typeof this.descriptor !== "undefined") {
        return this.sights || 'It looks like a ' + this.descriptor + ', nothing more';
      }
      else{
        return this.sights || 'You are not quite sure what it is';
      }
    } else {
      return 'Unable to dicern details';
    }
  },

  listen:function(){
    return this.sounds || 'The ' + this.descriptor + 'isn\'t emmitting any sounds.';
  },
  combine:function(otherItem){
    //if ((combineWith.indexOf(otherItem)) !== -1){ //indexOf returns -1 if fail
      //create new item that contains the other items and is comprised of the other items
    //}
  },
  disassemble:function(){
    //check to see if item is comprised of other items (are there items in the comprisedOf array)
    //put contained items in character inv
    //destroy item
  },
  take:function(){
    return this.getting || 'Try as you might you cannot take the ' + this.descriptor;
  },
  //search function is a take function
  search:function(){
    if (this.container){
      if (this.containedItems){
        var items = 'You find:\n';
        for (var i = 0; i < this.containedItems.length; i++) {
          items += 'You find ' + article(this.descriptor) + this.containedItems[i] +'\n';
        }
        return items;
      }else{
        return 'You grope around in the ' + this.descriptor + ', but find nothing. Disapoint.';
      }
    }else{
      return 'The ' + this.descriptor + ' isn\'t a container.';
    }
  },

  drop:function(){
    return 'You toss the ' + this.descriptor + ' to the side';
  }
};

})(window, $, window.app || {});