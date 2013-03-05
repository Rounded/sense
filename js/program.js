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
        narration = currentPlayer.contemplate(strArray, currentRoom);
        textNode.append(narration + '<br />');
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