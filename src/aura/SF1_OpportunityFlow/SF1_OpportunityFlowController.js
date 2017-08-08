// SF1_OpportunityFlowController
({
     // this function automatic call by aura:waiting event  
    showSpinner: function(component, event, helper) {
       // make Spinner attribute true for display loading spinner 
        component.set("v.Spinner", true); 
    },
    
    // this function automatic call by aura:doneWaiting event 
    hideSpinner : function(component,event,helper){
     // make Spinner attribute to false for hide loading spinner    
       component.set("v.Spinner", false);
    },

	doInit : function(component, event, helper) {
        console.log(component.get("v.fromAccount"));
        /*
	        var toggleText = component.find("content-section");
	        console.log("toggleText" + toggleText);
	        $A.util.toggleClass(toggleText, "toggle");
		*/	
	}, 
	
	handleAccountChange : function(component, event, helper) {
		/* reset all the data...*/
	},

	isEmpty : function(val) {
		return (val ? false : true);
    },

	handleCurrencyChange : function(component, event, helper) {
	
		var selectedCurrency = event.getParam("currency");
		console.log('inside OpptyFlow.handleCurrencyChange...' + selectedCurrency);
		component.set("v.otherCurrency", selectedCurrency);
		console.log("otherCurrency:" + component.get("v.otherCurrency"));

		// call the fn from here to validate the buttonVisibility...
        var noRecordsPresent =  component.get("v.noRecordsPresent");
        var hascurrencyMisMatch =  component.get("v.isContractCurrencyMismatch");
        var hasNoCurrency =  component.get("v.otherCurrency");

        if (!noRecordsPresent && (hascurrencyMisMatch && hasNoCurrency.toUpperCase() === "NONE")) {
        	component.set("v.showNewOpptyBtn", true);
        	component.find("createRenewalOppty").set("v.disabled", true);
        }
        // else {
        // 	component.set("v.showNewOpptyBtn", false);
        // 	//component.find("createRenewalOppty").set("v.disabled", false);
        // }
        else {
        	component.set("v.showNewOpptyBtn", false);
        	var renewalBtn = component.find("createRenewalOppty");
        	if (renewalBtn) {
        		console.log('renewalBtn exists=' + renewalBtn);
        		renewalBtn.set("v.disabled", false);
        	} else {
        		console.log('renewalBtn does not exists=' + renewalBtn);
        	}
        	
        	//component.find("createRenewalOppty").set("v.disabled", false);
        }


	},

	handleOpptyTypeChange : function(component, event, helper) {

		helper.withoutBaselineCheck(component, event);

	},

	handleContractChange : function(component, event, helper) {

		console.log('inside OpptyFlow.handleContractChange...');
        var accountId = event.getParam("accountId");
        var contractIds = event.getParam("contracts");
        var hasCurrencyMisMatch = event.getParam("hasCurrencyMisMatch");


        console.log('inside OpptyFlow.handleContractChange...: accountId=' + accountId + "; contractIDs=" + contractIds + '; hasCurrencyMisMatch=' + hasCurrencyMisMatch);

        //if (!this.isEmpty(contractIds) && contractIds.length>2) { // currently contracts.length is returning lenght of the string instead of array.length
        if (contractIds) { // currently contracts.length is returning lenght of the string instead of array.length
        	if (contractIds.length>0) {
	            component.set("v.noRecordsPresent", false);
	            component.set("v.selectedContracts", contractIds);
	            component.set("v.isContractCurrencyMismatch", hasCurrencyMisMatch);
	            console.log('opptyFlow.handleContractChange is a valid request.selectedContracts:' + component.get("v.selectedContracts")); 
	            console.log('isContractCurrencyMismatch=' + component.get("v.isContractCurrencyMismatch"));
	        }
	        else {
	        	console.log('opptyFlow.handleContractChange is an empty request.');
	        	component.set("v.isContractCurrencyMismatch", hasCurrencyMisMatch);
            	component.set("v.noRecordsPresent", true);
	        }

        } 
        else {
            console.log('opptyFlow.handleContractChange is an empty request.');
            component.set("v.isContractCurrencyMismatch", hasCurrencyMisMatch);
            component.set("v.noRecordsPresent", true);
        }

        // call the fn from here to validate the buttonVisibility...
        var noRecordsPresent =  component.get("v.noRecordsPresent");
        var hascurrencyMisMatch =  component.get("v.isContractCurrencyMismatch");
        var hasNoCurrency =  component.get("v.otherCurrency");

        if (!noRecordsPresent && (hascurrencyMisMatch && hasNoCurrency.toUpperCase() === "NONE")) {
        	component.set("v.showNewOpptyBtn", true);
        	component.find("createRenewalOppty").set("v.disabled", true);
        }
        else {
        	component.set("v.showNewOpptyBtn", false);
        	var renewalBtn = component.find("createRenewalOppty");
        	if (renewalBtn) {
        		console.log('renewalBtn exists=' + renewalBtn);
        		renewalBtn.set("v.disabled", false);
        	} else {
        		console.log('renewalBtn does not exists=' + renewalBtn);
        	}
        	
        	//component.find("createRenewalOppty").set("v.disabled", false);
        }

	},

	//showNewOpportunityBtn : function(component, event, h)

	// Account, 2-Qualify, Direct

	createOppty : function(component, event, helper) {

		var acc = component.get("v.acc");
		console.log('inside OpptyFlow.createOppty... acc:' + JSON.stringify(acc));
        
        var evt = $A.get("e.force:createRecord");
        console.log('evt:' + evt);
        evt.setParams({
            'entityApiName':'Opportunity',  
            // @todo: defaultFieldValues needs to be enabled after Summer'17 goes to production ETA: Sep/15/2017.
            // 'defaultFieldValues': {
            //     'StageName':'2-Qualify',
            //     'AccountId': acc.Id,
            //     'Deal_Type__c': 'Direct'
            // },
            'recordTypeId':'012A0000000CvQLIA0'
        });
        
        evt.fire();

        //  var createRecordEvent = $A.get("e.force:createRecord");
        // createRecordEvent.setParams({
        //     "entityApiName": inputSecret
        // });
        // createRecordEvent.fire();

	},
    
    toggle : function(component, event, helper) {
        
        var toggleText = component.find("baselineType");
        console.log("toggleText" + toggleText);
        $A.util.toggleClass(toggleText, "toggle");

	},

	submitRequest : function(component, event, helper) {
		helper.createOpptyRec(component, event, helper);
	},
    
    handleCreateOppButtonVisibility : function(component, event, helper) {
        console.log('Currency in Handler == '+event.getParam("currencyValue"));
        var createBtn = component.find("createOppDivId") ;
        if(event.getParam("currencyValue") == "none"){
            console.log("In none block");
            component.find("createRenewalOppty").set("v.disabled", true);
            $A.util.removeClass(createBtn, 'slds-show');
        	$A.util.addClass(createBtn, 'slds-hide');
            console.log("In none block2");
        } else {
            component.find("createRenewalOppty").set("v.disabled", false);
            $A.util.removeClass(createBtn, 'slds-hide');
        	$A.util.addClass(createBtn, 'slds-show');
        }
	},
    
    handleEnableOppButton : function(component, event, helper) {
    	var createBtn = component.find("createOppDivId") ;
        $A.util.removeClass(createBtn, 'slds-hide');
        $A.util.addClass(createBtn, 'slds-show');
    }
	
	
})