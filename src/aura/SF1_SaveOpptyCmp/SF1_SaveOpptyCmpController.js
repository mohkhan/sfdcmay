({
    save : function(cmp, event) {
        // Save the record
        cmp.find("edit").get("e.recordSave").fire();
    },

    handleSaveSuccess : function(cmp, event) {
        alert.("Hi");
       
    }
})