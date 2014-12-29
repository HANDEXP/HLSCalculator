/**
 * Created by gonglixuan on 14/12/20.
 */
Ext.define('HLSCalculator.store.TypeStore',{
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.LocalStorage'],
    xtype: 'typestore',
    config: {
        storeId: 'typestore',
        filters: [
            {
                property: "value",
                value: 'default'
            }
        ],
        model: 'HLSCalculator.model.Type',
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'type'
        }

    }
});