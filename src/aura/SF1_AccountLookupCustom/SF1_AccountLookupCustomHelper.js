({
	searchHelper : function(component,event,getInputkeyWord) {
	  // call the apex class method 
     var action = component.get("c.fetchAccount");
      // set param to method  
        action.setParams({
            'searchKeyWord': getInputkeyWord
          });
      // set a callBack    
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
              // if storeResponse size is equal 0 ,display No Result Found... message on screen.
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'No Result Found...');
                } else {
                    component.set("v.Message", 'Search Result...');
                }
                
                // set searchResult list with return value from server.
                component.set("v.listOfSearchRecords", storeResponse);
            }
 
        });
      // enqueue the Action  
        $A.enqueueAction(action);
    
	},

    fireOnChangeEvent: function(component, event, helper) {
    
      // create an event...
      var selectedRecord = component.get("v.selectedRecord");
      console.log("fireOnChangeEvent.selectedRecord=" + selectedRecord);
  		// note different syntax for getting application event
  		var appEvent = $A.get("e.c:accountChangeEvent");
  		appEvent.setParams({ "acc" : selectedRecord });
  		appEvent.fire();
    
  },

    // fireAccSelectionEvent : function(component, event, selectedRecord){      
    //   // get the selected Account from list  
    //   //var getSelectAccount = component.get("v.selectedRecord");
    //   console.log("fireAccSelectionEvent.selectedRecord=" + selectedRecord);
    //   // call the event   
    //   var appEvent = $A.get("e.c:oSelectedAccountEvent");
    //   appEvent.setParams({ "accountByEvent" : getSelectAccount });
    //   appEvent.fire();
    // // var compEvent = component.getEvent("oSelectedAccountEvent");
    // // // set the Selected Account to the event attribute.  
    // //      compEvent.setParams({"accountByEvent" : getSelectAccount });  
    // // // fire the event  
    // //      compEvent.fire();
    // },


})