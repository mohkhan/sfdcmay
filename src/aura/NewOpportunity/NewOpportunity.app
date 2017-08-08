<aura:application implements="force:appHostable,flexipage:availableForAllPageTypes,flexipage:availableForRecordHome,force:hasRecordId" extends="force:slds">
	<label class="slds-radio">   
         <ui:inputRadio aura:id="radios" label="" name="items" change="{!c.itemSelected}" />
         <span class="slds-radio--faux"></span>
         <span class="slds-assistive-text">Select Row</span>
   	</label>
    <br/>
    <div aura:id="header">
        <c:SF1_NewOpportunityAccountSearch />
    </div>
    <div>
	    <c:OpptyTypeSelection />
    </div>
    <br/>
    <c:SF1_SearchAccount />
</aura:application>