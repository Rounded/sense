(function(window,$){
	window.app = {
		//structure goes here
		//ie: rooms:[], ...
	};
})(window, $);
(function(window,$,app){
//Utiltity Functions
//Get the right indefinite article
app.fn = {
  article : function() {
		var ch = arguments[0].charAt(0);
		if(ch=='A'||ch=='a'||ch=='E'||ch=='e'||ch=='I'||ch=='i'||ch=='O'||ch=='o'||ch=='U'||ch=='u'){
      return 'An ';
    }else{
      return 'A ';
    }
	},
	getParamNames: function(theFunction) {
    var funStr = theFunction.toString();
    return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g) || '';
  }
};
})(window, $, window.app || {});
(function(window,$,app){

//Item class
app.Item = function Item(opts){
  var options = opts || {};
  this.container = options.container || false;
  this.comprisedOf = options.comprisedOf || [];
  this.combineWith = options.combineWith || [];
  this.discoveredItems = options.discoveredItems || [];
  //this.ambientLight = options.ambientLight || 0;
  // the item accesses the ambient light set in the room var and passes it in to the look function
  this.visual_secret_threshold = options.visual_secret_threshold || 1;
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
  }
};

})(window, $, window.app || {});
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
        //console.log('looking');
        //console.log(room.ambientLight + ' ' + this.perception + ' ' + theItem.visual_secret_threshold);
        if (room.ambientLight * this.perception > theItem.visual_secret_threshold) {
          if(typeof theItem.descriptor !== "undefined") {
            //If the item has a descriptor return the sights or a generic but nice sentence
            return theItem.sights || 'It looks like ' + app.fn.article(theItem.descriptor) + theItem.descriptor + ', nothing more';
          }else{
            //If the item doesn't have a descriptor... I'm not sure if this will ever happen
            return theItem.sights || 'You are not quite sure what it is';
          }
        }else{
          return 'Unable to see the details. It\'s too dark in the ' + room.descriptor;
        }
      }else{
        return 'Try as you might, your eyes will not focus on more than one item.';
      }
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
(function(window,$,app){
//Weapon class (sub)
  app.Weapon = function Weapon(opts){
    this.weapon = "yes.";
  };

  app.Weapon.prototype = new app.Item();
  app.Weapon.prototype.swing = function(){
    //console.log("swing");
  };

})(window, $, window.app || {});
(function(window,$,app){
//Room class
app.Room = function Room(opts){
  var options = opts || {}; // Null Object Protection
  this.ambientLight = options.ambientLight || 0;
  this.discoveredItems = options.discoveredItems || [];
  this.hiddenItems = options.hiddenItems || [];
  this.descriptor = options.descriptor;
  this.sights = options.sights;
};
app.Room.prototype = new app.Item();
app.Room.prototype = {
  //My First Override!
  look:function(perception){
    var playerPerception = perception || 0;
      //console.log('room'+this.ambientLight);
      //console.log('room'+this.playerPerception);
      //console.log('room'+this.visual_secret_threshold);
    if (this.ambientLight * playerPerception > this.visual_secret_threshold) {
      return this.sights || "It\'s Just four walls, a floor, and ceiling";
    } else {
      return 'It\'s black as night';
    }
  },
  //Move items from hidden to discovered
  revealItem:function(hiddenItem){
    this.discoveredItems.push(hiddenItem);
    return this.discoveredItems;
  },

  hasItem:function(whichItem){
    //loop through discoveredItems
    for (var i = 0; i < this.discoveredItems.length; i++) {
      if (whichItem === this.discoveredItems[i].descriptor) {
        return true;
      }
    }
  }
  //Move items from discoverd to hidden
};

})(window, $, window.app || {});
(function(window,$,app){
    //Create Items
    //TODO: Fix this -> The order the items are created are important
    //items first then containers followed by room and player
    var items = {};
    items.flint = new app.Item({
      descriptor : "flint",
      visual_secret_threshold : 10
    });
    items.stone = new app.Item({
      descriptor : 'stone'
    });
    items.puddle = new app.Item({
      descriptor : 'puddle',
      container : true,
      sights : 'It looks deeper than expected. Perhaps it is hidding something in its depths.',
      containedItems : [items.flint, items.stone],
      sounds : 'The only sounds are those of the liquid dripping into it.'
    });
    items.capris = new app.Item({
      descriptor : "capris",
      sights : "You Look like an idiot wearing them."
    });
    items.sword = new app.Item({
      descriptor : 'sword',
      sights : 'It\'s the most badass thing you have ever laid your eyes on!',
      sounds : 'Tilting your ear toward it, you can almost hear the whispers and cries of those that fell before it',
      getting : 'You\'re afraid the blade\'s power will overwhelm you.'
    });
    //Create Room Object passing descriptions and items in
    var currentRoom = new app.Room({
      descriptor : 'cell',
      visual_secret_threshold : 10,
      ambientLight : 1,
      hiddenItems : [items.flint, items.sword],
      sights : "It appears to be a holding cell of sorts."
    });

    //Create Player
    var currentPlayer = new app.Player(
      {
        playerName : "Bob",
        perception : 5,
        inventory : [],
        knownItems : {
          currentRoom : [currentRoom, items.puddle, items.sword, items.capris]
        }
      }
    );
  //Testing function
  $(function(){
    //declare some variable for the ui
    var textNode = $("#readout-content"),
        inputNode = $("#text-input"),
        buttonNode = $("#hidden-button");


    //read function
    var read = function(value){
      var str = value,
          strArray = str.split(" ");
      if (strArray[0] === "save") {
        //save state
        textNode.append('<p>Your progress has been saved in the imperial scrolls of honor... not really, but soon. Consider it hardcore mode!</p>');
      }else if (strArray[0] === "help"){
        //textNode.append(helpText);
        textNode.append('<p>All you have are your senses (<span class="verb_hint">look, listen, feel, smell, taste)</span><br />');
        textNode.append('Example Commands:<br />');
        textNode.append('<span class="verb_hint">look</span> <span class="noun_hint">puddle</span> <br />');
        textNode.append('<span class="verb_hint">listen</span><br />');
        textNode.append('<em>Enter commands below.</em></p>');
      }else if (strArray.length >= 1){
        //have the player process the complete command
        narration = comprehend(strArray, currentRoom);
        textNode.append(narration + '<br />');
        //testFunction = currentPlayer[strArray]();
        //textNode.append(testFunction + '<br />');
      }
    };
    //comprehend function
    var comprehend = function(words, currentRoom){
      console.log(currentPlayer);
      //identify verbs and items
      //process words
      //loop though words finding words looking for functions of the player      
      var command = [],
          numWords = words.length,
          room = currentRoom || {};
      for (i = 0; i < numWords; i++){
        var word = words[i];
        if(typeof currentPlayer[word] === "function"){
          command.push(currentPlayer[word]);//add function name to array first
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
      var availableItems = currentPlayer.inventory.concat(currentPlayer.knownItems.currentRoom),
        numAvailable = availableItems.length;
      //console.log(currentPlayer);
      for (var i = 0; i < numAvailable; i++) {
        for (var j = 0; j < numWords; j++) {
          if (availableItems[i].descriptor === words[j]) {
            command.push(availableItems[i]);
          }
        }
      }
      //console.log(words);
      //console.log(command);

      //text processed: now we can assume that there is a verb and it is in the first index of the command array
      var verb = command[0],//the action
          commandLength = command.length;
      if (commandLength > 2) {
        //we must have multiple items. We can have the functions decide what to do with multiple items
        nouns = [];
        for (var k = 1; k < commandLength; k++){ //skip to the second item or the first noun
          nouns.push(command[k]);
        }
        //console.log(nouns);
        return window[verb](nouns, room);
      }else if(commandLength === 2){
        //We must have one item
        noun = command[1];
        return currentPlayer[verb](noun, room);
      }else if(commandLength === 1){
        //console.log();
        //We must have just a command: meaning everthing else entered by the user is not an available item
        //Identify current room
        //Let's check to see if words has something in it
        if (numWords > 1){
          return 'There is no ' + noun;
        }else{
          console.log(room);
          return currentPlayer[verb](room, room);
        }
      }
    };

    //Place the cursor in the input
    inputNode.focus();
    //Run a function when user hits enter
    inputNode.on("keyup",function(event){
      if(event.keyCode === 13){
        var value = $(this).val();
        if (value !== ''){
          //run the read funtion
          read(value);
          this.value = '';
        }else{
          textNode.append('<p>Sometimes the best course of action is to take no action.</p>');
        }
      }
    });
});
})(window, $, window.app || {});