/**
 * Created by titengjiang on 14/12/29.
 */
Ext.define('HLSCalculator.model.FinalcialPlan',{
    extend: 'Ext.data.Model',
    requires: ['Ext.data.identifier.Uuid'],
    config: {
        idProperty: 'id',
        identifier: 'uuid',

        fields: ['price_list','downpayment_ratio','annual_rate',
                 'annual_pay_items' , 'nper','fv_ratio','pay_type_ratio',
                  'plan_name','plan_title','plan_desc','plan_pic'
        ]
    }
});