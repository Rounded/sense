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
      if (room.ambientLight <= 0) 
        return "The inky blackness of your surroundings makes it impossible to see.";
      
      // does theItem contain multiple items?
      if (theItem.length >= 2)
        return 'Try as you might, your eyes will not focus on more than one item.';
         
      // unwrap the item array
      var item = theItem[0],
          theSights = theItem[0].sightDescription || 'It looks like ' + app.fn.article(item.descriptor[0]) + item.descriptor[0] + ', nothing more.';
      
      // Visual secret check for items
      // If you can see clearly you will get more hints
      if ((item.visualSecret) && (room.ambientLight >= item.visualSecretThreshold)) {
        var secretSight = item.visualSecret;
        theSights = theSights.concat(" " + secretSight);
      }
      if (item === room){
        theSights += item.listContainedItems();
      }
      return theSights 
      
    },
    listen:function(theItem, room){
      if (theItem.length < 2){
        return theItem[0].sounds || "The " + theItem[0].descriptor[0] + " isn't emmitting any sounds.";
      }else{
        return 'Try to focus on one item at a time.';
      }
    },
    taste:function(theItem, room){
      if (theItem.length < 2){
        return theItem[0].tastes || "No taste really but you suddenly wonder where the " + theItem[0].descriptor[0] + " has been.";
      }else{
        return 'You must like tasting things. Try just one thing at a time.';
      }
    },
    smell:function(theItem, room){
      if (theItem.length < 2){
        return theItem[0].smells || "There is a slight smell but you can't tell if it's from the item your fingers or the inside of your nose.";
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
    //     //create new item and put both items in its comprised of array
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
    checkInventory:function(player){
          var numItems = player.inventory.length;
          if (numItems>0){
            var foundItems = 'You have:<br />';
            for (var i = 0; i < numItems; i++) {
              foundItems +=  player.inventory[i].descriptor[0] +'<br />';
            }
            return foundItems;
          }else{
            return 'You have nothing. Dissapoint.';
          }
        
    },
    search:function(theItem, room){
      if (theItem.length >= 2){
        return 'Try searching one item at a time';
      }
      //TODO: Look into using the items list contained items function
      var item = theItem[0],
          numItems = item.containedItems.length;
      if (!item.isContainer){
        return 'The ' + item.descriptor[0] + ' isn\'t a container.'
      }
      
      if (numItems>0){
        var foundItems = 'In the ' + item.descriptor[0] + ' You find:<br />';
        for (var i = 0; i < numItems; i++) {
          foundItems +=  item.containedItems[i].descriptor[0] +'<br />';
        }
        return foundItems;
      }else{
        return 'You grope around in the ' + item.descriptor[0] + ', but find nothing. Dissapoint.';
      }
    },
    take:function(theItem, room){
      if (theItem.length >= 2){
        return 'Try taking one item at a time';
      }
      var item = theItem[0];
      if (item.isStationary){
        return 'You cannot take a stationary object like the ' + item.descriptor[0];
      }
      if (this.hasItem(item)){
        return 'You already have the ' + item.descriptor[0];
      }
      var taken = '',
          index = '';
          
      for (i=0;i<room.containedItems.length; i++){
        if (item === room.containedItems[i]){
          index = room.containedItems.indexOf(item)
          room.containedItems.splice(index, 1);
          this.inventory.push(item);
          taken += item.descriptor[0];
          return item.getting || 'You take the: <br>' + taken;
        }
      }
      numItems = room.containedItems.length;
      for (j=0; j<numItems; j++){
        index = room.containedItems[j].containedItems.indexOf(item)
        room.containedItems[j].containedItems.splice(index, 1);
        this.inventory.push(item);
        taken += item.descriptor[0];
        return item.getting || 'You take the: <br>' + taken;
      }
    },
    drop:function(theItem, room){
      if (theItem.length >= 2){
        return 'Try dropping one item at a time';
      }
      var dropped = '',      
          item = theItem[0]
      if (!this.hasItem(item)){
        return 'You can\'t drop something you don\'t have';
      }
      var index = this.inventory.indexOf(item);
      this.inventory.splice(index, 1);
      room.containedItems.push(item);
      console.log(this.inventory);
      console.log(room.containedItems);
      return 'You drop the: <br>' + item.descriptor[0];

    },
    put:function(theItems, room){
      if (theItems < 2){
        return "You need to put something <em>in</em> something else";
      }
      if (theItems > 2){
        return "Try putting one item in at a time."
      }
      var item = theItems[0];
          container = theItems[1];
      if (item.isStationary){
        return 'You cannot put a stationary object like the ' + item.descriptor[0] + " in the "+ container.descriptor[0];
      }
      if (!container.isContainer){
        return "The second item is not a container."
      }
      if (this.hasItem(item)){
        var index = this.inventory.indexOf(item);
        this.inventory.splice(index, 1);
        container.containedItems.push(item);
        return "You put the " +item.descriptor[0]+" in the "+container.descriptor[0]+"."
      }else if(room.hasItem(item)){
        var index = room.containedItems.indexOf(item);
        room.containedItems.splice(index, 1);
        container.containedItems.push(item);
        return "You put the " +item.descriptor[0]+" in the "+container.descriptor[0]+"."
      }else{
        return "The item is not within your grasp!"
      }
        
    }
  };
})(window, $, window.app || {});