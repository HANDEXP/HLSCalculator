/**
 * Created by gonglixuan on 14/12/19.
 */
Ext.define('HLSCalculator.view.SelectAutoPage', {
    extend: 'Ext.Container',
    xtype: 'selectautopage',
    config: {
        id: 'selectautopage',
        items: [{
            xtype: 'fieldset',
            style: 'margin: .5em .5em .5em;',
            items: [
                {
                    xtype: 'selectfield',
                    id: 'brandSelectFieldCmp',
                    label: '品牌',
                    store: 'brandstore',
                    displayField: 'value_name',
                    valueField: 'value_code',
                    listeners: {
                        change: function (selectfield, newValue, oldValue, eOpts) {
                            var store = Ext.getStore('seriesstore'),
                                isValid = HLSCalculator.utils.Common.isValid,
                                brandId = parseInt(newValue);
                            store.filter("brand_id",new RegExp("-1|" + brandId));
                            Ext.getCmp('seriesSelectFieldCmp').setStore(store);
                            if (isValid(selectfield._value.data.value_code)) {
                                HLSCalculator.utils.Data.setBrand(selectfield._value.data.value_name)
                            }
                        }
                    }
                }, {
                    xtype: 'selectfield',
                    id: 'seriesSelectFieldCmp',
                    label: '车系',
                    store: 'seriesstore',
                    displayField: 'value_name',
                    valueField: 'value_code',
                    listeners: {
                        change: function (selectfield, newValue, oldValue, eOpts) {
                            var store = Ext.getStore('modelstore'),
                                isValid = HLSCalculator.utils.Common.isValid,
                                seriesId = parseInt(newValue);
                            store.filter("series_id",new RegExp("-1|" + seriesId))
                            Ext.getCmp('modelSelectFieldCmp').setStore(store);
                            if (isValid(selectfield._value.data.value_code)) {
                                HLSCalculator.utils.Data.setSeries(selectfield._value.data.value_name)
                            }
                        }
                    }
                }, {
                    xtype: 'selectfield',
                    id: 'modelSelectFieldCmp',
                    label: '车型',
                    store: 'modelstore',
                    displayField: 'value_name',
                    valueField: 'value_code',
                    listeners: {
                        change: function (selectfield, newValue, oldValue, eOpts) {
                            //同步初始化时跳过
                            if (oldValue == null) {
                                return;
                            }
                            var imageCmp,
                                seriesValue,
                                base64,
                                string,
                                isValid = HLSCalculator.utils.Common.isValid;
                            imageCmp = Ext.getCmp('imageCmp');
                            seriesValue = Ext.getCmp('seriesSelectFieldCmp').getValue();
                            //换图片
                            //seriesValue == 'default' ? null : imageCmp.setSrc('resources/images/' + seriesValue.split('-')[1].toUpperCase() + '.jpg')
                            base64 = Ext.getStore('picstore').findRecord('pic_code', Ext.getCmp('seriesSelectFieldCmp')._value.data.pic_code).data.app_picture;
                            imageCmp.setSrc(base64 != '' ? base64 : '#');
                            //显示报价和车型号
                            selectfield._value.data.guide_price == '' ? Ext.getCmp('priceLabelCmp').setHtml('厂商指导价：暂无') : Ext.getCmp('priceLabelCmp').setHtml("厂商指导价：" + '¥ ' + HLSCalculator.utils.Common.format4price(selectfield._value.data.guide_price));
                            selectfield._value.data.value_code == '-1' ? Ext.getCmp('modelLabelCmp').setHtml('请选择车系和车型') : Ext.getCmp('modelLabelCmp').setHtml([Ext.getCmp('brandSelectFieldCmp')._value.data.value_name, selectfield._value.data.value_name].join(' '));
                            ////存入信息
                            HLSCalculator.utils.Data.setModel(selectfield._value.data.value_name);
                            HLSCalculator.utils.Data.setPrice(HLSCalculator.utils.Common.float4price(selectfield._value.data.guide_price));
                            string = [HLSCalculator.utils.Data.getBrand(), HLSCalculator.utils.Data.getModel()].join(' ');
                            //带出车型和厂商指导价

                            if (isValid(HLSCalculator.utils.Data.getPrice())) {
                                Ext.getCmp('autoTypeCmp').setValue(string);
                                Ext.Function.createDelayed(
                                    function () {
                                        //Ext.getCmp('mainCmp').setActiveItem(1);
                                    }
                                    , 1200)();
                            } else {
                                Ext.getCmp('autoTypeCmp').setValue('请先选择车系和车型');
                            }

                        }
                    }
                }
            ]
        }, {
            xtype: 'label',
            id: 'modelLabelCmp',
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