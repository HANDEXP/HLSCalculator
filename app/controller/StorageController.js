/**
 * Created by gonglixuan on 14/12/26.
 */
Ext.define('HLSCalculator.controller.StorageController', {
    extend: 'Ext.app.Controller',
    config: {
        models: ['Brand', 'Series', 'Model','Pic'],
        stores: ['BrandStore', 'SeriesStore', 'ModelStore','PicStore'],
        refs: {
            selectautopage: 'selectautopage',
            quotepage: 'quotepage'
        },
        control: {
            selectautopage: {
                initialize: 'onSelectPageInit',
                show: 'onSelectPageActive'
            },
            quotepage: {
                show: 'onQuotePageActive'
            }
        }
    },
    onSelectPageInit: function () {
        this.syncData();
    },
    onItemActivate: function (that, eOpts) {
        switch (that.title) {
            case '报价':
                this.onQuotePageActive(that, eOpts);
                break;
            default :
                break;
        }
    },
    onSelectPageActive: function (that, eOpts) {
        Ext.getCmp('titleBarCmp').setTitle('选购车型');
    },
    onQuotePageActive: function (that, eOpts) {
        Ext.getCmp('titleBarCmp').setTitle('报价');
        //车型
        var model = [HLSCalculator.utils.Data.getBrand(), HLSCalculator.utils.Data.getModel().replace(/ /g,"")].join(' ');
        Ext.getCmp("quotemodel").setData({quoteItemTitle: "车型", quoteItemValue: model});
        //产品
        var plan = HLSCalculator.utils.Data.getPlanName();
        Ext.getCmp("quoteplan").setData({quoteItemTitle: "产品", quoteItemValue: plan});
        //车价
        var price = HLSCalculator.utils.Data.getPrice();
        Ext.getCmp("quoteprice").setData({quoteItemTitle: "车价", quoteItemValue: parseFloat(price).toFixed(2)});
        //首付比例
        var downPaymentRatio = HLSCalculator.utils.Data.getDownPaymentRatio();
        Ext.getCmp("quotedownpaymentratio").setData({quoteItemTitle: "首付比例", quoteItemValue: downPaymentRatio});
        //首付金额
        var downPayment = HLSCalculator.utils.Data.getDownPayment();
        Ext.getCmp("quotedownpayment").setData({quoteItemTitle: "首付金额", quoteItemValue: parseFloat(downPayment).toFixed(2)});
        //贷款金额
        var loanPayment = price - downPayment;
        Ext.getCmp("quoteloan").setData({quoteItemTitle: "贷款金额", quoteItemValue: parseFloat(loanPayment).toFixed(2)});
        //贷款期限
        var leaseTimes = HLSCalculator.utils.Data.getLeaseTimes();
        Ext.getCmp("quotenper").setData({quoteItemTitle: "贷款期限", quoteItemValue: leaseTimes});
        //尾款
        var balloon = HLSCalculator.utils.Data.getBalloon();
        Ext.getCmp("quoteballoon").setData({quoteItemTitle: "尾款", quoteItemValue: parseFloat(balloon).toFixed(2)});
        if(Ext.getCmp("balloonCmp")){
            Ext.getCmp("quoteballoon").setHidden(Ext.getCmp("balloonCmp").getHidden());
        }


        //月供
        var monthlyPayment = HLSCalculator.utils.Data.getMonthlyPayment();
        Ext.getCmp("quotemonthlypayment").setData({quoteItemTitle: "月供", quoteItemValue: monthlyPayment});
    },
    //同步数据，不包括图片
    syncData: function () {
        Ext.Ajax.request({
            //url: 'http://m.hand-china.com/dev/sample.json',
            url: 'http://61.155.20.214/lshdev/modules/price_app/app_price_list.svc',
            //url: 'sample.json',
            success: function (response) {
                var json, length,planOptions = [{"index":-1,"text":"请先选择报价方案"}],updateIcon;
                var text = response.responseText;
                json = JSON.parse(text).body;
                //debugger;
                var finalcialStroe = Ext.getStore('financialplanstore');
                finalcialStroe.removeAll();
                length = json.price_list.length;
                for (var i = 0; i < length; i++) {
                    finalcialStroe.add(json.price_list[i]);
                    planOptions.push({"index":i,"text":json.price_list[i].description.default_value});
                }
                HLSCalculator.utils.Data.setPlanOptions(planOptions);
                Ext.getCmp("planCmp").setOptions(HLSCalculator.utils.Data.getPlanOptions());
                finalcialStroe.sync();
                Ext.getDom('ext-element-68').innerHTML = "<div class=\"newUpdate\"></div>";
            },
            failure: function (response) {
                //debugger;
                var finalcialData = Ext.getStore('financialplanstore').getData().all,
                    length = finalcialData.length,
                    planOptions = [{"index":-1,"text":"请先选择报价方案"}];
                for(var i = 0;i < length; i++){
                    planOptions.push({"index":i,"text":finalcialData[i].data.description.default_value});
                }

                HLSCalculator.utils.Data.setPlanOptions(planOptions);
                Ext.getCmp("planCmp").setOptions(HLSCalculator.utils.Data.getPlanOptions());
            }


        });


        Ext.Ajax.request({
            //url: 'http://m.hand-china.com/dev/auto.json',
            //url: 'http://localhost:1841/auto.json',
            url: 'http://61.155.20.214/lshdev/modules/price_app/app_auto_data.svc',
            success: function (response) {
                var text,
                    brandstore,
                    seriesstore,
                    modelstore,
                    json;
                text = response.responseText;
                if(JSON.parse(text).head.code !== 'success'){
                    return;
                }
                json = JSON.parse(text).body;
                // process server response here
                //清空旧数据
                Ext.getStore('brandstore').removeAll();
                Ext.getStore('seriesstore').removeAll();
                Ext.getStore('modelstore').removeAll();

                //本地化存brandstore
                brandstore = Ext.getStore('brandstore');
                brandstore.add({"value_code":"-1","value_name":"请选择品牌","brand_code":"-1"});
                for (var i = 0; i < json.brands.length; i++) {
                    brandstore.add(json.brands[i]);
                }
                brandstore.sync();

                //本地化存seriesstore
                seriesstore = Ext.getStore('seriesstore');
                seriesstore.add({"value_code":"-1","value_name":"请选择车系","series_code":"-1","brand_id":"-1","app_picture":""});
                for (var i = 0; i < json.series.length; i++) {
                    seriesstore.add(json.series[i]);
                }
                seriesstore.sync();

                //本地化存modelstore
                modelstore = Ext.getStore('modelstore');
                modelstore.add({"value_code":"-1","value_name":"请选择车型","series_id":"-1","guide_price":"0"});
                for (var i = 0; i < json.models.length; i++) {
                    modelstore.add(json.models[i]);
                }
                modelstore.sync();

            },
            failure: function (response) {
                console.log(response);
            }
        });

        if(parseFloat(Ext.getStore('picstore').getData().length) == 0){
            //debugger;
            this.syncPic();
        }
    },
    //同步图片
    syncPic: function(){
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '同步数据...请稍等'
        });
        Ext.Ajax.request({
            url: 'http://61.155.20.214/lshdev/modules/price_app/app_picture.svc',
            //url: 'http://localhost:1841/app_picture.json',
            //url: 'http://m.hand-china.com/dev/app_picture.json',
            success: function(response){
                var text,
                    picstore,
                    json;

                text = response.responseText;
                if(JSON.parse(text).head.code !== 'success'){
                    return;
                }
                json = JSON.parse(text).body;
                //本地化存储图片
                picstore = Ext.getStore('picstore');
                picstore.removeAll();
                picstore.add({"pic_code":"","app_picture":""});
                for (var i = 0; i < json.pics.length; i++) {
                    picstore.add(json.pics[i]);
                }
                picstore.sync();
                Ext.Viewport.setMasked(false);
            },
            failure: function(response){
                console.log(response);
                Ext.Viewport.setMasked(false);
            }
        });

    },
    init: function () {
        console.log("onLine: " + navigator.onLine);

    }
});

