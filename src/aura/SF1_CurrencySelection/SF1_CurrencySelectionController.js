({
	doInit : function(component, event, helper) {
		helper.validateEvent(component, event, helper);
	},
    
    updateCurrency: function(component, event, helper) {
        helper.updateCurrency(component, event, helper);
	},

    onCurrencySelectionChange : function(component, event, helper) {
        
        var currencySelection = component.get("v.opptyCurrencyPicked");
        console.log('inside onSelectChange, pickedCurrency:' + currencySelection);
		var evntOppBtn = $A.get("e.c:changeCreateOpportunityButtonVisibility");
        evntOppBtn.setParams({ "currencyValue" : component.get("v.opptyCurrencyPicked") });
        console.log(evntOppBtn);
        evntOppBtn.fire();
        // fire the event...
        helper.fireCurrencyUpdateEvent(currencySelection);

    },

    // contractChangeHandler : function(component, event, helper) {

    // },
    
})