/**
 * Created by gonglixuan on 14/12/20.
 */
Ext.define('HLSCalculator.store.BrandStore',{
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.LocalStorage'],
    xtype: 'brandstore',
    config: {
        storeId: 'brandstore',
        model: 'HLSCalculator.model.Brand',
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'brand'
        }
    }
});
