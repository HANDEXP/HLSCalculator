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
        "downPaymentRatio": "20%",
        "annualRate": "13%",
        "annualPayItems": "12",
        "nper": "24",
        "fvRation": "10%",
        "payTypeRatio": "0%",
        "planName": "标准信贷"

    },
    constructor: function(config) {
        this.initConfig(config);
    }
});