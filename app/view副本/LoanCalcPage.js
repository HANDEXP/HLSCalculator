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
                    id: 'downPercentageCmp',
                    labelWidth: '8em',
                    name: 'downPercentage',
                    labelCls: 'calc-item',
                    listeners: {
                        change: function(that,newValue,oldValue,eOpts ){

                        }
                    }
                },{
                    xtype: 'textfield',
                    label: '按首付款金额',
                    id: 'downPaymentCmp',
                    labelWidth: '8em',
                    name: 'downPayment',
                    labelCls: 'calc-item',
                    component: {xtype: 'input', type: 'number', fastFocus: true},
                    listeners: {
                        change: function(that,newValue,oldValue,eOpts ){
                            if(!HLSCalculator.utils.Common.isValid(newValue)){
                                return;
                            }
                            var downPercentageValue = newValue / HLSCalculator.utils.Data.getPrice();
                            if(!isFinite(downPercentageValue)){
                                Ext.toast(
                                    {
                                        message: '请先选择车型',
                                        timeout: 1000,
                                        listeners:
                                        {
                                            hide: function(that,eOpts){
                                                Ext.getCmp('mainCmp').setActiveItem(0)
                                            }
                                        }
                                    }
                                );
                                return;
                            }
                            if(downPercentageValue > 1){
                                Ext.toast('首付金额超过购车全款。');
                                newValue = parseInt(HLSCalculator.utils.Data.getPrice());
                                //that.setValue(newValue);
                                downPercentageValue = 1;
                            }
                            //设置按首付款比例
                            Ext.getCmp('downPercentageCmp').setValue(HLSCalculator.utils.Common.format4payment(downPercentageValue));
                            //设置按首付款金额
                            //debugger;
                            that.setValue(newValue);
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