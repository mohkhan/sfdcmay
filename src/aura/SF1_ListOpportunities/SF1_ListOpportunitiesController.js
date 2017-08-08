({
    // getOpportunitiesByContractIds(String accountId, String[] contractIds)
    renderOpportunities : function(component, event, helper) {
        helper.getOppty(component, event);
    },
    
    showSpinner: function(component, event, helper) {
        if(document.getElementById("oppSpinner") != null)
        {
            document.getElementById("oppSpinner").style.display = "block";
        } 
    },
    
    hideSpinner : function(component,event,helper){
        if(document.getElementById("oppSpinner") != null)
        {
            document.getElementById("oppSpinner").style.display = "none";
        }
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