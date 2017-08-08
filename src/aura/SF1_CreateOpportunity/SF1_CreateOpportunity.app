<!-- SF1_CreateOpportunity -->
<aura:application implements="force:appHostable" access="global" extends="force:slds">        
    <div aura:id="header-section">
        <c:SF1_PageHeader />
        <!-- end -->
    </div> 
	<div aura:id="content-section">
        <c:SF1_AccountLookupCustom />
        <c:SF1_ContractBaselineSelection />
        <!--c:SF1_SearchAccount / OLD ONE--> 
        <c:SF1_ListContracts />
        <c:SF1_CurrencySelection />
        <!-- OLD ONE WITH CARD VIEW  c:SF1_ListOpportunities /-->
    	<c:SF1_ListOppty />
        <!-- c:BaseLineRadioBtns -->
            <!-- flow-1-w/baseline-->
                <!-- c:SF1_ContractList-->
                <!-- c:SF1_OpptyCurrencyPick-->
                <!-- c:SF1_OpenOpportunities-->        
                <!-- Create Opportunity Btn-->
            <!-- flow 1 end -->
        	<!-- flow-2-w/o baseline-->
                <!-- c:SF1_OpenOpportunities-->        
                <!-- Skip New Oppty Btn-->
            <!-- flow 2 end -->
        <!-- BaseLineRadioBtns end -->
        <!-- end -->
    </div>
</aura:application>