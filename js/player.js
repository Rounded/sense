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
      //console.log(theItem);
      //console.log(this.perception +' * ' + room.ambientLight + ' >=? ' + theItem.visualSecretThreshold);
      //general vision check
      if (this.perception * room.ambientLight > 0){
        console.log(theItem);
        //does theItem contain multiple items?
        console.log(theItem.length);
        if (theItem.length < 2){
          //unwrap the item array
          var item = theItem[0];
          // Visual secret check
          console.log(item);
          if ((item.visualSecret) && (this.perception * room.ambientLight >= item.visualSecretThreshold)) {
            var secretSight = item.sights.concat(' ' + item.visualSecret);
            return secretSight + item.listContainedItems();
          }else{
              return item.sights + item.listContainedItems()  || 'It looks like ' + app.fn.article(item.descriptor[0]) + item.descriptor[0] + ', nothing more.';
          }
        }else{
          return 'Try as you might, your eyes will not focus on more than one item.';
        }
      }else{
        return "The inky blackness of your surroundings makes it impossible to see.";
      }
    },
    listen:function(theItem, room){
      if(typeof theItem !== 'string'){
        return theItem.sounds || "The " + theItem.descriptor[0] + " isn't emmitting any sounds.";
      }else{
        return 'There is no "' + theItem +'" for which to listen to.';
      }
    },
    taste:function(theItem, room){
      if(typeof theItem !== 'string'){
        return theItem.taste;
      }else{
        return 'There is no "' + theItem +'" for which to taste';
      }
    },
    smell:function(theItem, room){
      if(typeof theItem !== 'string'){
        return theItem.smell || "There is a slight smell but you can't tell if it's from the item your fingers or the inside of your nose.";
      }else{
        return 'There is no "' + theItem +'" for which to smell';
      }
    },
    touch:function(theItem, room){
      //Check to see if it's not just a string of random stuff
      if(typeof theItem !== 'string'){
        return theItem.touch || 'It feels like ' + app.fn.article(theItem.descriptor[0]) + theItem.descriptor[0];
      }else{
        return 'There is no "' + theItem +'" for which to touch';
      }
    },
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
    //search function is a take function
    take:function(theItems){
      var numTaking = theitems.length;
      for (var i = 0; i < numTaking; i++){
        if (theItems[i] === this.knownItems[i]){
          //do stuff

        }else{
          //The item is not a knownItem
        }
      }
    },
    search:function(theItem, room){
      //This function will add the items found to the players knownItems array for the currentRoom
      console.log(this.knownItems);
      if (theItem.container){
        if (theItem.containedItems.length>0){
          var foundItems = 'In the ' + theItem.descriptor[0] + ' You find:<br />';
          for (var i = 0; i < theItem.containedItems.length; i++) {
            foundItems += app.fn.article(theItem.descriptor[0]) + theItem.containedItems[i].descriptor[0] +'<br />';
          }
          var movingItems = theItem.containedItems.splice(0);
          this.knownItems.currentRoom.push(movingItems);
          console.log(this.knownItems);
          return foundItems;
        }else{
          return 'You grope around in the ' + theItem.descriptor[0] + ', but find nothing. Dissapoint.';
        }
      }else{
        return 'The ' + theItem.descriptor[0] + ' isn\'t a container.';
      }
    },

    drop:function(theItems, room){
      var drops = theItems.length;
      for (i = 0; i < drops; i++){
        var movingItems = this.inventory.splice(0);
        room.push(movingItems);
      }

      return this.dropping || 'You toss the ' + this.descriptor + ' to the side';
      //put item in parent of character item;
    },
    put:function(theItems, room){
      //
    }
  };
})(window, $, window.app || {});