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
        /* 旧格式 */
        //fields: ['brand_id','text','value'],
        hasMany: {
            model: 'HLSCalculator.model.Series',
            name: 'series',
            foreignKey: 'brand_id'
        },
        /* 新格式 */
        fields: ['value_code','value_name','brand_code']
    }
});