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
                //{
                //    xtype: 'button',
                //    id: 'sync',
                //    text: '同步'
                //
                //},
                {
                    xtype: 'selectfield',
                    id: 'brandSelectFieldCmp',
                    label: '品牌',
                    store: 'brandstore',
                    listeners: {
                        change: function (selectfield, newValue, oldValue, eOpts) {
                            var store = Ext.getStore('seriesstore'),
                                isValid = HLSCalculator.utils.Common.isValid;
                            store.setFilters({
                                property: "brand_id",
                                value: new RegExp("1|" + selectfield._value.data.brand_id)
                            });
                            store.load();
                            var cmp = Ext.getCmp('seriesSelectFieldCmp');
                            cmp.setStore(store);
                            if (isValid(selectfield._value.data.text)) {
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
                                property: "series_id",
                                value: new RegExp("1|" + selectfield._value.data.series_id)
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
                            //同步初始化时跳过
                            if(oldValue == null){
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
                            base64 =  Ext.getStore('picstore').findRecord('pic_id',selectfield._value.data.pic_id).data.base64;
                            imageCmp.setSrc(base64);
                            //显示报价和车型号
                            selectfield._value.data.price == '' ? Ext.getCmp('priceLabelCmp').setHtml('厂商指导价：暂无') : Ext.getCmp('priceLabelCmp').setHtml("厂商指导价：" + '¥ ' + HLSCalculator.utils.Common.format4price(selectfield._value.data.price));
                            selectfield._value.data.value == 'default' ? Ext.getCmp('typeLabelCmp').setHtml('请选择车系和车型') : Ext.getCmp('typeLabelCmp').setHtml([Ext.getCmp('brandSelectFieldCmp')._value.data.text, selectfield._value.data.text].join(' '));
                            //存入信息
                            HLSCalculator.utils.Data.setSeries(selectfield._value.data.series_id);
                            HLSCalculator.utils.Data.setType(selectfield._value.data.text);
                            HLSCalculator.utils.Data.setPrice(HLSCalculator.utils.Common.float4price(selectfield._value.data.price));
                            string = [HLSCalculator.utils.Data.getBrand(), HLSCalculator.utils.Data.getType()].join(' ');
                            //带出车型和厂商指导价

                            if(isValid(HLSCalculator.utils.Data.getPrice())){
                                Ext.getCmp('autoTypeCmp').setValue(string);
                                Ext.Function.createDelayed(
                                    function(){
                                        //Ext.getCmp('mainCmp').setActiveItem(1);
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