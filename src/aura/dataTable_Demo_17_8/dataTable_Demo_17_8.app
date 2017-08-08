<aura:application extends="force:slds">
   <div class="slds" style="padding:10px">
    <!--c:DataTableV2 /-->
    <c:DataTableV2 object="Merge_Contract_Header__c"
             columnfields="Original_Contract_Id__c, Parent_Contract__c, Order_Id__c, Currency__c, Parent_Account_Name__c, Solution_Set__c, Effective_End_Date__c, Effective_Start_Date__c"
             whereclause = "Account_Name__c='001Q0000013j1R6IAI' AND Active__c = true AND Effective_End_Date__c >= LAST_N_MONTHS:2 AND Contract_Product_Count__c > 0"
	/>

    </div>
</aura:application>
<!--columnfields="Id, Name, Contract_Type__c, Parent_Contract__c, Parent_Contract__r.Name, Order_Id__c, Parent_Account_Name__c,Currency__c,Solution_Set__c,Effective_Start_Date__c, CurrencyIsoCode, Account_Name__c,Account_Name__r.Id, Account_Name__r.Name , Active__c,Effective_End_Date__c , Original_Contract_Id__c,Opportunity_Name__r.currencyIsoCode,Opportunity_Name__r.Deal_Type__c,Opportunity_Name__r.Partner_Involved__c,Contract_Product_Count__c"-->