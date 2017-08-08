({
	navigateToOpportunityFlow : function(cmp, event, helper) {
		console.log('accId=' + cmp.get("v.recordId"));
        
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef : "c:SF1_OpportunityFlow",
            componentAttributes: {
                fromAccount : cmp.get("v.recordId")
            }
        });
        evt.fire();
	}
})