/**
 * Created by gonglixuan on 14/12/25.
 */
Ext.define('HLSCalculator.model.Pic',{
    extend: 'Ext.data.Model',
    requires: ['Ext.data.identifier.Uuid'],
    config: {
        idProperty: 'id',
        identifier: {
            type: 'uuid',
            prefix: 'identifier_'
        },
        fields: [{
            name: 'pic_id'
        },{
            name: 'desc'
        },{
            name: 'base64'
        }]
    }
})