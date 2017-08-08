({
	/*
	 * doInit : function(component, event, helper) {
		helper.getContracts(component);
		},
	*/
    handleRenderContracts : function (component, event, helper) {
        //helper.getContracts(component, event);
        helper.validateEvent(component, event);
    },
    updateCheckbox: function (component, event, helper) {
        helper.updateCheckboxhelper(component, event, helper);
    },
    updateAllCheckboxes: function (component, event, helper) {
        helper.updateAllCheckboxeshelper(component, event, helper);
    },
    gotoRecord : function(component,event){
        //console.log('gotoRec:' + event.target.id);
        //var monkeyLove = event.getSource().getElement().getAttribute('name');
        
        var navigateToId = event.target.id;
        var sObjectEvent = $A.get("e.force:navigateToSObject");
        console.log('sObjectEvent=' + sObjectEvent);
        sObjectEvent.setParams({
            "recordId": navigateToId,
            "slideDevName": 'detail'
        })
        sObjectEvent.fire();
    },
    pagerecords : function (cmp,event,helper) {
        if (cmp.isValid()) { 
            cmp.set("v.page", event.getParam("pagevalue"));
            helper.queryRows(cmp, cmp.get("v.page") || 0, helper.getSortOrder(cmp, false));
            // helper.fireContractChangeEvent(null, null, null);
        }
    },
    
})