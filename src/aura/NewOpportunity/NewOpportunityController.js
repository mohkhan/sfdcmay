({
	myAction : function(component, event, helper) {
		
	},
    onGroup: function(cmp, evt) {
		 var selected = evt.getSource().get("v.label");
		 resultCmp = cmp.find("radioGroupResult");
		 resultCmp.set("v.value", selected);
	}
})