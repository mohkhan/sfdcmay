<aura:application extends="force:slds">
    
    <!-- Pure HTML and SLDS Grid -->
    <div class="slds-text-heading--large slds-p-around--small">Pure HTML and SLDS Grid</div>
    <div class="slds-grid slds-wrap">
        <div class="slds-p-around--small slds-size--1-of-1">1</div>
        <div class="slds-p-around--small slds-size--1-of-2 slds-medium-size--5-of-6 slds-large-size--8-of-12">2</div>
        <div class="slds-p-around--small slds-size--1-of-2 slds-medium-size--1-of-6 slds-large-size--4-of-12">3</div>
        <div class="slds-p-around--small slds-size--1-of-1 slds-medium-size--1-of-2 slds-large-size--1-of-3">4</div>
        <div class="slds-p-around--small slds-size--1-of-1 slds-medium-size--1-of-2 slds-large-size--1-of-3">5</div>
        <div class="slds-size--1-of-1 slds-large-size--1-of-3">
            <div class="slds-grid slds-wrap">
                <div class="slds-p-around--small slds-size--1-of-2 slds-medium-size--1-of-1 slds-large-size--1-of-2">6</div>
                <div class="slds-p-around--small slds-size--1-of-2 slds-medium-size--1-of-1 slds-large-size--1-of-2">7</div>
            </div>
        </div>
    </div>
    
    <!-- Lightning Layout and LayoutItem Components -->
    <div class="slds-text-heading--large slds-p-around--small slds-m-top--large">Lightning Layout and LayoutItem Components</div>
    <lightning:layout horizontalAlign="spread" multipleRows="true">
        <lightning:layoutItem padding="around-small" flexibility="grow" size="12">1</lightning:layoutItem>
        <lightning:layoutItem padding="around-small" flexibility="grow" size="8" mediumDeviceSize="10" largeDeviceSize="8">2</lightning:layoutItem>
        <lightning:layoutItem padding="around-small" flexibility="grow" size="4" mediumDeviceSize="2" largeDeviceSize="4">3</lightning:layoutItem>
        <lightning:layoutItem padding="around-small" flexibility="grow" size="4" mediumDeviceSize="6" largeDeviceSize="4">4</lightning:layoutItem>
        <lightning:layoutItem padding="around-small" flexibility="grow" size="4" mediumDeviceSize="6" largeDeviceSize="4">5</lightning:layoutItem>
        <lightning:layoutItem flexibility="grow" size="12" largeDeviceSize="4">
        	<lightning:layout horizontalAlign="spread" multipleRows="true">
                <lightning:layoutItem padding="around-small" flexibility="grow" size="6" mediumDeviceSize="12" largeDeviceSize="6">6</lightning:layoutItem>
                <lightning:layoutItem padding="around-small" flexibility="grow" size="6" mediumDeviceSize="12" largeDeviceSize="6">7</lightning:layoutItem>
            </lightning:layout>
        </lightning:layoutItem>
    </lightning:layout>
    
</aura:application>