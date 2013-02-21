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
