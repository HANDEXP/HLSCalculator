/**
 * Created by gonglixuan on 14/12/19.
 */
Ext.define('HLSCalculator.view.LoanCalcPage', {
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
                }, {
                    xtype: 'selectfield',
                    label: '',
                    options: [
                        {text: '标准信贷', value: 'first'},
                        {text: 'Second Option', value: 'second'},
                        {text: 'Third Option', value: 'third'}
                    ]
                }, {
                    xtype: 'textfield',
                    id: 'guidingPriceCmp',
                    label: '市场指导价格',
                    labelWidth: '8em',
                    name: 'guidingPrice',
                    labelCls: 'calc-item'
                }, {
                    xtype: 'textfield',
                    label: '按首付款比例',
                    id: 'downPercentageCmp',
                    labelWidth: '8em',
                    name: 'downPercentage',
                    labelCls: 'calc-item',
                    listeners: {
                        blur: function (that, e, eOpts) {
                            var newValue = that.getValue();
                            if (!HLSCalculator.utils.Common.isValid(newValue)) {
                                return;
                            }
                            if (parseFloat(newValue) > 1 && newValue.charAt(newValue.length - 1) != '%'){
                                Ext.Msg.alert('错误', '   首付款比例必须是小数或者百分数。     ', Ext.emptyFn)
                                return;
                            }
                            var downPayment = parseFloat(HLSCalculator.utils.Data.getPrice()) * (parseFloat(newValue) > 1 || newValue.charAt(newValue.length - 1) == '%' ? parseFloat(newValue) / 100 : parseFloat(newValue));
                            console.log(downPayment);
                            Ext.getCmp('downPaymentCmp').setValue(downPayment);

                        }
                    }
                }, {
                    xtype: 'textfield',
                    label: '按首付款金额',
                    id: 'downPaymentCmp',
                    labelWidth: '8em',
                    name: 'downPayment',
                    labelCls: 'calc-item',
                    component: {xtype: 'input', type: 'number', fastFocus: true},
                    listeners: {
                        blur: function (that, e, eOpts) {
                            var newValue = that.getValue();
                            if (!HLSCalculator.utils.Common.isValid(newValue)) {
                                return;
                            }
                            var downPercentageValue = newValue / HLSCalculator.utils.Data.getPrice();
                            if (!isFinite(downPercentageValue)) {
                                Ext.toast(
                                    {
                                        message: '请先选择车型',
                                        timeout: 1000,
                                        listeners: {
                                            hide: function (that, eOpts) {
                                                Ext.getCmp('mainCmp').setActiveItem(0)
                                            }
                                        }
                                    }
                                );
                                return;
                            }
                            if (downPercentageValue > 1) {
                                Ext.toast('首付金额超过购车全款。');
                                newValue = parseInt(HLSCalculator.utils.Data.getPrice());
                                downPercentageValue = 1;
                            }
                            //设置按首付款比例
                            Ext.getCmp('downPercentageCmp').setValue(HLSCalculator.utils.Common.format4payment(downPercentageValue));
                            //设置按首付款金额
                            that.setValue(newValue);
                        }
                    }
                }, {
                    xtype: 'textfield',
                    label: '贷款期限',
                    id: 'nperCmp',
                    labelWidth: '8em',
                    name: 'termOfTheLoan',
                    labelCls: 'calc-item',
                    component: {xtype: 'input', type: 'number', fastFocus: true}
                }
            ]
        }, {
            xtype: 'button',
            text: '计算',
            ui: 'action',
            style: 'margin: 1.5em 3.5em 0 3.5em;',
            listeners: {
                tap: function (that, e, eOpts) {
                    var downPaymentRatio = Ext.getCmp("downPercentageCmp")._value;
                    var downPayment = Ext.getCmp("downPaymentCmp")._value;
                    var nper = Ext.getCmp("nperCmp")._value;
                    if (downPaymentRatio != '' || downPayment != '' || nperCmp != '') {
                        var rate = parseFloat(HLSCalculator.utils.Data.getAnnualRate())/100;
                        var pv = parseInt(HLSCalculator.utils.Data.getPrice()) - parseInt(downPayment);
                        var fv = pv * parseFloat(HLSCalculator.utils.Data.getFvRation()) / 100
                        var monthlyPayment = HLSCalculator.utils.Common.calculate(rate, nper, pv, fv, 0);
                        console.log(monthlyPayment);
                        HLSCalculator.utils.Data.setDownPayment(downPayment);

                        HLSCalculator.utils.Data.setNper(nper);
                        HLSCalculator.utils.Data.setMonthlyPayment(monthlyPayment);


                    }
                }
            }
        }
        ]
    },
    listeners: {
        activate: function (newActiveItem, that, oldActiveItem, eOpts) {

        }
    }
}, function () {

    console.log('LoanCalcPage is ready.');
});