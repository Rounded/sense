(function(window,$,app){
    //Create Items
    var flint = new app.Item({
      descriptor:"flint",
      visual_secret_threshold:10
    });
    var puddle = new app.Item({
      descriptor : 'puddle',
      container : true,
      sights : 'It looks deeper than expected. Perhaps it is hidding something in its depths.',
      containedItems : [flint],
      sounds : 'The only sounds are those of the liquid dripping into it.'
    });
    var capris = new app.Item({
      descriptor:"drawsting capris",
      sights:"You Look like an idiot wearing them."
    });
    var sword = new app.Item({
      name : 'Great Sword of Pain and Injustice',
      sights : 'It\'s the most badass thing you have ever laid your eyes on!',
      sounds : 'Tilting your ear toward it, you can almost hear the whispers and cries of those that fell before it',
      getting : 'You\'re afraid the blade\'s power will overwhelm you.'
    });

    //Create Room Object passing descriptions and items in
    var currentRoom = new app.Room({
      visual_secret_threshold:10,
      ambientLight:0,
      hiddenItems:[flint,sword],
      discoveredItems:[puddle],
      sights:"It appears to be a holding cell of sorts."
    });

    //Create Player
    var currentPlayer = new app.Player(
      {
        playerName:"",
        perception:5
      },
      [sword,capris]
    );
    //Create an array of those items
  //Test function
  $(function(){
    //declare some variable for the ui
    var textNode = $("#readout-content"),
        inputNode = $("#text-input"),
        buttonNode = $("#hidden-button");
    //read function
    var read = function(value){
      var str=value,
          strArray=str.split(" "),
          verb = strArray[0],
          noun = strArray[1] || "room";
          
      //check if action exists
      // if(typeof item[action] === "function"){
      //   item[action]();
      // }
      var discoveredItems = currentRoom.discoveredItems;

      for(var i = 0; i < discoveredItems.length; i++){
        var item = discoveredItems[i],
          descriptor = item.descriptor;

        if(noun.toLowerCase() === descriptor.toLowerCase()){
          if(typeof item[verb] === "function"){
            //item and verb exist
            console.log(item[verb]());
            return;
          }
          else{
            //item exists but verb does not
            return;
          }
        }
        else{
          //item does not exist
        }
      }

      //console.log ('noun: '+noun);
      //console.log ('verb: '+verb);
      // var thing = noun[verb]();
      // if (typeof noun[verb]() === "function"){
      //   // if item is in the discovered items object
      //   // if (currentRoom.hasItem(noun) || currentPlayer.hasItem(noun)){
      //   //   //textNode.append(noun.verb(currentPlayer.perception, currentRoom.ambientLight));
      //   //   textNode.append('hello');
      //   // }else{
      //   //   textNode.append('nope');
      //   // }
      //   textNode.append('this');
      // }else{
      //   textNode.append('You want to do what with that?');
      // }
    };

    //console.log('Current Room: Ambient light = ' + currentRoom.ambientLight);
    //console.log(currentRoom.hasItem(puddle));
    //textNode.append((currentPlayer.playerName)+"<br>")
      //.append(currentRoom.look(currentPlayer.perception)+"<br>")
      //.append(capris.look(currentPlayer.perception, currentRoom.ambientLight));

    //Place the cursor in the input
    inputNode.focus();
    //Run a function when user hits enter
    inputNode.on("keyup",function(event){
      if(event.keyCode === 13){
        var value = $(this).val();
        read(value);
        this.value = '';
      }
    });
});
})(window, $, window.app || {});