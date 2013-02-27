(function(window,$,app){

//Item class
app.Item = function Item(opts){
  var options = opts || {};
  this.container = options.container || false;
  this.comprisedOf = options.comprisedOf || [];
  this.combineWith = options.combineWith || [];
  //this.ambientLight = options.ambientLight || 0;
  // the item accesses the ambient light set in the room var and passes it in to the look function
  this.visual_secret_threshold = options.visual_secret_threshold || 0;
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
  },
  look:function(perception, ambientLight){
      //playerPerception = perception || 0;
      //ambientLight = ambientLight || 0;
      console.log('item ambientLight '+ ambientLight);
      console.log('item perception '+ perception);
      console.log('item vst '+this.visual_secret_threshold);
    
    if (ambientLight * perception > this.visual_secret_threshold) {
      if(typeof this.descriptor !== "undefined") {
        return this.sights || 'It looks like a ' + this.descriptor + ', nothing more';
      }
      else{
        return this.sights || 'You are not quite sure what it is';
      }
    } else {
      return 'Unable to see the details';
    }
  },
  touch:function(){
    return this.feels || 'It feels like ' + app.fn.article(this.descriptor) + this.descriptor;
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
    return this.dropping || 'You toss the ' + this.descriptor + ' to the side';
    //put item in parent of character item;
  }
};

})(window, $, window.app || {});