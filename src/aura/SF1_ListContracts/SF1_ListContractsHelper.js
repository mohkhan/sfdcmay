(   
    {   
        isEmpty : function(val) {
        return (val ? false : true);
    },

    // var areEqual = string1.toUpperCase() === string2.toUpperCase();
    validateEvent : function (component, event) {

        var acc = event.getParam("acc");
        var opptyBaslinePicked = event.getParam("selection");
        var withBaseLineType = "Create Opportunity with Contract Baseline";
        //console.log('equals to opptyBaslineType? :' + opptyBaslineType  + '; withBaseLineType: ' withBaseLineType);
        if (!this.isEmpty(acc) &&  !this.isEmpty(opptyBaslinePicked) && (opptyBaslinePicked.toUpperCase() === withBaseLineType.toUpperCase())) {
            
            console.log('qualifies'); 
            component.set("v.acct", acc);

            //this.getContracts(component, event);
            this.queryRows(component, 0, '');
            
        }
        else {
            console.log('does not qualify');
            component.set("v.doneLoading", false);
            // @todo:  Fire the even tot fold the Oppty List from HERE...
            this.fireContractChangeEvent(null, null, null);
        }

    },

    queryRows : function(component, page, sOrder) {
        
        var action = component.get("c.getActiveContractsByAccIdPagination");
        //console.log("=== fields ===="+fields);
        var params = { "acc": component.get("v.acct"), "lim": component.get("v.pagelimit") || 10, "currentPage": page, 
                       "sortField" : component.get("v.sortField"), "sortOrder" :  sOrder || "asc" };
        console.log(JSON.stringify(params));
        action.setParams(params);
        action.setCallback(this, function(response) {
            console.log(response.getState());
            if (response && response.getState() === "SUCCESS" && component.isValid()) {
                var recordset = response.getReturnValue();
                console.log(JSON.stringify(recordset));
                component.set("v.doneLoading", true); // should we move this outside of this function ? need to validate.

                
                component.set("v.contracts", recordset.rows);
                component.set("v.resultsetsize", recordset.size);


                if (this.isEmpty(recordset.rows) || this.isEmpty(recordset.size) || recordset.size<1) {

                    component.set("v.noContractsFound", true);
                    console.log('inside resultsNOTFound');

                } else {
                    console.log('inside resultsFound');
                    //component.set("v.doneLoading", true); 
                    component.set("v.noContractsFound", false); 
                    this.setContractsMap(component); 

                }
                
                // Clean up the stateVariables...
                this.refreshState(component);
                /* need to uncomment this.
                */
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

    refreshState : function(component) {

        // Clean up the state variables...
        component.set("v.selectedContracts", []);

        // fire refrsh to dependent components.
        this.fireContractChangeEvent(null, null, null);

    },   

    // setContractsMap1 : function(component, event) {

    //     var contractList =  component.get("v.contracts");
    //     var selectedContractIds = component.get("v.selectedContracts"); 
    //     // console.log("contractList=" + contractList);
    //     // console.log("selectedContractIds=" + selectedContractIds);

    //     if (!this.isEmpty(contractList) &&  !this.isEmpty(selectedContractIds)) {

    //         var contractsMap = {};
    //         for (var i in contractList){
    //             console.log('contract=' + contractList[i]);
    //             console.log('contracts.ocd:' + contractList[i].Id);
    //             contractsMap[contractList[i].Id]=contractList[i];
    //         }
    //         console.log('contractsMapsize=' + contractsMap.size + '; contractMap=' + JSON.stringify(contractsMap));
    //         component.set("v.contractsMap", contractsMap);
    //     }
    // },

    setContractsMap : function(component) {

            var contractList =  component.get("v.contracts");
            var selectedContractIds = component.get("v.selectedContracts"); 
            // console.log("contractList=" + contractList);
            // console.log("selectedContractIds=" + selectedContractIds);

            if (!this.isEmpty(contractList) &&  !this.isEmpty(selectedContractIds)) {

                var contractsMap = {};

                for (var i = 0; i < contractList.length; i++) {
                    console.log('contract=' + contractList[i]);
                    console.log('contracts.ocd:' + contractList[i].Id);
                    contractsMap[contractList[i].Id]=contractList[i];
                }
                console.log('contractsMapsize=' + contractsMap.size + '; contractMap=' + JSON.stringify(contractsMap));
                component.set("v.contractsMap", contractsMap);
            }
    },

    updateAllCheckboxeshelper: function(component, event, helper) {
        var checked = event.target.checked; //event.target.id event.target.name
        var inputs = document.querySelectorAll("input[type='checkbox']");
        for(var i = 0; i < inputs.length; i++) {
            inputs[i].checked = checked;   
        }
    },

    
    fireContractChangeEvent : function (acc, selectedContracts, currencyMisMatch) {

        console.log("fireContractChangeEvent:currencyMisMatch=" + currencyMisMatch + '; selectedContracts=' + selectedContracts + '; acc=' + acc);

        var appEvent = $A.get("e.c:onContractSelectionChange");
        appEvent.setParams({"contracts" : selectedContracts});        
        appEvent.setParams({"accountId" : acc});
        appEvent.setParams({"hasCurrencyMisMatch" : currencyMisMatch});
        appEvent.fire();

    },

    getSortOrder : function(cmp, changeorder) {
        if (changeorder && changeorder === true) {
            if (cmp.get("v.ascDescVal") === "asc") {
                cmp.set("v.ascDescVal", "desc");
            } else if (cmp.get("v.ascDescVal") === "desc") {
                cmp.set("v.ascDescVal", "asc");
            } else {
                cmp.set("v.ascDescVal", "desc");
            }    
        }
        return cmp.get("v.ascDescVal");
    },


    setCurrencyMisMatch : function (component, event) {

        var contractsMap = component.get("v.contractsMap");
        //var contractList =  component.get("v.contracts");
        var selectedContractIds = component.get("v.selectedContracts");
        console.log("conMap="+ contractsMap) + '; selectedContracts:' + selectedContractIds;

        if (!this.isEmpty(contractsMap) &&  !this.isEmpty(selectedContractIds)) {
            

            var currSet = new Set();
            for(var i = 0; i < selectedContractIds.length; i++) {
                var cont= contractsMap[selectedContractIds[i]];
                currSet.add(cont.Currency__c);
            }
            console.log('currSet=' + currSet.size + 'currSet=' + currSet.values().next().value);
            //console.log('currSet=' + currSet.size + 'currSet=' + currSet.values().next().value);

            if (currSet.size>1) {
                console.log('has Currency Mis match');
                component.set("v.isContractCurrencyMismatch", true);
            } else {
                console.log('has No Currency Mis-match');
                component.set("v.isContractCurrencyMismatch", false);
            }
        }

    },

    updateCheckboxhelper: function(component, event, helper) {
        var checked = event.target.checked; //event.target.id event.target.name
        var contractId = event.target.name;
        var tmp = component.get("v.selectedContracts"); // fetch the list of contractsSelected...
        
        if (checked) {
            console.log("updateCheckBox checked");
            tmp.push(contractId);
        } else {
            console.log("updateCheckBox unchecked");
            var index = tmp.indexOf(contractId);
            if (index>-1) {
                var removed = tmp.splice(index,1);
                console.log("removedId:" +removed);
            }
        }
        
        //alert('inside updateCheckbox...'+ event.target.name);
        //var tmp = component.get("v.selectedContracts");
        //tmp.push(contractId);
        console.log("selectedContracts:" + tmp);
        component.set("v.selectedContracts", tmp);

        //this.hasCurrencyMisMatch(component, event);
        this.setCurrencyMisMatch(component, event);

        // NOT WORKING
        //resultCmp = component.find("basline-select-result12");
        //console.log("resultCmp: " + resultCmp);
        //resultCmp.set("v.value", tmp);
        
        // fire the event...
        var contracts = tmp;
        var acc = component.get("v.acct");
        console.log('Inside listContracts, contracts:' + contracts + ', acc:' + acc + ', jsonContracts:' + JSON.stringify(tmp));

        var currencyMisMatch = component.get("v.isContractCurrencyMismatch");
        console.log("fireContractChangeEvent:currencyMisMatch=" + currencyMisMatch);
        this.fireContractChangeEvent(acc.Id, tmp, currencyMisMatch); //JSON.stringify(tmp)
  //       var appEvent = $A.get("e.c:onContractSelectionChange");
  //       appEvent.setParams({"contracts" : JSON.stringify(tmp)});        
        // appEvent.setParams({"accountId" : acc});

  //       appEvent.fire();
        
    }
})