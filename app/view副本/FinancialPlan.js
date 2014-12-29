Ext.define('HLSCalculator.view.FinancialPlan', {
    extend : 'Ext.NavigationView',
    xtype: 'financialplan',
    requires  :['HLSCalculator.view.FinancialPlanItem1'],
    config : {
        id : 'financialplanView',
        items : [{
            xtype : 'financialplanitem1'
        }]
    }
});
