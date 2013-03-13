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
  this.visualSecretThreshold = options.visualSecretThreshold || 1;
  this.getting = options.getting;
  this.sights = options.sights;
  this.visualSecret = options.visualSecret;
  this.sounds = options.sounds;
  this.taste = options.taste;
  this.smells = options.smells;
  this.feels = options.feels;
  this.dropping = options.dropping;
};

app.Item.prototype = {
  listContainedItems:function(){
    if (this.container){
      //get contained items
      var numContained = this.containedItems.length,
          list = [];
      if (numContained !== 0) {
        for (var i = 0; i < numContained; i++ ){
          list.push(this.containedItems[i].descriptor[0]);
        }
        return "<p>The item contains:</p>" + list.join('<br />');
      }else{
        return "The container is empty :(";
      }
    }else{
      return null;
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
  this.hiddenItems = options.hiddenItems || [];
  this.container = options.container || false;
  this.containedItems = options.containedItems || [];
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
  },
  listContainedItems:function(){
    if (this.container){
      //get contained items
      var numContained = this.containedItems.length,
          list = [];
      if (numContained !== 0) {
        for (var i = 0; i < numContained; i++ ){
          list.push(this.containedItems[i].descriptor[0]);
        }
        return "<p>In the room there is:</p>" + list.join('<br />');
      }else{
        return "The container is empty :(";
      }
    }else{
      return null;
    }
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
      descriptor : ["flint"]
    });
    items.stone = new app.Item({
      descriptor : ["stone", "flagstone", "rock"]
    });
    items.puddle = new app.Item({
      descriptor : ["puddle"],
      container : true,
      containedItems : [items.flint, items.stone],
      visualSecretThreshold : 6,
      sights : "It ripples lightly with every drop.",
      visualSecret : "As you look closer you can see that there is some depth to it!",
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
      descriptor : ["sword"],
      getting : "You're afraid the blade's power will overwhelm you.",
      sights : "It's the most badass thing you have ever laid your eyes on!",
      sounds : "Tilting your ear toward it, you can almost hear the whispers and cries of those that fell before it"
    });
    //Create Room Object passing descriptions and items in
    var currentRoom = new app.Room({
      descriptor : ['cell'],
      ambientLight : 3,
      hiddenItems : [items.sword],
      container : true,
      containedItems : [items.puddle, items.stone],
      sights : "It appears to be a holding cell. There is an iron door on one wall.",
      sounds : "drip… drip… drip… The dripping noise is slow and even. It sounds as though droplets are falling into a small puddle nearby, close enough to reach out and touch.",
      feels : "It's cool where you are(ambient_temp). You feel solid but uneven flagstone beneath your feet."
    });

    //Create Player
    var currentPlayer = new app.Player(
      {
        playerName : "You",
        inventory : [items.capris],
        knownItems : {
          currentRoom : []
        },
        perception : 2
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
    var getVerb = function(words){
      //
    };
    var getNouns = function(words, currentRoom){

    };
    //comprehend function
    var comprehend = function(words, currentRoom){
      /*
      // This function takes the strArray from the user input and processes it into a usable command for the
      // currentPlayer fuctions. It then calls the function and passes item and room information.
      // Also It needs a rework badly:
      three parts:
        the first two set values for the third to use and return things accordingly
        check to see if any of the words is a function of the user
         if it is set the word to the verb
        check to see if any of the words matches a name of the items available to the user
          if they are push them to a nouns array

        check values and return the function call
        
        
       */
      //// Part 1

      var verb = '',
          nouns = [];
          room = currentRoom || {},
          numWords = words.length;
      for (var i = 0; i < numWords; i++){
        var word = words[i];
        if (typeof currentPlayer[word] === "function"){
          verb = words[i];
          var verbIndex = words.lastIndexOf(words[i]);
          words.splice(verbIndex, 1);
          break;
        }
      }
      //// Part 2
      var availableItems = currentPlayer.inventory.concat(currentPlayer.knownItems.currentRoom, currentRoom.containedItems),
          numItems = availableItems.length;
      if (numWords > 1){
        //loop the words and check it against the available items
        for (var k = 0; k < numWords; k++) {
          for (var l = 0; l < numItems; l++) {
            //Check the descriptor array against the words
            var numNames = availableItems[l].descriptor.length;
            for (var m = 0; m < numNames; m++) {
              //Check to see if any of the words match an available item;
              if (availableItems[l].descriptor[m] === words[k]) {
                nouns.push(availableItems[l]);
              }
            }
          }
        }
      }else{
        nouns.push(room);
      }
      //// Part 3
      if (verb){
        var numNouns = nouns.length;
        if (numNouns > 0){
          return currentPlayer[verb](nouns, room);
        }else{
          return "There is no " + words.join(" ") + " for which to " + verb;
        }
      }else{
        return "Although it may be your wish to " + words.join(" ") + ". What would be the point?";
      }


      //loop though words finding words that are functions of the player      
      /*var command = [],
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
      //Available items are inventory, discovered items and items laying around in the current room
      var availableItems = currentPlayer.inventory.concat(currentPlayer.knownItems.currentRoom, currentRoom.containedItems);
      // Loop through all the items and if neccessary all the names of the item and check it against all the words entered by the user
      var numItems = availableItems.length;
      if (numWords > 1){
        //loop the words and check it against the available items
        for (var k = 0; k < numWords; k++) {
          for (var l = 0; l < numItems; l++) {
            //Check the descriptor array against the words
            var numNames = availableItems[l].descriptor.length;
            for (var m = 0; m < numNames; m++) {
              //Check to see if any of the words match an available item;
              if (availableItems[l].descriptor[m] === words[k]) {
                command.push(availableItems[l]);
              }
            }
          }
        }
      }else{
        //push the currentRoom as the second item in the array this sets up the the array to perform the funciton on the room by default
        command.push(room);
      }
      if (command.length < 2){
        return "There is no " + words.slice(1).join(" ") + " for which to " + command[0];
      }
      //Do this before we push anything else to the command array

      //text processed: now we can assume that there is a verb and at least one valid noun YAY!!!
      //below are rules for constructing the command
      //If there isn't a noun at all we assume the character wants to examine surroundings
      var verb = command[0],//the action
          nouns = [],
          commandLength = command.length;
      if (commandLength > 1) {
        //we could have multiple items. We can have the functions decide what to do with multiple items
        nouns = [];
        for (var i = 1; i < commandLength; i++){ //skip to the second item or the first noun
          nouns.push(command[i]);
        }
        //the item needs to be unwrapped for the look function and probably others
        if (nouns.length === 1){
          return currentPlayer[verb](nouns[0], room);
        }else{
          return currentPlayer[verb](nouns, room);
        }
      }else if(commandLength === 1){
        //We must have just a command
        return currentPlayer[verb](room, room);
      }*/
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
          textNode.append("Sometimes the best course of action is to take no action, but that's not the case here.");
        }
      }
    });
});
})(window, $, window.app || {});