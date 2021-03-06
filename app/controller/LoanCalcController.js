/**
 * Created by gonglixuan on 15/1/20.
 */
Ext.define('HLSCalculator.controller.LoanCalcController', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            calcbutton: '[name=calcButton]',
            downPercentageField: '[name=downPercentage]',
            downPaymentField: '[name=downPayment]',
            balloonPercentageField: '[name=balloonPercentage]',
            balloonField: '[name=balloon]',
            loancalcpage: 'loancalcpage'
        },
        control: {
            calcbutton: {
                tap: 'onTap'
            },
            downPercentageField: {
                blur: 'downPercentage2downPayment'
            },
            downPaymentField: {
                blur: 'downPayment2downPercentage'
            },
            balloonPercentageField: {
                blur: 'balloonPercentage2balloon'
            },
            balloonField: {
                blur: 'balloon2balloonPercentage'
            },
            loancalcpage: {
                show: 'onLoanCalcPageActive'
            }
        }
    },
    onTap: function (that, e, eOpts) {
        this.downPercentage2downPayment();
        this.balloonPercentage2balloon();
        var planName = Ext.getCmp("planCmp")._value.data.text,
            planValue = Ext.getCmp("planCmp").getValue(),
            downPercentage = Ext.getCmp("downPercentageCmp")._value,
            downPayment = Ext.getCmp("downPaymentCmp")._value,
            leaseTimes = parseInt(Ext.getCmp("leaseTimesCmp")._value),
            price = parseFloat(Ext.getCmp('leaseItemAmountCmp').getValue()),
            annualPayTimes = Ext.getCmp("annualPayTimesCmp").getValue(),
            payType = Ext.getCmp("payTypeCmp").getValue(),
            balloon = Ext.getCmp("balloonCmp").getValue(),
            isValid = HLSCalculator.utils.Common.isValid,
            calculate = HLSCalculator.utils.Common.calculate;

        if (downPercentage != '' && downPayment != '' && leaseTimes != '' && isValid(planValue)) {
            var rate = parseFloat(HLSCalculator.utils.Data.getIntRate())/parseFloat(annualPayTimes);
            var pv = parseInt(downPayment) - parseInt(price);
            var fv = price * parseFloat(HLSCalculator.utils.Data.getBalloonRatio() != "" ? HLSCalculator.utils.Data.getBalloonRatio() : '0');
            var monthlyPayment = calculate(rate, leaseTimes, pv, fv, parseInt(payType));
            //存入信息
            HLSCalculator.utils.Data.setPlanName(planName);
            HLSCalculator.utils.Data.setPrice(price);
            HLSCalculator.utils.Data.setDownPaymentRatio(downPercentage)
            HLSCalculator.utils.Data.setDownPayment(downPayment);
            HLSCalculator.utils.Data.setLeaseTimes(leaseTimes);
            HLSCalculator.utils.Data.setBalloon(balloon);
            HLSCalculator.utils.Data.setMonthlyPayment(monthlyPayment);
            //500毫秒后跳转下一页
            Ext.Function.createDelayed(
                function(){
                    Ext.getCmp('mainCmp').setActiveItem(3);
                }
                ,500)();
        }else{
            Ext.toast('请检查必输项', 2000);
        }
    },
    //金额带出比例
    payment2Percentage: function (paymentCmp, percentageCmp) {
        var payment = Ext.getCmp(paymentCmp),
            percentage = Ext.getCmp(percentageCmp),
            leaseItemAmount = Ext.getCmp("leaseItemAmountCmp"),
            leaseItemAmountValue,
            percentageValue = percentage.getValue(),
            paymentValue,
            format4payment = HLSCalculator.utils.Common.format4payment;
        if (payment && percentage && leaseItemAmount) {
            paymentValue = payment.getValue() ? payment.getValue() : '0';
            leaseItemAmountValue = leaseItemAmount.getValue();
            //校验
            if (percentageValue != format4payment(parseFloat(paymentValue) / parseFloat(leaseItemAmountValue))) {
                percentageValue = parseFloat(paymentValue) / parseFloat(leaseItemAmountValue);
                //console.log(downPercentageValue);
                percentage.setValue(format4payment(percentageValue));
                this.validation4Percent(percentageValue, paymentCmp, percentageCmp);
            }

        }
    },
    //首付金额带出首付比例
    downPayment2downPercentage: function (that, e, eOpts) {
        this.payment2Percentage("downPaymentCmp", "downPercentageCmp");

    },
    //尾款金额带出尾款比例
    balloon2balloonPercentage: function (that, e, eOpts) {
        this.payment2Percentage("balloonCmp", "balloonPercentageCmp");
    },
    //比例带出金额
    percentage2Payment: function (paymentCmp, percentageCmp) {
        var payment = Ext.getCmp(paymentCmp),
            percentage = Ext.getCmp(percentageCmp),
            leaseItemAmount = Ext.getCmp("leaseItemAmountCmp"),
            leaseItemAmountValue,
            percentageValue = percentage.getValue(),
            paymentValue,
            format4percent = HLSCalculator.utils.Common.format4percent;
        if (payment && percentage && leaseItemAmount) {
            percentageValue = percentage.getValue();
            leaseItemAmountValue = leaseItemAmount.getValue();
            if(percentageValue.charAt(percentageValue.length - 1) != '%'){
                percentageValue = HLSCalculator.utils.Common.format4payment(percentageValue);
            }
            //debugger;
            if (!this.validation4Percent(format4percent(percentageValue), paymentCmp, percentageCmp)) {
                return;
            };
            paymentValue = format4percent(percentageValue) * parseFloat(leaseItemAmountValue);
            payment.setValue(paymentValue.toFixed(2));
        }
    },
    //首付比例带出首付金额
    downPercentage2downPayment: function (that, e, eOpts) {
        this.percentage2Payment("downPaymentCmp", "downPercentageCmp");
    },
    //尾款比例带出尾款金额
    balloonPercentage2balloon: function (that, e, eOpts) {
        this.percentage2Payment("balloonCmp", "balloonPercentageCmp");
    },
    //校验比例上下限
    validation4Percent: function (percent, paymentCmp, percentageCmp) {
        var upperLimit = percentageCmp == "downPercentageCmp" ? parseFloat(HLSCalculator.utils.Data.getDownPaymentRatioValidation().upper_limit) : parseFloat(HLSCalculator.utils.Data.getBalloonRatioValidation().upper_limit),
            lowerLimit = percentageCmp == "downPercentageCmp" ? parseFloat(HLSCalculator.utils.Data.getDownPaymentRatioValidation().lower_limit) : parseFloat(HLSCalculator.utils.Data.getBalloonRatioValidation().lower_limit),
            validationResult,
            format4payment = HLSCalculator.utils.Common.format4payment;

        /*
         * validationResult:
         * 0:校验通过
         * 1:低于下限
         * 2:高于上限
         *
         * */
        if (!isNaN(upperLimit) && !isNaN(lowerLimit)) {
            if (lowerLimit <= percent && upperLimit >= percent) {
                validationResult = 0;
            } else if (lowerLimit > percent) {
                validationResult = 1;
            } else if (upperLimit < percent) {
                validationResult = 2;
            }
        } else if (isNaN(upperLimit) && !isNaN(lowerLimit)) {
            validationResult = lowerLimit <= percent ? 0 : 1;
        } else if (!isNaN(upperLimit) && isNaN(lowerLimit)) {
            validationResult = upperLimit >= percent ? 0 : 2;
        } else {
            validationResult = 0;
        }
        switch (validationResult) {
            case 0:
                //ok
                return true;
                break;
            case 1:
                //弹窗&清空
                percentageCmp == 'downPercentageCmp' ? Ext.toast('首付比例低于下限', 1500) : Ext.toast('大额尾款比例低于下限', 1500);
                Ext.getCmp(percentageCmp) ? Ext.getCmp(percentageCmp).setValue(format4payment(lowerLimit)) : null;
                this.downPercentage2downPayment(null, null, null);
                return false;
                break;
            case 2:
                percentageCmp == 'downPercentageCmp' ? Ext.toast('首付比例高于上限', 1500) : Ext.toast('大额尾款比例高于上限', 1500);
                Ext.getCmp(percentageCmp) ? Ext.getCmp(percentageCmp).setValue(format4payment(upperLimit)) : null;
                this.downPercentage2downPayment(null, null, null);
                return false;
                //弹窗&清空
                break;
            default :
                break;
        }
    },
    onLoanCalcPageActive: function (that, eOpts) {
        var model,
            planName,
            planIndex,
            downPaymentRatio,
            downPayment,
            leaseTimes,
            price,
            isValid = HLSCalculator.utils.Common.isValid;
        model = HLSCalculator.utils.Data.getModel();
        planName = HLSCalculator.utils.Data.getPlanName();
        planIndex = HLSCalculator.utils.Data.getPlanIndex();
        downPaymentRatio = HLSCalculator.utils.Data.getDownPaymentRatio();
        leaseTimes = HLSCalculator.utils.Data.getLeaseTimes();
        price = HLSCalculator.utils.Data.getPrice();
        if (downPayment) {
            downPayment = parseFloat(price) * (parseFloat(downPaymentRatio) > 1 || downPaymentRatio.charAt(downPaymentRatio.length - 1) == '%' ? parseFloat(downPaymentRatio) / 100 : parseFloat(downPaymentRatio));
        }

        if (model == "" || !isValid(model)) {
            Ext.Msg.alert('', '   请先选择车型。     ', function () {
                Ext.getCmp('mainCmp').setActiveItem(0);
            });
        }
        if (planName == "请先选择报价方案") {
            Ext.Msg.alert('', '   请先选择报价方案。     ', function () {
                Ext.getCmp('mainCmp').setActiveItem(1);
            });
        }
        Ext.getCmp("planCmp").setValue(planIndex);
        //需讨论
        if (Ext.getCmp('leaseItemAmountCmp')) {
            Ext.getCmp('leaseItemAmountCmp').setValue(price);
            this.balloonPercentage2balloon();
        }

        //设置标题
        Ext.getCmp('titleBarCmp').setTitle('贷款计算');
    }
})