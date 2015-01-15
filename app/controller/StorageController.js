/**
 * Created by gonglixuan on 14/12/26.
 */
Ext.define('HLSCalculator.controller.StorageController', {
    extend: 'Ext.app.Controller',
    config: {
        models: ['Brand','Series','Type'],
        stores: ['BrandStore','SeriesStore','TypeStore'],
        refs: {
            selectautopage: 'selectautopage',
            financialcard: 'financialcard',
            quotepage: 'quotepage',
            loancalcpage: 'loancalcpage'
        },
        control: {
            selectautopage: {
                initialize: 'onSelectPageInit',
                show: 'onSelectPageActive'
            },
            financialcard: {
                show: 'onFinancialCardActive'
            },
            quotepage: {
                show: 'onQuotePageActive'
            },
            loancalcpage: {
                show: 'onLoanCalcPageActive'
            }


        }
    },
    onSelectPageInit: function() {
        this.syncFn();
    },
    onItemActivate: function(that, eOpts){
        //debugger;
        switch (that.title){
            case '报价':
                this.onQuotePageActive(that, eOpts);
                break;
            default :
                break;
        }
    },
    onFinancialCardActive: function(that, eOpts){
        Ext.getCmp('titleBarCmp').setTitle('金融方案');
    },
    onSelectPageActive: function(that, eOpts){
        Ext.getCmp('titleBarCmp').setTitle('选购车型');
    },
    onQuotePageActive: function(that, eOpts) {
        Ext.getCmp('titleBarCmp').setTitle('报价');
        //车型
        var type = [HLSCalculator.utils.Data.getBrand(), HLSCalculator.utils.Data.getType()].join(' ');
        Ext.getCmp("quotetype").setData({quoteItemTitle: "车型",quoteItemValue: type});
        //产品
        var plan = HLSCalculator.utils.Data.getPlanName();
        Ext.getCmp("quoteplan").setData({quoteItemTitle: "产品",quoteItemValue: plan});
        //车价
        var price = HLSCalculator.utils.Data.getPrice();
        Ext.getCmp("quoteprice").setData({quoteItemTitle: "车价",quoteItemValue: price});
        //首付比例
        var downPaymentRatio = HLSCalculator.utils.Data.getDownPaymentRatio();
        Ext.getCmp("quotedownpaymentratio").setData({quoteItemTitle: "首付比例",quoteItemValue: downPaymentRatio});
        //首付金额
        var downPayment = HLSCalculator.utils.Data.getDownPayment();
        Ext.getCmp("quotedownpayment").setData({quoteItemTitle: "首付金额",quoteItemValue: downPayment});
        //贷款金额
        var loanPayment = price - downPayment;
        Ext.getCmp("quoteloan").setData({quoteItemTitle: "贷款金额",quoteItemValue: loanPayment});
        //贷款期限
        var nper = HLSCalculator.utils.Data.getNper();
        Ext.getCmp("quotenper").setData({quoteItemTitle: "贷款期限",quoteItemValue: nper});
        //月供
        var monthlyPayment = HLSCalculator.utils.Data.getMonthlyPayment();
        Ext.getCmp("quotemonthlypayment").setData({quoteItemTitle: "月供",quoteItemValue: monthlyPayment});


        //Ext.Msg.alert();
    },
    onLoanCalcPageActive: function(that,eOpts) {
        var planName,
            downPaymentRatio,
            downPayment,
            nper,
            price;
        planName = HLSCalculator.utils.Data.getPlanName();
        downPaymentRatio = HLSCalculator.utils.Data.getDownPaymentRatio();
        nper = HLSCalculator.utils.Data.getNper();
        price = HLSCalculator.utils.Data.getPrice();
        downPayment = parseFloat(price) * (parseFloat(downPaymentRatio) > 1 || downPaymentRatio.charAt(downPaymentRatio.length - 1) == '%' ? parseFloat(downPaymentRatio) / 100 : parseFloat(downPaymentRatio));
        if(planName == "请先选择金融方案" || downPaymentRatio == "" || nper == ""){
            Ext.Msg.alert('', '   请先选择金融方案。     ', Ext.emptyFn);
        }
        Ext.getCmp("planCmp").setValue(planName);
        Ext.getCmp("downPercentageCmp").setValue(downPaymentRatio);
        Ext.getCmp("downPaymentCmp").setValue(downPayment);
        Ext.getCmp("nperCmp").setValue(nper);
        Ext.getCmp('guidingPriceCmp').setValue(HLSCalculator.utils.Common.format4price(price));
        //debugger;
        Ext.getCmp('titleBarCmp').setTitle('贷款计算器');
    },
    syncFn: function(){
        //financialPlanData.json

         Ext.Ajax.request({
            url: 'http://m.hand-china.com/dev/financialPlanData.json',
             success : function(response){
                 var json;
                 var text = response.responseText;
                 json = JSON.parse(text);
                 var finalcialStroe = Ext.getStore('financialplanstore');
                 finalcialStroe.removeAll();

                 for(var i=0;i< json.financialPlan.length;i++){
                     finalcialStroe.add(json.financialPlan[i]);

                 }
                 finalcialStroe.sync();


             },
             failure : function(response){
             }


         });


        Ext.Ajax.request({
            url: 'http://m.hand-china.com/dev/data.json',
            success: function(response){
                var text,
                    brandstore,
                    seriesstore,
                    typestore,
                    picstore,
                    json;
                text = response.responseText;
                json = JSON.parse(text);
                // process server response here
                //清空旧数据
                Ext.getStore('brandstore').removeAll();
                Ext.getStore('seriesstore').removeAll();
                Ext.getStore('typestore').removeAll();
                //本地化存brandstore
                brandstore = Ext.getStore('brandstore');
                brandstore.removeAll();
                for(var i = 0;i < json.brands.length; i++){
                    brandstore.add(json.brands[i]);
                }
                brandstore.sync();

                //本地化存seriesstore
                seriesstore = Ext.getStore('seriesstore');
                seriesstore.removeAll();
                for(var i =0;i < json.series.length; i++){
                    seriesstore.add(json.series[i]);

                }
                seriesstore.sync();

                //本地化存typesstore
                typestore = Ext.getStore('typestore');
                typestore.removeAll();
                for(var i = 0;i < json.types.length; i++){
                    typestore.add(json.types[i]);
                }
                //debugger;
                typestore.sync();
                //本地化存储图片
                picstore = Ext.getStore('picstore');
                picstore.removeAll();
                for(var i = 0;i < json.pics.length; i++){
                    picstore.add(json.pics[i]);
                }
                picstore.sync();
            },
            failure: function(response){
                console.log(response);
                //alert();
            }
        });

    },
    init: function () {
        console.log("onLine: "+ navigator.onLine);

    }
});

