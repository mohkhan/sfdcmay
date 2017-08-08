({
	getOppty : function(component, event) {
        //console.log("calling getContracts via event handler.");
        //var accountId = event.getParam("accountId");
        //var contractIds = event.getParam("contracts");
        //console.log('inside getOpportunities: accountId=' + accountId + "; contractIDs=" + contractIds + "; param-contracts:" + event.getParam("contracts"));
        
        //var action = component.get("c.getOpportunitiesByContractIds");
        var action = component.get("c.getOpportunities");
        
        //action.setParams({accountId: accountId})
        //action.setParams({contractIds:contractIds});

        // below one works...
        // action.setParams({
        //     accountId: accountId,
        //     contractIds: contractIds
        // });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
        		component.set("v.Opportunities", response.getReturnValue());
                //console.log('inside list oppty=' + JSON.stringify(response.getReturnValue()));
                var opptys = component.get("v.Opportunities");
                component.set("v.doneLoading", true);
                //if (opptys.length>0) {
                //    component.set("v.doneLoading", true);
                //}
                    
                console.log('vOpptys=' + opptys);
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            } else {
                console.log("Action State returned was: " + state);
            }
        });
        $A.enqueueAction(action);
	},
})