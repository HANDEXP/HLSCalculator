/**
 * Created by gonglixuan on 14/12/20.
 */
Ext.define('HLSCalculator.store.TypeStore',{
    extend: 'Ext.data.Store',
    xtype: 'typestore',
    config: {
        storeId: 'typestore',
        fields: ['text','value','series','price'],
        data: [
            {text: '请选择车型', value: 'default',series: 'default' ,price: ''},
            {text: '2015款 C 180 L', value: 'type-2015-c-180-l',series: 'series-c' ,price: '325800'},
            {text: '2015款 C 180 L 运动型', value: 'type-2015-c-180-l-sport',series: 'series-c' ,price: '325800'},
            {text: '2015款 E 180 L', value: 'type-2015-e-180-l',series: 'series-e' ,price: '398000'},
            {text: '2015款 E 200 L', value: 'type-2015-e-200-l',series: 'series-e' ,price: '398000'},
            {text: '2014款 GLK 200 标准型', value: 'type-2014-glk-200-standard',series: 'series-glk' ,price: '378000'},
            {text: '2015款 A 180', value: 'type-2015-a-180',series: 'series-a' ,price: '252000'}
        ],
        filters: [
            {
                property: "value",
                value: 'default'
            }
        ]

    }
});