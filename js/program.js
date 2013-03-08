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