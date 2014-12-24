/**
 * Created by gonglixuan on 14/12/22.
 */
Ext.define('HLSCalculator.utils.Data',{
    singleton: true,
    config: {
        brand: '',
        series: '',
        type: '',
        price: '',
        downPercentage: '',
        downPayment: '',
        loan: '',
        period: '',
        monthlyPayment: ''
    },
    constructor: function(config) {
        this.initConfig(config);
    }
});