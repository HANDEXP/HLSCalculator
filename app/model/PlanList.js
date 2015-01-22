/**
 * Created by gonglixuan on 15/1/21.
 */
Ext.define("HLSCalculator.model.PlanList",{
    extend: 'Ext.data.Model',
    requires: ['Ext.data.identifier.Uuid'],
    config: {
        idProperty: 'id',
        identifier: 'uuid',
        fields: [
            {name:'index',type:'int'},
            {name:'planName',type:'string'}
        ]
    }
});