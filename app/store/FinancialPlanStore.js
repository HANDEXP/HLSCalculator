/**
 * Created by titengjiang on 14/12/21.
 */
Ext.define('HLSCalculator.store.FinancialPlanStore',{
    extend: 'Ext.data.Store',
    xtype: 'financialplanstore',
    config: {
        storeId: 'financialplanstore',
        fields: ['name','value'],
        data: [
            {name: '标准信贷', value: 'default'},
            {name: '弹性信贷', value: 'mercedes-benz'},
            {name: '尊享信贷', value: 'mercedes-benz'},
            {name: '玲珑轻松贷', value: 'mercedes-benz'},
            {name: '跃贷-标准信贷', value: 'mercedes-benz'},
            {name: '跃贷-弹性信贷', value: 'mercedes-benz'}




        ]

    }
});