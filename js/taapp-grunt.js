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
      return 'an ';
    }else{
      return 'a ';
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
  this.descriptor = options.descriptor;
  this.container = options.container || false;
  this.containedItems = options.containedItems;
  this.comprisedOf = options.comprisedOf || [];
  this.combineWith = options.combineWith || [];
  this.visual_secret_threshold = options.visual_secret_threshold || 1;
  this.getting = options.getting;
  this.sights = options.sights;
  this.sounds = options.sounds;
  this.taste = options.taste;
  this.smells = options.smells;
  this.feels = options.feels;
  this.dropping = options.dropping;
};

app.Item.prototype = {
  // getDescriptor:function(){
  //   if(typeof this.descriptor !== "undefined")
  //     return app.fn.article(this.descriptor) + this.descriptor;
  //   else
  //     return 'It has no name';
  // }
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
  this.visual_secret_threshold = options.visual_secret_threshold || 1;
  this.hiddenItems = options.hiddenItems || [];
  this.descriptor = options.descriptor;
  this.sights = options.sights;
  this.sounds = options.sounds;
  this.taste = options.taste;
  this.smells = options.smells;
  this.feels = options.feels;
};
app.Room.prototype = new app.Item();
app.Room.prototype = {
  //Move items from hidden to discovered
  revealItem:function(hiddenItem){
    this.discoveredItems.push(hiddenItem);
    return this.discoveredItems;
  }

  // hasItem:function(whichItem){
  //   //loop through discoveredItems
  //   for (var i = 0; i < this.discoveredItems.length; i++) {
  //     if (whichItem === this.discoveredItems[i].descriptor) {
  //       return true;
  //     }
  //   }
  // }
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
      descriptor : ["stone", "flagstone", "rock"]
    });
    items.puddle = new app.Item({
      descriptor : "puddle",
      container : true,
      containedItems : [items.flint, items.stone],
      sights : "It looks deeper than expected. Perhaps it is hidding something in its depths.",
      sounds : "The only sounds are those of the liquid dripping into it.",
      taste : "You immediately regret not smelling it first as it appears to be keroseen!"
    });
    items.capris = new app.Item({
      descriptor : ["capris", "pants"],
      sights : "You Look like an idiot wearing them.",
      sounds : "They make a quite swishing sound when you walk (stealth -1).",
      tastes : "You probably don't want to do that.",
      smells : "You probably don't want to do that.",
      feels : "They feel light and thin (agility +2)."
    });
    items.sword = new app.Item({
      descriptor : "sword",
      getting : "You're afraid the blade's power will overwhelm you.",
      sights : "It's the most badass thing you have ever laid your eyes on!",
      sounds : "Tilting your ear toward it, you can almost hear the whispers and cries of those that fell before it"
    });
    //Create Room Object passing descriptions and items in
    var currentRoom = new app.Room({
      descriptor : 'cell',
      visual_secret_threshold : 10,
      ambientLight : 1,
      hiddenItems : [items.flint, items.sword],
      sights : "It appears to be a holding cell. There is an iron door on one wall.",
      sounds : "drip… drip… drip… The dripping noise is slow and even. It sounds as though droplets are falling into a small puddle nearby, close enough to reach out and touch.",
      feels : "It's cool where you are(ambient_temp). You feel solid but uneven flagstone beneath your feet."
    });

    //Create Player
    var currentPlayer = new app.Player(
      {
        playerName : "Bob",
        perception : 6,
        inventory : [items.capris],
        knownItems : {
          currentRoom : [currentRoom, items.puddle, items.stone]
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
      var str = value.toLowerCase(),
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
        textNode.append('<p>' + narration + '</p>');
        //testFunction = currentPlayer[strArray]();
        //textNode.append(testFunction + '<br />');
      }
    };
    //comprehend function
    var comprehend = function(words, currentRoom){
      /*
      // This function takes the strArray from the user input and processes it into a usable command for the
      // currentPlayer fuctions. It then calls the function and passes item and room information */

      //loop though words finding words that are functions of the player      
      var command = [],
          numWords = words.length,
          room = currentRoom || {};
      for (i = 0; i < numWords; i++){
        var word = words[i];
        if(typeof currentPlayer[word] === "function"){
          command.push(word);//add function name to array first
          break;//break out of loop no need to check for more than one verb

        }
        else if(i === numWords - 1){
          //Default to look if no action is found?
          //Defaulting to movement makes more sense. But we aren't there yet.
          // word = 'look';
          // command.push(this[word]);
          // break;
                  //OR
          return 'You can\'t "' + words.join(" ") +'"';
        }
      }
      var availableItems = currentPlayer.inventory.concat(currentPlayer.knownItems.currentRoom),
          numAvailable = availableItems.length;
      // loop through available items getting all variations on the descriptors
      // and push it to an array of availableItemsNames

//I have an item i need to check if the the word is found in the items descriptor array and then add the item to the command array
      // var availableItemsNames = [];
      // for (var i = 0; i < numAvailable; i++){
      //   if (typeof availableItems[i].descriptor === 'object'){
      //     var numSynonyms = availableItems[i].descriptor.length;
      //     console.log(i);
      //     for (j = 0; j < numSynonyms; j++){
      //       var itemName = availableItems[i].descriptor[j];
      //       availableItemsNames.push();
      //     }
      //   }else{
      //     availableItemsNames.push(availableItems[i].descriptor);
      //   }
      // }
      // Loop through all the names of the available items and check it against all the words entered by the user
      var numItems = availableItems.length;
      console.log(availableItems);
      for (var k = 0; k < numItems; k++) {
        for (var l = 0; l < numWords; l++) {
          if (typeof availableItems[k].descriptor === 'object') {
            //Check the descriptor array against the words
            var numNames = availableItems[k].descriptor.length;
            for (var m = 0; m < numNames; m++) {
              if (availableItems[k].descriptor[m] === words[l]) {
                command.push(availableItems[k]);
              }
            }
          }else{
            //check the descriptor against the words
            if (availableItems[k].descriptor === words[l]) {
              command.push(availableItems[k]);
            }
          }
        }
      }
      console.log(words);
      console.log(command);

      //text processed: now we can assume that there is a verb and it is in the first index of the command array
      var verb = command[0],//the action
          commandLength = command.length;
      if (commandLength > 2) {
        //we must have multiple items. We can have the functions decide what to do with multiple items
        nouns = [];
        for (var i = 1; i < commandLength; i++){ //skip to the second item or the first noun
          nouns.push(command[i]);
        }
        //console.log(nouns);
        return currentPlayer[verb](nouns, room);
      }else if(commandLength === 2){
        //We must have one item
        noun = command[1];
        return currentPlayer[verb](noun, room);
      }else if(commandLength === 1){
        //We must have just a command: meaning everthing else entered by the user is not an available item
        if (numWords > 1){
          //If the user tried a random item use it for feedback
          //take all the rest of the words besides the one that is a function
          var nonsense = [];
          for (var j = 0; j < numWords; j++){
            if (words[j] !== command[0]){
              nonsense.push(words[j]);
            }
          }
          return 'There is no "' + nonsense.join(" ") +'" for which to ' + verb;
        }else{
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
          textNode.append('Sometimes the best course of action is to take no action, but that is not the case here.');
        }
      }
    });
});
})(window, $, window.app || {});