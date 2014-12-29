Ext.define('HLSCalculator.view.FinancialCard', {
    extend : 'Ext.Container',
    xtype: 'financialcard',
    requires:['HLSCalculator.view.FinancialPlanList','HLSCalculator.view.FinancialPlanItem'],
    config : {
        id : 'financialcard',
        layout:'card',
        items : [
            {
                xtype: 'financialplanlist'
            },{
                xtype: 'financialplanitem'
            }
        ]
    }
});
