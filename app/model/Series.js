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
        fields: [{
            name: 'series_id'
        },{
            name: 'text'
        },{
            name: 'value'
        },{
            name: 'brand_id',
            type: 'int'
        }],
        belongsTo: {
            model: 'HLSCalculator.model.Brand'
        },
        hasMany: {
            model: 'HLSCalculator.model.Type',
            name: 'type',
            foreignKey: 'type_id'
        }
    }
})