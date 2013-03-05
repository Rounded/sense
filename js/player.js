(function(window,$,app){
//Player class
  app.Player = function Player(playerData){
    var data = playerData || {};
    this.inventory = data.inventory || [];
    this.knownItems = data.knownItems || {};
    this.playerName = data.playerName || "Anonymous";
    this.perception = data.perception || 0;
    this.room = {};
  };

  app.Player.prototype = {
    contemplate:function(words, currentRoom){
      
      //identify verbs and items
      //process words
      //loop though words finding words looking for functions of the player      
      var command = [],
          numWords = words.length;

      for (i = 0; i < numWords; i++){
        var word = words[i];
        if(typeof this[word] === "function"){
          command.push(this[word]);//add function name to array first
          break;//break out of loop no need to check for more than one verb
        }
        else if(i === numWords - 1){
          // word = 'look';
          // command.push(this[word]);
          // break;
                  //OR
          return 'Out of boredom or exasperation you proclaim, "' + words.join(" ") +'"';
        }
      }
      //loop through words finding matches in the available items
      var availableItems = this.inventory.concat(this.knownItems.currentRoom),
        numAvailable = availableItems.length;
      //console.log(availableItems[0].descriptor+words[0]);
      for (var i = 0; i < numAvailable; i++) {
        for (var j = 0; j < numWords; j++) {
          if (availableItems[i].descriptor === words[j]) {
            command.push(availableItems[i]);
          }
        }
      }
      console.log(words);
      console.log(command);

      //text processed: now we can assume that there is a verb and it is in the first spot
      var verb = command[0],//the action
          commandLength = command.length;
      if (commandLength > 2) {
        //we must have multiple items. We can have the functions decide what to do with multiple items
        nouns = [];
        for (var k = 1; k < commandLength; k++){ //skip to the second item or the first noun
          nouns.push(command[k]);
        }
        console.log(nouns);
        return verb(nouns);
      }else if(commandLength === 2){
        //We must have one item
        noun = command[1];
        return verb(noun);
      }else if(commandLength === 1){
        //console.log();
        //We must have just a command: meaning everthing else entered by the user is not an available item
        //Identify current room
        //Let's check to see if words has something in it
        if (numWords > 1){
          return 'You don\'t see that here';
        }else{
          this.room = currentRoom;
          return verb(currentRoom);
        }
      }
    },
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
    look:function(theItem){
      console.log(theItem.length);
      if (!theItem.length){
      console.log(theItem);
      //if (this.currentRoom.ambientLight * this.perception > theItem.visual_secret_threshold) {
        if(typeof theItem.descriptor !== "undefined") {
          //If the item has a descriptor return the sights or a generic but nice sentence
          return theItem.sights || 'It looks like ' + app.fn.article(theItem.descriptor) + theItem.descriptor + ', nothing more';
        }else{
          //If the item doesn't have a descriptor... I'm not sure if this will ever happen
          return theItem.sights || 'You are not quite sure what it is';
        }
      }else{
        return 'Try as you might, your eyes will not focus on more than one item.';
      }
      //}else{
        //return 'Unable to see the details. It\'s too dark in the ' + currentRoom.descriptor;
      //}
    }
      // var roomAmbientLight = ambientLight || 0;
      // console.log(theItem);
      // if (typeof (theItem === "")){
      //   for (var i = 0; i < this.knownItems.length; i++) {
      //     if (theItem === this.knownItems[i]){
      //       console.log(roomAmbientLight);
      //       console.log(this.perception);
      //       console.log(theItem.visual_secret_threshold);
      //       console.log(theItem);
      //       if (roomAmbientLight * this.perception > theItem.visual_secret_threshold) {
      //         if(typeof theItem.descriptor !== "undefined") {
      //           //If the item has a descriptor
      //           return theItem.sights || 'It looks like ' + app.fn.article(theItem.descriptor) + theItem.descriptor + ', nothing more';
      //           }else{
      //             return theItem.sights || 'You are not quite sure what it is';
      //           }
      //       }else{
      //           return ' Unable to see the details';
      //       }
      //     }else{
      //       return 'There is no ' + theItem + ' for which to look.<br />';
      //     }
      //   }
      // }else{
      //   return 'What are you trying to look at?';
      // }
        // console.log(currentRoom);
        // console.log('item ambientLight '+ ambientLight);
        // console.log('item '+ theItem);
        // console.log('item vst '+theItem.visual_secret_threshold);

    
    // touch:function(){
    //   return this.feels || 'It feels like ' + app.fn.article(this.descriptor) + this.descriptor;
    // },
    // listen:function(){
    //   return this.sounds || 'The ' + this.descriptor + 'isn\'t emmitting any sounds.';
    // },
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