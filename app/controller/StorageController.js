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
            main: 'main'
        },
        control: {
            selectautopage: {
                initialize: 'onSelectPageActivate'
            },
            main: {
                activeitemchange: 'onItemActivate'
            }
        }
    },
    onSelectPageActivate: function() {
        this.syncFn();
    },
    onItemActivate: function(newActiveItem, that, oldActiveItem, eOpts){
        //debugger;
        switch (that.title){
            case '报价':
                this.onQuotePageActive();
                break;
            default :
                break;
        }
    },
    onQuotePageActive: function() {
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
    syncFn: function(){
        var json;

        //financialPlanData.json
        // Ext.Ajax.request({
        //    url: 'financialPlanData.json',
        //     success : function(response){
        //         var text = response.responseText;
        //         alert(text);
        //
        //     },
        //     failure : function(response){
        //
        //     }
        //
        //
        // });


        Ext.Ajax.request({
            url: 'data.json',
            success: function(response){
                var text = response.responseText;
                json = eval("("+text+")");
                // process server response here
                //清空旧数据
                Ext.getStore('brandstore').removeAll();
                Ext.getStore('seriesstore').removeAll();
                Ext.getStore('typestore').removeAll();
                //本地化存brandstore
                var brandstore = Ext.getStore('brandstore');
                brandstore.removeAll();
                for(var i = 0;i < json.brands.length; i++){
                    brandstore.add(json.brands[i]);
                }
                brandstore.sync();

                //本地化存seriesstore
                var seriesstore = Ext.getStore('seriesstore');
                seriesstore.removeAll();
                for(var i =0;i < json.series.length; i++){
                    seriesstore.add(json.series[i]);

                }
                seriesstore.sync();

                //本地化存typesstore
                var typestore = Ext.getStore('typestore');
                typestore.removeAll();
                for(var i = 0;i < json.types.length; i++){
                    typestore.add(json.types[i]);
                }
                //debugger;
                typestore.sync();

                //本地化存储图片
                var picstore = Ext.getStore('picstore');
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

        //if(navigator.onLine){
        //    this.syncTap()
        //}else{
        //
        //}
    }
});

