/**
 * Created by gonglixuan on 14/12/19.
 */
Ext.define('HLSCalculator.view.LoanCalcPage',{
    extend: 'Ext.Container',
    xtype: 'loancalcpage',
    config: {
        items: [{
            xtype: 'fieldset',
            style: 'margin: .5em .5em .5em;',
            items: [
                {
                    xtype: 'textfield',
                    id: 'autoTypeCmp',
                    name: 'autoType',
                    labelCls: 'calc-item',
                    disabled: true,
                    value: '请先选择车系和车型'
                    //value: HLSCalculator.utils.Data.getType();
                    //store: 'teststore'
                },{
                    xtype: 'selectfield',
                    label: '',
                    options: [
                        {text: '标准信贷', value: 'first'},
                        {text: 'Second Option', value: 'second'},
                        {text: 'Third Option', value: 'third'}
                    ]
                },{
                    xtype: 'textfield',
                    id: 'guidingPriceCmp',
                    label: '市场指导价格',
                    labelWidth: '8em',
                    name: 'guidingPrice',
                    labelCls: 'calc-item'
                },{
                    xtype: 'textfield',
                    label: '按首付款比例',
                    labelWidth: '8em',
                    name: 'downPercentage',
                    labelCls: 'calc-item'
                },{
                    xtype: 'textfield',
                    label: '按首付款金额',
                    labelWidth: '8em',
                    name: 'downPayment',
                    labelCls: 'calc-item',
                    //component: {xtype: 'input', type: 'number', fastFocus: true},
                    listeners: {
                        change: function(that,newValue,oldValue,eOpts ){
                            alert();
                        }
                    }
                },{
                    xtype: 'textfield',
                    label: '理想月供金额',
                    labelWidth: '8em',
                    name: 'idealMonthlyPayment',
                    labelCls: 'calc-item',
                    component: {xtype: 'input', type: 'number', fastFocus: true}
                },{
                    xtype: 'textfield',
                    label: '贷款期限',
                    labelWidth: '8em',
                    name: 'termOfTheLoan',
                    labelCls: 'calc-item',
                    component: {xtype: 'input', type: 'number', fastFocus: true}
                }
            ]
        },{
            xtype: 'button',
            text: '计算',
            ui: 'action',
            style: 'margin: 1.5em 3.5em 0 3.5em;'
        }]
    },
    listeners: {
        activate: function(newActiveItem,that,oldActiveItem,eOpts){

        }
    }
},function(){

    console.log('LoanCalcPage is ready.');
});