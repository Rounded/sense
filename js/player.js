(function(window,$,app){
//Player class
  app.Player = function Player(playerData){
    var data = playerData || {};
    this.inventory = data.inventory || [];
    this.knownItems = data.knownItems || {};
    this.playerName = data.playerName || "Anonymous";
    this.perception = data.perception || 0;
  };

  app.Player.prototype = {
    
    // hasItem:function(noun){
    //   var availableItems = this.inventory.concat(this.knownItems.currentRoom);
    //   //console.log(availableItems.length);
    //   if (availableItems.length > 0) {
    //     for (var i = 0; i < availableItems.length; i++) {
    //       if (noun === availableItems[i].descriptor) {
    //         return availableItems[i];
    //       }
    //     }
    //   }else{
    //     return false;
    //   }
    // },
    // hasAction:function(verb){
    //   if(typeof this[verb] === "function"){
    //     //verb exists
    //     //roomArg = currentRoom[(getParamNames(theFunction)[0])] || '',
    //     //narration = currentPlayer[verb](roomArg, noun);
    //     //textNode.append(narration+'<br />');

    //     //playerArg = this[(app.fn.getParamNames(this.hasAction)[0])] || '';
    //     //itemArg = currentRoom[(getParamNames(theFunction)[2])] || '';
    //     //Append Success
    //     //console.log(currentPlayer[verb](roomArg, noun));
    //     return true;

    //   }
    //   else{
    //     return false;
    //     //textNode.append('You can\'t ' + verb + ' the ' + noun +'<br />');
    //   }
    // },
    addItem:function(theItem){
      this.inventory.push(theItem);
      return this.inventory;
    },
    look:function(theItem, room){
      if (!theItem.length){
        //It's important for the look function to focus on one thing
        //console.log(theItem);
        //console.log(room.ambientLight + ' ' + this.perception + ' ' + theItem.visual_secret_threshold);
        if (room.ambientLight * this.perception > theItem.visual_secret_threshold) {
          if(typeof theItem.descriptor[0] !== "undefined") {
            //If the item has a descriptor return the sights or a generic but nice sentence
            return theItem.sights || 'It looks like ' + app.fn.article(theItem.descriptor[0]) + theItem.descriptor[0] + ', nothing more';
          }else{
            //If the item doesn't have a descriptor... I'm not sure if this will ever happen
            return theItem.sights || 'You are not quite sure what it is';
          }
        }else{
          return "The darkness is like an opaque substance that fills the air.";
        }
      }else{
        return 'Try as you might, your eyes will not focus on more than one item.';
      }
    },
    listen:function(theItem, room){
      return theItem.sounds || "The " + theItem.descriptor[0] + " isn't emmitting any sounds.";
    },
    taste:function(theItem, room){
      return theItem.taste || "The " + theItem.descriptor[0] + " isn't all that flavorful. Although you wonder where its been.";
    },
    smell:function(theItem, room){
      return theItem.smell || "There is a slight smell but you can't tell if it's from the item your fingers or the inside of your nose.";
    },
    touch:function(theItem, room){
      return theItem.touch || 'It feels like ' + app.fn.article(theItem.descriptor[0]) + theItem.descriptor[0];
    }
    // combine:function(otherItem){
    //   //if ((combineWith.indexOf(otherItem)) !== -1){ //indexOf returns -1 if fail
    //     //create new item that contains the other items and is comprised of the other items
    //   //}
    // },
    // disassemble:function(){
    //   //check to see if item is comprised of other items (are there items in the comprisedOf array)
    //   //put contained items in character inv
    //   //destroy item
    // },
    // take:function(){
    //   return this.getting || 'Try as you might you cannot take the ' + this.descriptor;
    // },
    // //search function is a take function
    // search:function(){
    //   console.log(this.containedItems);
    //   if (this.container){
    //     if (this.containedItems){
    //       var foundItems = 'You find:\n';
    //       for (var i = 0; i < this.containedItems.length; i++) {
    //         foundItems += app.fn.article(this.descriptor) + this.containedItems[i].descriptor +'\n';
    //       }
    //       return foundItems;
    //     }else{
    //       return 'You grope around in the ' + this.descriptor + ', but find nothing. Dissapoint.';
    //     }
    //   }else{
    //     return 'The ' + this.descriptor + ' isn\'t a container.';
    //   }
    // },

    // drop:function(){
    //   return this.dropping || 'You toss the ' + this.descriptor + ' to the side';
    //   //put item in parent of character item;
    // }
  };
})(window, $, window.app || {});