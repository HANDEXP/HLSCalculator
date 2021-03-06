/**
 * Created by gonglixuan on 14/12/25.
 */
Ext.define('HLSCalculator.model.Series',{
    extend: 'Ext.data.Model',
    requires: ['Ext.data.association.BelongsTo','Ext.data.association.HasMany','Ext.data.identifier.Uuid'],
    config: {
        idProperty: 'id',
        identifier: {
            type: 'uuid',
            prefix: 'identifier_'
        },
        /* 旧格式 */
        //fields: [{
        //    name: 'series_id'
        //},{
        //    name: 'text'
        //},{
        //    name: 'value'
        //},{
        //    name: 'brand_id',
        //    type: 'int'
        //}],
        belongsTo: {
            model: 'HLSCalculator.model.Brand'
        },
        //hasMany: {
        //    model: 'HLSCalculator.model.Type',
        //    name: 'type',
        //    foreignKey: 'type_id'
        //}
        /* 新格式 */
        fields: [{
            name: 'value_code'
        },{
            name: 'value_name'
        },{
            name: 'series_code'
        },{
            name: 'brand_id',
            type: 'int'
        },{
            name: 'pic_code'
        }]
    }
})