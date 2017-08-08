({
    isEmpty : function(val) {
		return (val ? false : true);
    },

    validateOpptyChangeEvent : function (component, event) {

        var acc = event.getParam("acc");
        var opptyBaslinePicked = event.getParam("selection");
        var withBaseLineType = "Create Opportunity with Contract Baseline";
        console.log("inside LIstOppty.validateOpptyChangeEvent... accId:" + acc + "; baselineSelection=" + opptyBaslinePicked);
        //console.log('inside getOpportunities: withBaseline=' + event.getParam("withBaseline"));
        
        var EditOppTab = component.find("noBaselineOpptysMessage"); 
        $A.util.removeClass(EditOppTab, 'slds-show');
        $A.util.addClass(EditOppTab, 'slds-hide');

        //console.log('equals to opptyBaslineType? :' + opptyBaslineType  + '; withBaseLineType: ' withBaseLineType);
        if (!this.isEmpty(acc) &&  !this.isEmpty(opptyBaslinePicked)) {
            if (opptyBaslinePicked.toUpperCase() === withBaseLineType.toUpperCase()) {
                console.log('SKIPPING THE RUN...'); 
                component.set("v.doneLoading", false);
                //component.set("v.noOpportunitiesFound", false);
            }
            else {
                console.log('does qualify for NonRenewalOppty Rendering...');
                //component.set("v.doneLoading", true);
                // @todo:  Fire the even tot fold the Oppty List from HERE...
                component.set("v.opptyMessageWithBaseline", false);
                component.set("v.noOpportunitiesFound", false);
                this.getOpportunityByAccID(component, event, acc);
            }

            //this.toggle123(component, event, "toggleOff", "noBaselineRecordsMessage");
        }

    },
    
    // toggle123 : function(component, event, toggle, componentID) {
    //     // var toggleText = component.find("noBaselineRecordsMessage");
    //     // $A.util.toggleClass(toggleText, toggle);//"toggle");
    // },

    getOpportunityByAccID : function(component, event, acc) {

        console.log('inside getOpportunityByAccID: accountId=' + acc.Id); // + "; contractIDs=" + contractIds + "; param-contracts:" + event.getParam("contracts"));
        var action = component.get("c.getOpportunitiesByAccountId");
        action.setParams({
            accountId: acc.Id,
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.Opportunities", response.getReturnValue());
                console.log('inside getOpportunityByAccID list oppty=' + JSON.stringify(response.getReturnValue()));
                var opptys = component.get("v.Opportunities");
                //component.set("v.doneLoading", true);
                
                
                if((this.isEmpty(opptys)) || (!opptys.length>0)) {
                    console.log('oppty is empty.');
                    component.set("v.doneLoading", false);
                } else {
                    console.log('oppty not empty.');
                    component.set("v.doneLoading", true);                    
                }   
                console.log('vOpptys=' + opptys);
                console.log('opptylength=' + opptys.length);
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

	getOpportunities : function(component, event) {
        
        var tmp = component.find("noBaselineOpptysMessage"); 
        $A.util.removeClass(tmp, 'slds-show');
        $A.util.addClass(tmp, 'slds-hide');

        var accountId = event.getParam("accountId");
        var contractIds = event.getParam("contracts");
        //console.log('inside getOpportunities: accountId=' + accountId +  "; contractLength=" +  contractIds.length + "; contractIDs=" + contractIds + "; param-contracts:" + event.getParam("contracts"));
        //this.toggle123(component, event, "toggleOff", "noBaselineRecordsMessage");
        component.set("v.opptyMessageWithBaseline", true);
        var action = component.get("c.getOpportunitiesByContractIds");
        //action.setParams({accountId: accountId})
        //action.setParams({contractIds:contractIds});
        action.setParams({
            accountId: accountId,
            contractIds: contractIds
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
        		component.set("v.Opportunities", response.getReturnValue());
                //component.get("v.opptyMessage").set("v.value", "");
                console.log('inside list oppty=' + JSON.stringify(response.getReturnValue()));
                var opptys = component.get("v.Opportunities");
                //component.set("v.doneLoading", true);
                
                
                if((this.isEmpty(opptys)) || (!opptys.length>0)) {
                    console.log('oppty is empty.');
                    component.set("v.doneLoading", false);
                    component.set("v.noOpportunitiesFound", true);
                    console.log('opptyFound?' + component.get("v.noOpportunitiesFound") + '; withBaseline?' + component.get("v.opptyMessageWithBaseline"));
                    if (contractIds!=null && contractIds.length > 0) {
                        //this.toggle123(component, event, "toggleOn", "noBaselineRecordsMessage");
                        var contractIdsVar = event.getParam("contracts");
                        console.log('contractIds not empty but no Opptys found for:' + contractIds + '; contractIdsVar=' + contractIdsVar);

                        var EditOppTab = component.find("noBaselineOpptysMessage"); 
                        $A.util.removeClass(EditOppTab, 'slds-hide');
                        $A.util.addClass(EditOppTab, 'slds-show');

                        // var cmpTarget = component.find("noBaselineRecordsMessage");
                        // console.log('noBaselineRecordsMessage=' + cmpTarget);
                        // //$A.util.toggleClass(toggleText, "toggle");//"toggle");
                        // $A.util.removeClass(cmpTarget,'toggleOff');
                        // $A.util.addClass(cmpTarget, 'changeMe');

                    }

                } else {
                    console.log('oppty not empty.');
                    component.set("v.doneLoading", true);  
                    component.set("v.noOpportunitiesFound", false);                  
                }   
                console.log('vOpptys=' + opptys);
                console.log('opptylength=' + opptys.length);
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