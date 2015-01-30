/**
 * Created by gonglixuan on 14/12/20.
 */
Ext.define('HLSCalculator.store.SeriesStore',{
    extend: 'Ext.data.Store',
    requires: ['Ext.data.proxy.LocalStorage'],
    xtype: 'seriesstore',
    config: {
        storeId: 'seriesstore',
        model: 'HLSCalculator.model.Series',
        autoLoad: true,
        proxy: {
            type: 'localstorage',
            id: 'series'
        }
    }
});