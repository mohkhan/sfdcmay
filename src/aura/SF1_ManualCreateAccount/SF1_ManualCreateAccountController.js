({
	doInit : function(component, event,helper) {

        var createRecordEvent = $A.get("e.force:createRecord");
       createRecordEvent.setParams({
            "entityApiName":  "Account"
        });
        createRecordEvent.fire();        

  

    }

})