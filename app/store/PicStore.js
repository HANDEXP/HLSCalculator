/**
 * Created by gonglixuan on 14/12/20.
 */
Ext.define('HLSCalculator.store.PicStore',{
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.LocalStorage'],
    xtype: 'picstore',
    config: {
        storeId: 'picstore',
        model: 'HLSCalculator.model.Pic',
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
            id: 'pic'
        }
    }
});
