/**
 * Created by gonglixuan on 14/12/20.
 */
Ext.define('HLSCalculator.store.SeriesStore',{
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.LocalStorage'],
    xtype: 'seriesstore',
    config: {
        storeId: 'seriesstore',
        filters: [
            {
                property: "value",
                value: 'default'
            }
        ],
        model: 'HLSCalculator.model.Series',
        autoLoad: true,
        //proxy: {
        //    type: 'ajax',
        //    reader: {
        //        type: 'json',
        //        rootProperty: 'series'
        //    },
        //    url: 'resources/data/data.json'
        //}
        proxy: {
            type: 'localstorage',
            id: 'series'
        }
    }
});