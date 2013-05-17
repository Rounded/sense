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
  },
  get_all_room_items: function(currentRoom){
    var roomItems = [];
    var numRoomItems = currentRoom.containedItems.length;
    for (var i = 0; i < numRoomItems; i++){
      roomItems.push(currentRoom.containedItems[i]);
      var numRoomItemsItems = currentRoom.containedItems[i].containedItems.length;
      for (var j = 0; j < numRoomItemsItems; j++){
        roomItems.push(currentRoom.containedItems[i].containedItems[j]);
      }
    }
    return roomItems;
  }
};
})(window, $, window.app || {});
(function(window,$,app){

//Item class
app.Item = function Item(opts){
  var options = opts || {};
  this.isStationary = options.isStationary || false;
  this.descriptor = options.descriptor;
  this.isContainer = options.isContainer || false;
  this.containedItems = options.containedItems || [];
  this.comprisedOf = options.comprisedOf || [];
  this.combineWith = options.combineWith || [];
  this.getting = options.getting;
  this.sightDescription = options.sightDescription;
  this.visualSecret = options.visualSecret;
  this.visualSecretThreshold = options.visualSecretThreshold || 1;
  this.sounds = options.sounds;
  this.tastes = options.tastes;
  this.smells = options.smells;
  this.touch = options.touch;
  this.dropping = options.dropping;
};

app.Item.prototype = {
  listContainedItems:function(){
    if (this.isContainer){
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
      if (theItem.length >= 2){
        return 'Try searching one item at a time';
      }

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
        return 'You cannot take the ' + item.descriptor[0];
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
  this.isContainer = options.isContainer || true;
  this.containedItems = options.containedItems || [];
  this.descriptor = options.descriptor;
  this.sightDescription = options.sightDescription;
  this.visualSecret = options.visualSecret;
  this.visualSecretThreshold = options.visualSecretThreshold || 1;
  this.sounds = options.sounds;
  this.taste = options.taste;
  this.smells = options.smells;
  this.touch = options.touch;
};
app.Room.prototype = new app.Item();
// app.Room.prototype = {
//   // listContainedItems:function(){
//   //   //get contained items
//   //   var numContained = this.containedItems.length,
//   //       list = [];
//   //   if (numContained !== 0) {
//   //     for (var i = 0; i < numContained; i++ ){
//   //       list.push(this.containedItems[i].descriptor[0]);
//   //     }
//   //     return "<p>In the room there is:<br />" + list.join('<br />') + '</p>';
//   //   }else{
//   //     return "There is nothing  :(";
//   //   }
//   // }
//   //   updateSights:function(){
//   //     this.sights = this.sightDescription + this.listContainedItems();
//   //   }
//   // hasItem:function(whichItem){
//   //   //loop through discoveredItems
//   //   for (var i = 0; i < this.discoveredItems.length; i++) {
//   //     if (whichItem === this.discoveredItems[i].descriptor) {
//   //       return true;
//   //     }
//   //   }
//   // }
//   //Move items from discoverd to hidden
// };

})(window, $, window.app || {});
(function(window,$,app){
    //Create Items
    //TODO: Fix this maybe -> The order the items are created are important
    //items first then containers followed by room and player
    var items = {};
    items.flint = new app.Item({
      descriptor : ["flint"]
    });
    items.stone = new app.Item({
      descriptor : ["stone", "flagstone", "rock"]
    });
    items.puddle = new app.Item({
      isStationary : true,
      descriptor : ["puddle"],
      isContainer : true,
      containedItems : [items.flint, items.stone],
      visualSecretThreshold : 6,
      sightDescription : "It ripples lightly with every drop.",
      visualSecret : "As you look closer you can see that there is some depth to it!",
      sounds : "The only sounds are those of the liquid dripping into it.",
      tastes : "It tastes like keroseen!",
      smells : "The puddle smells like something you would remove paint with."
    });
    items.capris = new app.Item({
      descriptor : ["capris", "pants"],
      sightDescription : "Hemmed right above the calve, they'll make anybody wearing them look like an idiot.",
      sounds : "They make a quite swishing sound when you walk (stealth -1).",
      tastes : "You probably don't want to do that.",
      smells : "You probably don't want to do that.",
      touch : "They feel light and agile (agility +2)."
    });
    items.sword = new app.Item({
      descriptor : ["sword"],
      getting : "You're afraid the blade's power will overwhelm you.",
      sightDescription : "It's the most badass thing you have ever laid your eyes on!",
      sounds : "Tilting your ear toward it, you can almost hear the whispers and cries of those that fell before it"
    });
    //Create Room Object passing descriptions and items in
    var currentRoom = new app.Room({
      descriptor : ["room","cell","area","here"],
      ambientLight : 1,
      containedItems : [items.puddle, items.sword],
      visualSecretThreshold : 1,
      visualSecret : "There is some writing on the wall. Scratched into the stone, it reads. RDA was here.",
      sightDescription : "You are in a small 10'x10' room with roughly hewn stone walls joined together flawlessly without mortar. The floor is of the same material but larger and smoother tiles. There are no obvious exits except for a large iron door.",
      sounds : "drip… drip… drip… The dripping noise is slow and even. It sounds as though droplets are falling into a small puddle nearby, close enough to reach out and touch.",
      touch : "It's cool where you are. You feel solid and cold stone beneath your feet.",
      smells : "You sniff the air and are assaulted with the smell of decay and hint of lamp oil."
    });
    console.log(currentRoom)
    //Create Player
    var currentPlayer = new app.Player(
      {
        playerName : "You",
        inventory : [items.capris]
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
      //}else if (strArray[0] === "inv" || "inventory"){
        //narration = currentPlayer.inventory(currentPlayer);
        //textNode.append('<p>' + narration + '</p>');
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
      // currentPlayer functions. It then calls the function and passes item and room information.
      */
      //// Set the verb and modify the words array
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
      //// push to the nouns array
      //console.log(currentPlayer.knownItems);
      
      
      var availableItems = currentPlayer.inventory.concat(app.fn.get_all_room_items(currentRoom)).concat(currentRoom),
          numItems = availableItems.length;
      if (numWords > 1){
        //loop the words and check it against the available items
        for (var j = 0; j < numWords; j++) {
          for (var k = 0; k < numItems; k++) {
            //Check the descriptor array against the words
            var numNames = availableItems[k].descriptor.length;
            for (var l = 0; l < numNames; l++) {
              //Check to see if any of the words match an available item;
              //TODO: Need to handle duplicate items here
              if (availableItems[k].descriptor[l] === words[j]) {
                nouns.push(availableItems[k]);
              }
            }
          }
        }
      }else{
        nouns.push(room);
      }
      //// call the function with the verb and nouns
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
        $('.readout').animate({ scrollTop: $(document).height() }, "fast"); 
      }
    });
});
})(window, $, window.app || {});