/**
 * Created by gonglixuan on 14/12/20.
 */
Ext.define('HLSCalculator.store.SeriesStore',{
    extend: 'Ext.data.Store',
    xtype: 'seriesstore',
    config: {
        storeId: 'seriesstore',
        fields: ['text','value','brand'],
        data: [
            {text: '请选择车系', value: 'default' ,brand: 'default'},
            {text: 'C级', value: 'series-c' ,brand: 'mercedes-benz'},
            {text: 'E级', value: 'series-e' ,brand: 'mercedes-benz'},
            {text: 'GLK级', value: 'series-glk' ,brand: 'mercedes-benz'},
            {text: 'A级', value: 'series-a' ,brand: 'mercedes-benz'},
            {text: 'B级', value: 'series-b' ,brand: 'mercedes-benz'},
            {text: 'CLA级', value: 'series-cla' ,brand: 'mercedes-benz'}
        ],
        filters: [
            {
                property: "value",
                value: 'default'
            }
        ]
    }


});