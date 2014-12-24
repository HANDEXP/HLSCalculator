/**
 * Created by gonglixuan on 14/12/20.
 */
Ext.define('HLSCalculator.store.BrandStore',{
    extend: 'Ext.data.Store',
    xtype: 'brandstore',
    config: {
        storeId: 'brandstore',
        fields: ['text','value'],
        data: [
            {text: '请选择品牌', value: 'default'},
            {text: '奔驰', value: 'mercedes-benz'}
        ]

    }
});