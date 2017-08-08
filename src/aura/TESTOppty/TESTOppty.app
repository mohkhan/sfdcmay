<aura:application extends="force:slds">
	<div class="slds">
        <!--c:DataGridTable /-->
        <div class="container">
            <!--aura:component-->
                <lightning:card >
                    <aura:set attribute="title">
                        Hello!
                    </aura:set>
                    <aura:set attribute="footer">
                        <lightning:badge label="footer"/>
                        Card Footer
                    </aura:set>
                    <aura:set attribute="actions">
                        <lightning:button label="New"/>
                    </aura:set>
                    <p class="slds-p-horizontal--small">
                        Card Body (custom component)
                        <c:SF1_CurrencySelection />
                    </p>
                </lightning:card>
            <lightning:card >
                    <aura:set attribute="title">
                        Hello!
                    </aura:set>
                    <aura:set attribute="footer">
                        <lightning:badge label="footer"/>
                        Card Footer
                    </aura:set>
                    <aura:set attribute="actions">
                        <lightning:button label="New"/>
                    </aura:set>
                    <p class="slds-p-horizontal--small">
                        Card Body (custom component)
                        <c:SF1_CurrencySelection />
                    </p>
                </lightning:card>
            <lightning:card >
                    <aura:set attribute="title">
                        Hello!
                    </aura:set>
                    <aura:set attribute="footer">
                        <lightning:badge label="footer"/>
                        Card Footer
                    </aura:set>
                    <aura:set attribute="actions">
                        <lightning:button label="New"/>
                    </aura:set>
                    <p class="slds-p-horizontal--small">
                        Card Body (custom component)
                        <c:SF1_CurrencySelection />
                    </p>
                </lightning:card>
            <!--/aura:component-->
        </div>
        <div class="container">
            <c:SF1_CurrencySelection />
        </div>
        
    </div>
</aura:application>