({
	doInit : function(cmp,event,helper){
		helper.queryAssociatedContracts(cmp,event,helper);
	},

	closeContractModal : function(cmp,event,helper){
        helper.closeModal(cmp);
    }
})