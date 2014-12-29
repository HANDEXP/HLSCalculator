/**
 * Created by gonglixuan on 14/12/25.
 */
Ext.define('HLSCalculator.model.Type',{
    extend: 'Ext.data.Model',
    requires: ['Ext.data.association.BelongsTo','Ext.data.identifier.Uuid'],
    config: {
        idProperty: 'id',
        identifier: {
            type: 'uuid',
            prefix: 'identifier_'
        },
        fields: [{
            name: 'type_id'
        },{
            name: 'text'
        },{
            name: 'value'
        },{
            name: 'series_id',
            type: 'int'
        },{
            name: 'price'
        },{
            name: 'pic_id'
        }],
        belongsTo: {
            model: 'HLSCalculator.model.Series'
        }
    }
});