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
  //this.ambientLight = options.ambientLight || 0;
  // the item accesses the ambient light set in the room var and passes it in to the look function
  this.visual_secret_threshold = options.visual_secret_threshold || 0;
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
  },
  look:function(perception, ambientLight){
      playerPerception = perception || 0;
      roomAmbientLight = ambientLight || 0;
      //console.log('item ambientLight '+ ambientLight);
      //console.log('item perception '+ perception);
      //console.log('item vst '+this.visual_secret_threshold);

    if (roomAmbientLight * playerPerception > this.visual_secret_threshold) {
      if(typeof this.descriptor !== "undefined") {
        return this.sights || 'It looks like a ' + this.descriptor + ', nothing more';
      }
      else{
        return this.sights || 'You are not quite sure what it is';
      }
    } else {
      return 'Unable to see the details';
    }
  },
  touch:function(){
    return this.feels || 'It feels like ' + app.fn.article(this.descriptor) + this.descriptor;
  },
  listen:function(){
    return this.sounds || 'The ' + this.descriptor + 'isn\'t emmitting any sounds.';
  },
  combine:function(otherItem){
    //if ((combineWith.indexOf(otherItem)) !== -1){ //indexOf returns -1 if fail
      //create new item that contains the other items and is comprised of the other items
    //}
  },
  disassemble:function(){
    //check to see if item is comprised of other items (are there items in the comprisedOf array)
    //put contained items in character inv
    //destroy item
  },
  take:function(){
    return this.getting || 'Try as you might you cannot take the ' + this.descriptor;
  },
  //search function is a take function
  search:function(){
    if (this.container){
      if (this.containedItems){
        var items = 'You find:\n';
        for (var i = 0; i < this.containedItems.length; i++) {
          items += 'You find ' + article(this.descriptor) + this.containedItems[i] +'\n';
        }
        return items;
      }else{
        return 'You grope around in the ' + this.descriptor + ', but find nothing. Disapoint.';
      }
    }else{
      return 'The ' + this.descriptor + ' isn\'t a container.';
    }
  },

  drop:function(){
    return this.dropping || 'You toss the ' + this.descriptor + ' to the side';
    //put item in parent of character item;
  }
};

})(window, $, window.app || {});
(function(window,$,app){
//Player class
  app.Player = function Player(opts, items){
    this.inventory = items || [];
    this.playerName = opts.playerName || "Anonymous";
    this.perception = opts.perception || 0;
  };

  app.Player.prototype = {
    addItem:function(whichItem){
      this.inventory.push(whichItem);
      return this.inventory;
    },
    hasItem:function(whichItem){
      //loop through inventory
      for (var i = 0; i < this.inventory.length; i++) {
        if (whichItem === this.inventory[i].descriptor) {
          return true;
        }else{
          return false;
        }
      }
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

  this.visual_secret_threshold = options.visual_secret_threshold || 0;
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
      }else{
        return false;
      }
    }
  }
  //Move items from discoverd to hidden
};

})(window, $, window.app || {});
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