/**
 * Created by gonglixuan on 14/12/19.
 */
Ext.define('HLSCalculator.view.SelectAutoPage', {
    extend: 'Ext.Container',
    xtype: 'selectautopage',
    config: {
        items: [{
            xtype: 'fieldset',
            style: 'margin: .5em .5em .5em;',
            items: [
                {
                    xtype: 'selectfield',
                    id: 'brandSelectFieldCmp',
                    label: '品牌',
                    placeHolder: '请选择品牌',
                    store: 'brandstore',
                    listeners: {
                        change: function (selectfield, newValue, oldValue, eOpts) {
                            var store = Ext.getStore('seriesstore');
                            store.setFilters({
                                property: "brand",
                                value: new RegExp("default|" + newValue)
                            });
                            store.load();
                            var cmp = Ext.getCmp('seriesSelectFieldCmp');
                            cmp.setStore(store);
                            if (HLSCalculator.utils.Common.isValid(selectfield._value.data.text)) {
                                HLSCalculator.utils.Data.setBrand(selectfield._value.data.text)
                            }
                        }
                    }
                }, {
                    xtype: 'selectfield',
                    id: 'seriesSelectFieldCmp',
                    label: '车系',
                    store: 'seriesstore',
                    listeners: {
                        change: function (selectfield, newValue, oldValue, eOpts) {
                            var store = Ext.getStore('typestore');
                            store.setFilters({
                                property: "series",
                                value: new RegExp("default|" + newValue)
                            });
                            store.load();
                            var cmp = Ext.getCmp('typeSelectFieldCmp');
                            cmp.setStore(store);
                            //Ext.Msg.alert('chance', '你选择了: ' + Ext.JSON.encode(newValue));
                        }
                    }
                }, {
                    xtype: 'selectfield',
                    id: 'typeSelectFieldCmp',
                    label: '车型',
                    store: 'typestore',
                    listeners: {
                        change: function (selectfield, newValue, oldValue, eOpts) {
                            var imageCmp = Ext.getCmp('imageCmp');
                            var seriesValue = Ext.getCmp('seriesSelectFieldCmp').getValue();
                            //换图片
                            seriesValue == 'default' ? null : imageCmp.setSrc('resources/images/' + seriesValue.split('-')[1].toUpperCase() + '.jpg')
                            //显示报价和车型号
                            selectfield._value.data.price == '' ? Ext.getCmp('priceLabelCmp').setHtml('厂商指导价：暂无') : Ext.getCmp('priceLabelCmp').setHtml("厂商指导价：" + '¥ ' + HLSCalculator.utils.Common.format4price(selectfield._value.data.price));
                            selectfield._value.data.value == 'default' ? Ext.getCmp('typeLabelCmp').setHtml('请选择车系和车型') : Ext.getCmp('typeLabelCmp').setHtml([Ext.getCmp('brandSelectFieldCmp')._value.data.text, selectfield._value.data.text].join(' '));
                            //debugger;
                            //存入信息
                            HLSCalculator.utils.Data.setSeries(selectfield._value.data.series);
                            HLSCalculator.utils.Data.setType(selectfield._value.data.text);
                            HLSCalculator.utils.Data.setPrice(selectfield._value.data.price);
                            var string = [HLSCalculator.utils.Data.getBrand(), HLSCalculator.utils.Data.getType()].join(' ');
                            //带出车型和厂商指导价
                            Ext.getCmp('guidingPriceCmp').setValue(HLSCalculator.utils.Common.format4price(HLSCalculator.utils.Data.getPrice()));
                            if(HLSCalculator.utils.Common.isValid(HLSCalculator.utils.Data.getPrice())){
                                Ext.getCmp('autoTypeCmp').setValue(string);
                                Ext.Function.createDelayed(
                                    function(){
                                        Ext.getCmp('mainCmp').setActiveItem(3);
                                    }
                                ,1200)();
                            }else{
                                Ext.getCmp('autoTypeCmp').setValue('请先选择车系和车型');
                            }

                        }
                    }
                }
            ]
        }, {
            xtype: 'label',
            id: 'typeLabelCmp',
            style: 'text-align: center;',
            html: '  '
        }, {
            xtype: 'image',
            id: 'imageCmp',
            src: '',
            style: 'margin: 0 auto 0 auto;max-width: 100%;background: center no-repeat;',
            width: '100%',
            height: '45%'
        }, {
            xtype: 'label',
            id: 'priceLabelCmp',
            style: 'text-align: center;',
            html: '   '
        }]
    }
}, function () {
    console.log('SelectAutoPage is ready.');
});