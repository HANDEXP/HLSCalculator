/**
 * Created by gonglixuan on 14/12/25.
 */
Ext.define('HLSCalculator.model.Model',{
    extend: 'Ext.data.Model',
    requires: ['Ext.data.association.BelongsTo','Ext.data.identifier.Uuid'],
    config: {
        idProperty: 'id',
        identifier: {
            type: 'uuid',
            prefix: 'identifier_'
        },
        /* 旧格式 */
        //fields: [{
        //    name: 'type_id'
        //},{
        //    name: 'text'
        //},{
        //    name: 'value'
        //},{
        //    name: 'series_id',
        //    type: 'int'
        //},{
        //    name: 'price'
        //},{
        //    name: 'pic_id'
        //}],
        //belongsTo: {
        //    model: 'HLSCalculator.model.Series'
        //}
        /* 新格式 */
        fields: [{
            name: 'value_code'
        },{
            name: 'value_name'
        },{
            name: 'series_id'
        },{
            name: 'guide_price',
            type: 'int'
        }]
    }
});