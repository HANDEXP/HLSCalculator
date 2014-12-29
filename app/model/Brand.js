/**
 * Created by gonglixuan on 14/12/25.
 */
Ext.define('HLSCalculator.model.Brand',{
    extend: 'Ext.data.Model',
    requires: ['Ext.data.association.HasMany','Ext.data.identifier.Uuid'],
    config: {
        idProperty: 'id',
        identifier: {
            type: 'uuid',
            prefix: 'identifier_'
        },
        fields: ['brand_id','text','value'],
        hasMany: {
            model: 'HLSCalculator.model.Series',
            name: 'series',
            foreignKey: 'series_id'
        }
    }
});