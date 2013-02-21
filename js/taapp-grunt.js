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

  this.descriptor = options.descriptor || 'It has no name';
  this.sights = options.sights || 'You must be blind';
  this.sounds = options.sounds || 'You must be deaf';
  this.container = options.container || 'Not a container';
  this.containedItems = options.containedItems || 'nothing';
  this.getting = options.getting || 'Fingers?';
  //this.getting = options.getting || 'Fingers?';
  //this.getting = options.getting || 'Fingers?';
};

app.Item.prototype = {
  container:false,
  comprisedOf:[],
  combineWith:[],

  getDescriptor:function(){
    if(this.descriptor.length > 0)
      return app.fn.article(this.descriptor) + this.descriptor;
    else
      return 'There is no name';
  },
  look:function(){
    if (app.options.player_sight * app.options.player_perception > app.options.item_visual_secret_threshold) {
      if(typeof this.descriptor !== "undefined") {
        return this.sights || 'It looks like a ' + this.descriptor + ', nothing more';
      }
      else{
        return this.sights || 'You are not quite sure what it is';
      }
    } else {
      return 'Unable to dicern details';
    }
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
    return 'You toss the ' + this.descriptor + ' to the side';
  }
};

})(window, $, window.app || {});
(function(window,$,app){
  app.options = {
    player_sight : 10,
    player_perception : 2,
    item_visual_secret_threshold : 15
  };

  //Weapon class (sub)
  var Weapon = function Weapon(opts){
    this.weapon = "yes.";
  };

  Weapon.prototype = new app.Item();
  Weapon.prototype.swing = function(){
    console.log("swing");
  };

  //Player class
  var Player = function Player(opts, items){
    this.items = items || [];
    this.name = opts.name || "Anonymous";
  };

  Player.prototype = {
    addItem:function(whichItem){
      this.items.push(whichItem);
      return this.items;
    }
  };

  //Test function
  $(function(){
    //Examples
    var sword = new Weapon({
      descriptor:"Big ass sword"
    });
    var flint = new app.Item({
      descriptor:"flint"

    });
    var puddle = new app.Item({
      descriptor:"puddle",
      container:true,
      containedItems:['flint','dagger'],
      sights:'It looks deeper than expected. Perhaps it is hidding something in its depths.'
    });

    var textNode = $("#readout-content"),
        inputNode = $("#text-input"),
        buttonNode = $("#hidden-button");
    
    textNode.append(puddle.getDescriptor())
      .append("<br>"+puddle.look());


    inputNode.focus();

    inputNode.keyup(function(event){
    if(event.keyCode == 13){
        buttonNode.click();
    }
});

  });
  // var item = function (spec) {
  //   var _this = {};

  //   _this.get_name = function () {
  //     return article(spec.name) + spec.name || '';
  //   };

  //   _this.look = function () {
  //     if (player_sight * player_perception > item_visual_secret_threshold) {
  //       if (spec.name) {
  //         return spec.sights || 'It looks like a ' + spec.name + ', nothing more';
  //       }
  //       if (!spec.name) {
  //         return spec.sights || 'You are not quite sure what it is';
  //       }
  //     } else {
  //       return 'Unable to dicern details';
  //     }
  //   };

  //   _this.listen = function () {
  //     return spec.sounds || 'The ' + spec.name + ' isn\'t emmiting any noise.';
  //   };

  //   _this.take = function () {
  //     return spec.getting || 'You cannot take the ' + spec.name;
  //   };

  //   _this.search = function () {
  //     if (spec.contained_items){
  //       //alert (spec.contained_items.length);
  //       var items = '';
  //       for (var i = 0; i < spec.contained_items.length; i++) {
  //         items += 'You find ' + article(spec.name) + spec.contained_items[i] +'\n';
  //       }
  //       return items;
  //     }else if (spec.container) {
  //       return 'You grope around in it but find nothing.';
  //     }else{
  //       return 'The ' + spec.name + ' isn\'t a container.';
  //     }
  //   };

  //   _this.drop = function () {
  //     //remove item from inventory
  //     return 'You toss the' + spec.name + ' to the side';
  //   };

  //   return _this;
  // };

  //var door = function(spec){
    //var _this = item(spec);
    //unique door functions and such;
  //};
  // var sword = item({
  //   name : 'Great Sword of Pain and Injustice',
  //   sights : 'It\'s the most badass thing you have ever laid your eyes on!',
  //   sounds : 'Tilting your ear toward it, you can almost hear the whispers and cries of those that fell before it',
  //   getting : 'You\'re afraid the blade\'s power will overwhelm you.'
  // });
  // var subject = item({
  //   name : 'Puddle',
  //   container : true,
  //   sights : 'It is dark. You cannot see the bottom.',
  //   contained_items : ['flint', 'dagger', 'liquid'],
  //   sounds : 'The only sounds are those of the liquid dripping into it.'
  // });
  // document.writeln(sword.get_name());
  // document.writeln(sword.look());
  // document.writeln(sword.listen());
  // document.writeln(sword.take());
  // document.writeln(sword.search());
  // document.writeln();
  // document.writeln(subject.get_name());
  // document.writeln(subject.look());
  // document.writeln(subject.listen());
  // document.writeln(subject.take());
  // document.writeln(subject.search());




})(window, $, window.app || {});
