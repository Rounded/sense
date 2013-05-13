(function(window,$,app){
//Player class
  app.Player = function Player(playerData){
    var data = playerData || {};
    this.inventory = data.inventory || [];
    this.discoveredItems = data.discoveredItems || [];
    this.playerName = data.playerName || "Anonymous";
  };

  app.Player.prototype = {
    hasItem:function(whichItem){
      //loop through discoveredItems
      for (var i = 0; i < this.inventory.length; i++) {
        if (whichItem === this.inventory[i]) {
          return true;
        }
      }
    },
    look:function(theItem, room){
      // general vision check
      if (room.ambientLight > 0){
        // does theItem contain multiple items?
        if (theItem.length < 2){
          // unwrap the item array
          var item = theItem[0],
              theSights = theItem[0].sights;
          // Visual secret check for items
          // If you can see clearly you will get more hints
          if ((item.visualSecret) && (room.ambientLight >= item.visualSecretThreshold)) {
            var secretSight = item.visualSecret;
            theSights = theSights.concat(" " + secretSight);
          }
          return theSights || 'It looks like ' + app.fn.article(item.descriptor[0]) + item.descriptor[0] + ', nothing more.';
        }else{
          return 'Try as you might, your eyes will not focus on more than one item.';
        }
      }else{
        return "The inky blackness of your surroundings makes it impossible to see.";
      }
    },
    listen:function(theItem, room){
      if (theItem.length < 2){
        return theItem[0].sounds || "The " + theItem[0].descriptor[0] + " isn't emmitting any sounds.";
      }else{
        return 'Try to focus on one item at a time.';
      }
    },
    taste:function(theItem, room){
      console.log(theItem[0]);
      if (theItem.length < 2){
        return theItem[0].taste || "No taste really but you suddenly wonder where the " + theItem[0].descriptor[0] + " has been.";
      }else{
        return 'You must like tasting things. Try just one thing at a time.';
      }
    },
    smell:function(theItem, room){
      if (theItem.length < 2){
        return theItem[0].smell || "There is a slight smell but you can't tell if it's from the item your fingers or the inside of your nose.";
      }else{
        return 'It helps if you smell one thing at a time';
      }
    },
    touch:function(theItem, room){
      if (theItem.length < 2){
        return theItem[0].touch || 'It feels like ' + app.fn.article(theItem[0].descriptor[0]) + theItem[0].descriptor[0];
      }else{
        return 'Try touching one item at a time';
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
    // take:function(theItems){
    //   var numTaking = theitems.length;
    //   for (var i = 0; i < numTaking; i++){
    //     if (theItems[i] === this.knownItems[i]){
    //       //do stuff

    //     }else{
    //       //The item is not a knownItem
    //     }
    //   }
    // },
    inventory:function(player){
          var numItems = player.inventory.length;
          if (numItems>0){
            var foundItems = 'In the ' + player.playerName + ' You find:<br />';
            for (var i = 0; i < numItems; i++) {
              foundItems +=  player.inventory[i].descriptor[0] +'<br />';
            }
            return foundItems;
          }else{
            return 'You grope around in the ' + player.playerName + ', but find nothing. Dissapoint.';
          }
        
    },
    search:function(theItem, room){
      if (theItem.length < 2){
        var item = theItem[0];
        if (item.isContainer){
          var numItems = item.containedItems.length;
          if (numItems>0){
            var foundItems = 'In the ' + item.descriptor[0] + ' You find:<br />';
            for (var i = 0; i < numItems; i++) {
              foundItems +=  item.containedItems[i].descriptor[0] +'<br />';
            }
            return foundItems;
          }else{
            return 'You grope around in the ' + item.descriptor[0] + ', but find nothing. Dissapoint.';
          }
        }else{
          return 'The ' + item.descriptor[0] + ' isn\'t a container.';
        }
      }else{
        return 'Try searching one item at a time';
      }
    },
    take:function(theItem, room){
      if (theItem.length < 2){
        var item = theItem[0];
        if (!item.isStationary){
          if (!this.hasItem(item)){
            var taken = '',
                index = room.containedItems.indexOf(item);
            room.containedItems.splice(index, 1);
            this.inventory.push(item);
            taken += item.descriptor[0];
            console.log(this.inventory);
            console.log(room.containedItems);
            return item.getting || 'You take the: <br>' + taken;
            
          }else{
            return 'You already have the ' + item.descriptor[0];
          }
        }else{
          return 'You cannot take the ' + item.descriptor[0];
        }
      }else{
        return 'Try taking one item at a time';
      }
    },
    drop:function(theItem, room){
      var numItems = theItem.length;
      var dropped = '';
      for(var i = 0; i< numItems; i++){
        var item = theItem[i],
            index = this.inventory.indexOf(item);
        this.inventory.splice(index, 1);
        room.containedItems.push(item);
        dropped += item.descriptor[0] + '<br>';
        console.log(this.inventory);
        console.log(room.containedItems);
      }
      return 'You drop the: <br>' + dropped;
      //Return user feedback
    },
    put:function(theItems, room){
      //
    }
  };
})(window, $, window.app || {});