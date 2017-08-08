({
	onGroup: function(cmp,evt) {
    	 var selected = evt.getSource().get("v.label");
    	 resultCmp = cmp.find("basline-select-result");
    	 resultCmp.set("v.value", selected);
	},
    update : function (cmp, event) {
        var selected = event.getSource().get("v.label");
        alert(selected);
 		 $A.util.toggleClass(event.getSource(), "red");
	}
})