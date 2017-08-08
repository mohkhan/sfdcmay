({

	isEmpty : function(val) {
        return (val ? false : true);
    },

	isOwnerCreated : function(component) {
		
        var ownerID = component.get("v.newOppty.OwnerId");
		var createdById = component.get("v.newOppty.CreatedById");
		console.log('inside isOwnerCreated... ownerID:' + ownerID + '; createdById:' + createdById);
	  	if (ownerID === createdById) {
	  		return true;
	  	} 
        else {
           
	  		return false;
	  	}

	},

    withoutBaselineCheck : function(component, event) {

        var acc = event.getParam("acc");
        var opptyBaslinePicked = event.getParam("selection");
        var withBaseLineType = "Create Opportunity with Contract Baseline";
        var withoutBaselineType = "New Opportunity without Contract Baseline";
        //console.log('equals to opptyBaslineType? :' + opptyBaslineType  + '; withBaseLineType: ' withBaseLineType);
        if (!this.isEmpty(acc) &&  !this.isEmpty(opptyBaslinePicked) && (opptyBaslinePicked.toUpperCase() === withoutBaselineType.toUpperCase())) {
            console.log('OpptyFlowHelper.withoutBaselineCheck qualifies'); 
            
            component.set("v.acc", acc);
            component.set("v.withoutBaseLine", true);
        }
        else {
            console.log('OpptyFlowHelper.withoutBaselineCheck does NOT qualifies'); 
            component.set("v.withoutBaseLine", false);
            // @todo:  Fire the even tot fold the Oppty List from HERE...
            //this.fireContractChangeEvent(null, null);
        }

        //console.log('opptyBaslinePicked:' + opptyBaslinePicked + '; acc:' + acc);

        // if (opptyBaslineType == )
        // var action = component.get("c.getContractsByAccID");
        // action.setParams({acc:acc});
        // component.set("v.acc", acc);
        // selection

    },

	createOpptyRec : function(component, event, helper) {

		var recordsPresent = component.get("v.noRecordsPresent");
		var selectedCurrency = component.get("v.otherCurrency");
		var selectedContracts = component.get("v.selectedContracts");
		
		//component.find("createRenewalOppty").set("v.disabled", true);  No need to disable the button.  
	
		var action = component.get("c.createRenewalOpportunityFromContracts");
        action.setParams({
            selectedContractIds: selectedContracts,
            selectedCurrency: selectedCurrency,
			isContractCurrencyMismatch: false            
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log("state:" + state);
            if (component.isValid() && state === "SUCCESS") {
            	
            	console.log("NEWOPPTY=" + JSON.stringify(response.getReturnValue()));
        		component.set("v.newOppty", response.getReturnValue());
        		this.showToast(component,event, helper);
        		//component.find("createOppty").set("v.disabled", false);
        		var opptyId = component.get("v.newOppty.Id");
        		
                /* We are commenting this out because force:recordedit is broken 
        		if (this.isOwnerCreated(component)) {
        			console.log("isOWNERCREATED REC...");
    				//this.editRecord(opptyId);
                    this.gotoRecord(opptyId,"Detail"); 
                    
        		} else {
        			console.log("NOT OWNER CREATED REC...");
        			
        			this.gotoRecord(opptyId, "Detail");
                    //this.editRecord(opptyId); 
        		}*/
                
                this.gotoRecord(opptyId,"Detail"); 

                console.log("AT THE END... ");
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

	gotoRecord : function(recId, slideDevName) {//component,event, slideDevName){ // slideDevName=> detail, related,
        //console.log('gotoRec:' + event.target.id);
        //var monkeyLove = event.getSource().getElement().getAttribute('name');
        
        //var navigateToId = component.get("v.newOppty.Id");
        var sObjectEvent = $A.get("e.force:navigateToSObject");
        console.log('sObjectEvent=' + sObjectEvent);
        sObjectEvent.setParams({
            "recordId": recId, //navigateToId,
            "slideDevName": slideDevName
        }); 
        sObjectEvent.fire();

    }, 
 
    editRecord : function(recId) {
       var newEvent = $A.get("e.force:navigateToComponent");
        newEvent.setParams({
            componentDef: "c:SF1_OpptyEdit",
            componentAttributes: {
                "recordId" : recId
            }
        });
        newEvent.fire();

	},

	showToast : function(component, event, helper) { // msg
    
	    var toastEvent = $A.get("e.force:showToast");
	    toastEvent.setParams({
	        "title": "Success!",
	        "message": "The record has been created successfully."
	    });
	    toastEvent.fire();

	}, 

	fireRecordCreateEvent : function () { //SF1_RedirectToRecord recordCreated
        var appEvent = $A.get("e.c:SF1_RedirectToRecord");
        appEvent.setParams({"recordCreated" : true});        
        appEvent.fire();
    },
})