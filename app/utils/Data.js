/**
 * Created by gonglixuan on 14/12/22.
 */
Ext.define('HLSCalculator.utils.Data',{
    singleton: true,
    config: {
        //选购车型
        brand: '',
        series: '',
        type: '',
        price: '',
        //贷款
        downPercentage: '',
        downPayment: '',
        loan: '',
        period: '',
        monthlyPayment: '',
        //金融方案
        "downPaymentRatio": "",
        "downPayment": "",
        "intRate": "",
        "annualPayItems": "",
        "leaseTimes": "",
        "balloonRatio": "",
        "balloon": "",
        "payType": "",
        "planName": "请先选择报价方案",
        //上下限
        "downPaymentRatioValidation":{},
        "balloonRatioValidation":{},
        //报价方案索引
        "planOptions":[]

    },
    constructor: function(config) {
        this.initConfig(config);
    }
});