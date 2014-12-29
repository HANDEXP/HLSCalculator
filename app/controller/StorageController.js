/**
 * Created by gonglixuan on 14/12/26.
 */
Ext.define('HLSCalculator.controller.StorageController', {
    extend: 'Ext.app.Controller',
    config: {
        models: ['Brand','Series','Type'],
        stores: ['BrandStore','SeriesStore','TypeStore'],
        refs: {
            selectautopage: 'selectautopage'
        },
        control: {
            selectautopage: {
                initialize: 'onSelectPageActivate'
            }
        }
    },
    onSelectPageActivate: function() {
        this.syncFn();
    },
    syncFn: function(){
        var json;

        //financialPlanData.json
         Ext.Ajax.request({
            url: 'financialPlanData.json',
             success : function(response){
                 var text = response.responseText;
                 alert(text);

             },
             failure : function(response){

             }


         });


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

