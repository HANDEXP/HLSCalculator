/**
 * Created by gonglixuan on 14/12/19.
 */
Ext.define('HLSCalculator.view.LoanCalcPage', {
    extend: 'Ext.Container',
    xtype: 'loancalcpage',
    config: {
        id: 'loancalcpage',
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
                    xtype: 'textfield',
                    id: 'planCmp',
                    value: '请先选择金融方案'
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
                            var newValue = that.getValue(),
                                isValid = HLSCalculator.utils.Common.isValid,
                                getPrice = HLSCalculator.utils.Data.getPrice();
                            if (!isValid(newValue)) {
                                return;
                            }
                            if (parseFloat(newValue) > 1 && newValue.charAt(newValue.length - 1) != '%'){
                                Ext.Msg.alert('错误', '   首付款比例必须是小数或者百分数。     ', Ext.emptyFn)
                                return;
                            }
                            var downPayment = parseFloat(getPrice) * (parseFloat(newValue) > 1 || newValue.charAt(newValue.length - 1) == '%' ? parseFloat(newValue) / 100 : parseFloat(newValue));
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
                            var newValue,
                                downPercentageValue,
                                isValid = HLSCalculator.utils.Common.isValid,
                                getPrice = HLSCalculator.utils.Data.getPrice(),
                                format4payment = HLSCalculator.utils.Common.format4payment;
                            newValue = that.getValue();
                            if (!isValid(newValue)) {
                                return;
                            }
                            downPercentageValue = newValue / getPrice;
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
                                newValue = parseInt(getPrice);
                                downPercentageValue = 1;
                            }
                            //设置按首付款比例
                            Ext.getCmp('downPercentageCmp').setValue(format4payment(downPercentageValue));
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
            pressedCls: 'x-calc-button-pressing',
            text: '计算',
            id: 'testt',
            ui: '',
            //style: {
            //    'margin': '1.5em 0.6em 0px',
            //    'background': '#ffffff',
            //    'color': '#1985D0',
            //    'border': '1px solid #1985D0',
            //    'border-radius': '.2em',
            //    'font-size': '.9em',
            //    'padding': '.5em 0',
            //    '-webkit-tap-highlight-color': '#1985D0'
            //},
            cls: 'x-calc-button',
            listeners: {
                tap: function (that, e, eOpts) {

                    var planName = Ext.getCmp("planCmp")._value,
                        downPaymentRatio = Ext.getCmp("downPercentageCmp")._value,
                        downPayment = Ext.getCmp("downPaymentCmp")._value,
                        nper = parseInt(Ext.getCmp("nperCmp")._value),
                        price = parseInt(HLSCalculator.utils.Data.getPrice());
                        calculate = HLSCalculator.utils.Common.calculate;
                    if (downPaymentRatio != '' && downPayment != '' && nper != '') {
                        var rate = parseFloat(HLSCalculator.utils.Data.getAnnualRate())/100;
                        var pv = parseInt(downPayment) - parseInt(price);
                        var fv = price * parseFloat(HLSCalculator.utils.Data.getFvRation()) / 100
                        var monthlyPayment = calculate(rate, nper, pv, fv, 0);
                        console.log(monthlyPayment);
                        HLSCalculator.utils.Data.setPlanName(planName);
                        HLSCalculator.utils.Data.setDownPaymentRatio(downPaymentRatio)
                        HLSCalculator.utils.Data.setDownPayment(downPayment);
                        HLSCalculator.utils.Data.setNper(nper);
                        HLSCalculator.utils.Data.setMonthlyPayment(monthlyPayment);
                        //alert(monthlyPayment);

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