/**
 * Created by titengjiang on 14/12/29.
 */
Ext.define('HLSCalculator.model.FinancialPlan',{
    extend: 'Ext.data.Model',
    requires: ['Ext.data.identifier.Uuid'],
    config: {
        idProperty: 'id',
        identifier: 'uuid',
        ////旧格式
        //fields: ['price_list','downpayment_ratio','annual_rate',
        //         'annual_pay_items' , 'nper','fv_ratio','pay_type_ratio',
        //          'plan_name','plan_title','plan_desc','plan_pic'
        //]
        //新格式
        fields:[
            {name: 'code',type: 'object'},
            {name: 'description',type: 'object'},
            {name: 'app_description',type: 'object'},
            {name: 'pic_code',type: 'object'},
            {name: 'lease_item_amount',type: 'object'},
            {name: 'down_payment_ratio',type: 'object'},
            {name: 'down_payment',type: 'object'},
            {name: 'int_rate',type: 'object'},
            {name: 'annual_pay_times',type: 'object'},
            {name: 'lease_times',type: 'object'},
            {name: 'balloon_ratio',type: 'object'},
            {name: 'balloon',type: 'object'},
            {name: 'pay_type',type: 'object'},
            {name: 'store',type: 'object'}
        ]
    }
});