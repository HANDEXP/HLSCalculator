/**
 * Created by gonglixuan on 14/12/22.
 */
Ext.define('HLSCalculator.utils.Data',{
    singleton: true,
    config: {
        //选购车型
        brand: '',
        series: '',
        model: '',
        price: '0',
        //贷款
        monthlyPayment: '',
        //金融方案
        "downPaymentRatio": "",
        "downPayment": "0",
        "intRate": "",
        "annualPayItems": "",
        "leaseTimes": "",
        "balloonRatio": "",
        "balloon": "0",
        "payType": "",
        "planName": "请先选择报价方案",
        "planIndex": "-1",
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