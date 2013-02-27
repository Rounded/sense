(function(window,$,app){
   
    //Create Room Object passing descriptions and items in

    var currentRoom = new app.Room({
      visual_secret_threshold:10,
      ambientLight:3,
      hiddenItems:[flint],
      discoveredItems:[puddle],
      sights:"It appears to be a holding cell of sorts."
    });
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
    //Create Player
    var currentPlayer = new app.Player(
      {
        playerName:"Sir Billiam",
        perception:5
      },
      {
        items:[sword,drawstringCapris]
      }
    );
    var drawstringCapris = new app.Item({
      descriptor:"drawsting capris",
      sights:"You Look like an idiot wearing them."
    });
    var sword = new app.Item({
      name : 'Great Sword of Pain and Injustice',
      sights : 'It\'s the most badass thing you have ever laid your eyes on!',
      sounds : 'Tilting your ear toward it, you can almost hear the whispers and cries of those that fell before it',
      getting : 'You\'re afraid the blade\'s power will overwhelm you.'
    });
    //Create an array of those items
    
  //Test function
  $(function(){
    //declare some variable for the ui
    var textNode = $("#readout-content"),
        inputNode = $("#text-input"),
        buttonNode = $("#hidden-button");
    
    //read function
    var read = function(value){
      var str=value;
      var str_array=str.split(" ");
      //var inputString = $("#text-input").value;
      console.log(str_array);
      var action = str_array[1];
      var item = str_array[2];
      // if item is in the discovered items object
    };

    //append stuff the text node. later make a function that returns these.
    console.log(currentRoom.ambientLight);
    textNode.append(currentRoom.look(currentPlayer.perception)+"<br>")
      .append(drawstringCapris.look(currentPlayer.perception, currentRoom.ambientLight));
   

    //Place the cursor in the input
    inputNode.focus();
    //Run a function when user hits enter
    inputNode.on("keyup",function(event){
      if(event.keyCode === 13){
        var value = $(this).val();
        read(value);
      }
    });
});

})(window, $, window.app || {});