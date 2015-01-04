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
        "annualRate": "13%",
        "annualPayItems": "",
        "nper": "",
        "fvRation": "10%",

        "payTypeRatio": "",
        "planName": ""

    },
    constructor: function(config) {
        this.initConfig(config);
    }
});