/**
 * Created by titengjiang on 14/12/21.
 */
Ext.define('HLSCalculator.store.FinancialPlanStore',{
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.LocalStorage'],
    xtype: 'financialplanstore',
    config: {
        storeId: 'financialplanstore',
        model: 'HLSCalculator.model.FinalcialPlan',
        autoLoad: true,
        //proxy: {
        //    type: 'ajax',
        //    reader: {
        //        type: 'json',
        //        rootProperty: 'brands'
        //    },
        //    url: 'resources/data/data.json'
        //}
        proxy: {
            type: 'localstorage',
            id: 'finalcialplan'
        }


    }
});