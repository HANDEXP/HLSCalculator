/**
 * Created by gonglixuan on 14/12/21.
 */
Ext.define('HLSCalculator.store.PriceStore',{
    extend: 'Ext.data.Store',
    xtype: 'pricestore',
    config: {
        storeId: 'pricestore',
        fields: ['text', 'value'],
        data: [
            {text: '新选择品牌', value: 'default'},
            {text: '奔驰', value: 'mercedes-benz'}
        ]
    }
});