({
    // getOpportunitiesByContractIds(String accountId, String[] contractIds)
    renderOpportunities : function(component, event, helper) {
        helper.getOpportunities(component, event);
    },

    handleOpptyTypeChange : function(component, event, helper) {
        helper.validateOpptyChangeEvent(component, event);
    },
    
    // showSpinner: function(component, event, helper) {
    //     if(document.getElementById("oppSpinner") != null)
    //     {
    //         document.getElementById("oppSpinner").style.display = "block";
    //     } 
    // },
    
    // hideSpinner : function(component,event,helper){
    //     if(document.getElementById("oppSpinner") != null)
    //     {
    //         document.getElementById("oppSpinner").style.display = "none";
    //     }
    // },
    
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
    

    gotoURL : function (component, event, helper) {
		var navigateToId = event.target.id;
        console.log('gotoRec:' + event.target.id);
        var urlEvent = $A.get("e.force:navigateToURL");
        console.log('sObjectEvent=' + sObjectEvent);
        urlEvent.setParams({
            "url": "/" + navigateToId
        });
        urlEvent.fire();
    },
    
	// showSpinner: function(component, event, helper) {
 //       if(document.getElementById("oppSpinner") != null) {
 //            document.getElementById("oppSpinner").style.display = "block";
 //        } 
 //    },

 //    hideSpinner : function(component,event,helper){
 //        if(document.getElementById("oppSpinner") != null) {
 //            document.getElementById("oppSpinner").style.display = "none";
 //        }
 //    },

    // automatically call when the component is done waiting for a response to a server request.  
    hideSpinner : function (component, event, helper) {
        var spinner = component.find('spinner3');
        var evt = spinner.get("e.toggle");
        evt.setParams({ isVisible : false });
        evt.fire();    
    },
 // automatically call when the component is waiting for a response to a server request.
    showSpinner : function (component, event, helper) {
        var spinner = component.find('spinner3');
        var evt = spinner.get("e.toggle");
        evt.setParams({ isVisible : true });
        evt.fire();    
    },
    
})

/* 
 * Spinner xml: 
 *     <span id="oppSpinner">
        <div aura:id="spinnerId" class="slds-spinner_container">
            <div class="slds-spinner--brand  slds-spinner slds-spinner--medium slds-is-relative" role="alert">
                <span class="slds-assistive-text">Loading..</span>
                <div class="slds-spinner__dot-a"></div>
                <div class="slds-spinner__dot-b"></div>
            </div>
        </div>
   </span>
 * */