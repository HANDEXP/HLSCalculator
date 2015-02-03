/**
 * Created by gonglixuan on 14/12/20.
 */
Ext.define('HLSCalculator.store.ModelStore',{
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.LocalStorage'],
    xtype: 'modelstore',
    config: {
        storeId: 'modelstore',
        model: 'HLSCalculator.model.Model',
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'type'
        }

    }
});