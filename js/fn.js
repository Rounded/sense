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
  getAllRoomItems: function(currentRoom){
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