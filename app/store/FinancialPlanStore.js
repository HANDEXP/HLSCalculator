/**
 * Created by titengjiang on 14/12/21.
 */
Ext.define('HLSCalculator.store.FinancialPlanStore',{
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.LocalStorage'],
    xtype: 'financialplanstore',
    config: {
        storeId: 'financialplanstore',
        model: 'HLSCalculator.model.FinancialPlan',
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'finalcialplan'
        }


    }
});