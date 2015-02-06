/**
 * Created by gonglixuan on 15/1/18.
 */
Ext.define('HLSCalculator.controller.FinancialPlanController', {
    extend: 'Ext.app.Controller',
    config: {
        models: ['FinancialPlan','HLSCalculator.model.ComboBox'],
        stores: ['FinancialPlanStore'],
        refs: {
            financialcard: 'financialcard',
            financialplanlist: 'financialplanlist',
            planField: '[name=plan]'
        },
        control: {
            financialcard: {
                show: 'onFinancialCardActive'
            },
            financialplanlist: {
                itemtap: 'onFinancialPlanItem'
            },
            planField: {
                change: 'onPlanChange'
            }
        }
    },
    onFinancialCardActive: function (that, eOpts) {
        Ext.getCmp('titleBarCmp').setTitle('报价方案');
        Ext.getDom('ext-element-68').innerHTML = "";
        //alert("screen.width:"+screen.width+"screen.height:"+screen.height);
    },
    onFinancialPlanItem: function (that, index, target, record, e) {
        var data = Ext.getStore('financialplanstore').getAt(index).data,
            base64;
        Ext.getCmp('planTitleCmp').set('html', data.description.default_value);
        Ext.getCmp('planDescCmp').set('html', data.app_description.default_value);
        //debugger;
        base64 = Ext.getStore('picstore').findRecord('pic_code', data.pic_code.default_value).data.app_picture;
        Ext.getCmp('planImgCmp').set('src',base64 != '' ? base64 : '#');
        //存报价方案数据
        HLSCalculator.utils.Data.setDownPaymentRatio(data.down_payment_ratio.default_value);
        HLSCalculator.utils.Data.setIntRate(data.int_rate.default_value);
        HLSCalculator.utils.Data.setAnnualPayItems(data.annual_pay_times.default_value);
        HLSCalculator.utils.Data.setLeaseTimes(data.lease_times.default_value);
        HLSCalculator.utils.Data.setBalloonRatio(data.balloon_ratio.default_value);
        HLSCalculator.utils.Data.setPayType(data.pay_type.default_value);
        HLSCalculator.utils.Data.setPlanName(data.description.default_value);
        HLSCalculator.utils.Data.setPlanIndex(index);

        //存上下线
        HLSCalculator.utils.Data.setDownPaymentRatioValidation({'upper_limit':data.down_payment_ratio.upper_limit,'lower_limit':data.down_payment_ratio.lower_limit});
        HLSCalculator.utils.Data.setBalloonRatioValidation({'upper_limit':data.balloon_ratio.upper_limit,'lower_limit':data.balloon_ratio.lower_limit});

        //删除旧界面&增加计算界面组件
        //车价
        this.addExtCmp(data.lease_item_amount,'leaseItemAmount');
        //首付比例
        this.addExtCmp(data.down_payment_ratio,'downPercentage');
        //首付款
        this.addExtCmp(data.down_payment,'downPayment');
        //年利率
        this.addExtCmp(data.int_rate,'intRate');
        //支付频率
        this.addExtCmp(data.annual_pay_times,'annualPayTimes');
        //期数
        this.addExtCmp(data.lease_times,'leaseTimes');
        //尾款比例
        this.addExtCmp(data.balloon_ratio,'balloonPercentage');
        //大额尾款
        this.addExtCmp(data.balloon,'balloon');
        //先付、后付
        this.addExtCmp(data.pay_type,'payType');
        Ext.getCmp('financialcard').setActiveItem(1);

    },
    /*
     * 动态增加field
     *
     * */
    addExtCmp: function(obj,attrName){
        Ext.getCmp(attrName+'Cmp') ? Ext.getCmp(attrName+'Cmp').destroy() : null;
        var validationType = obj.validation_type,
            format4payment = HLSCalculator.utils.Common.format4payment,
            cmpType;
        switch (validationType){
            case 'NUMBERFIELD':
                if(attrName =='intRate' || attrName =='downPercentage' || attrName == 'balloonPercentage'){
                    cmpType = 'Ext.field.Text';
                }else{
                    cmpType = 'Ext.field.Number';
                }
                break;
            case 'COMBOBOX':
                cmpType = 'Ext.field.Select';
                break;
            default :
                break;
        }
        Ext.getCmp("fieldsetCmp").add(Ext.create(cmpType, {
            label: obj.prompt,
            labelWidth: '9em',
            id: attrName+'Cmp',
            name: attrName,
            labelCls: 'calc-item',
            hidden: obj.display_flag == 'Y' ? false : true,
            required: obj.input_mode == 'REQUIRED' ? true : false,
            requiredCls: 'requiredField',
            readOnly: obj.input_mode == 'READONLY' ? true : false,
            inputCls: obj.percent == '%' ? 'input-align inputWithPercent' : 'input-align',
            listeners : {
                focus: function( that, e, eOpts ){
                    if(Ext.os.name == "Android" && that.getXTypes() != 'component/field/textfield/selectfield' && !that.getReadOnly()){
                        if(parseFloat(that.element.dom.offsetTop) >= 300){
                            Ext.getCmp("fieldsetCmp").getParent().getScrollable().getScroller().scrollTo(0,that.element.dom.offsetTop-100);
                        }
                    }
                },
                clearicontap: function(that, e, eOpts){
                    if(that.getXTypes() != 'component/field/textfield/selectfield'){
                        that.focus();
                    }
                }
            }
        }));
        var cmp = Ext.getCmp(attrName+'Cmp');
        if(cmpType == 'Ext.field.Select'){
            //添加－1项
            obj.store.splice(0,0,{"value_code":-1,"value_name":'请选择'});
            var store =  Ext.create('Ext.data.Store',{
                storeId: attrName + 'Store',
                model: 'HLSCalculator.model.ComboBox',
                data: obj.store
            });

            cmp.setStore(store);
            cmp.setDisplayField("value_name");
            cmp.setValueField("value_code");
            cmp.setValue(obj.default_value);
        }
        //下拉框添加数据集
        if(obj.default_value != "" && cmpType != 'Ext.field.Select'){

            cmp.setValue(obj.percent == '%' ? format4payment(obj.default_value) : obj.default_value);
        }else{

        }
        //车价
        if(attrName == 'leaseItemAmount'){

        }
    },
    onPlanChange: function(that, newValue, oldValue, eOpts ){
        if(that.id == 'planCmp' && newValue != '-1' && oldValue != '-1' && oldValue){
            this.onFinancialPlanItem(null,newValue,null,null,null);
            Ext.getCmp('leaseItemAmountCmp').setValue(HLSCalculator.utils.Data.getPrice());
        }
    }
})