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
    },
    onFinancialPlanItem: function (that, index, target, record, e) {
        var data = Ext.getStore('financialplanstore').getAt(index);
        Ext.getCmp('plan_title_id').set('html', data.raw.description.default_value);
        Ext.getCmp('plan_desc_id').set('html', data.raw.app_description.default_value);
        //存报价方案数据
        HLSCalculator.utils.Data.setDownPaymentRatio(data.raw.down_payment_ratio.default_value);
        HLSCalculator.utils.Data.setIntRate(data.raw.int_rate.default_value);
        HLSCalculator.utils.Data.setAnnualPayItems(data.raw.annual_pay_times.default_value);
        HLSCalculator.utils.Data.setLeaseTimes(data.raw.lease_times.default_value);
        HLSCalculator.utils.Data.setBalloonRatio(data.raw.balloon_ratio.default_value);
        HLSCalculator.utils.Data.setPayType(data.raw.pay_type.default_value);
        HLSCalculator.utils.Data.setPlanName(data.raw.description.default_value);

        //存上下线
        HLSCalculator.utils.Data.setDownPaymentRatioValidation({'upper_limit':data.raw.down_payment_ratio.upper_limit,'lower_limit':data.raw.down_payment_ratio.lower_limit});
        HLSCalculator.utils.Data.setBalloonRatioValidation({'upper_limit':data.raw.balloon_ratio.upper_limit,'lower_limit':data.raw.balloon_ratio.lower_limit});

        //删除旧界面&增加计算界面组件
        //车价
        this.addExtCmp(data.raw.lease_item_amount,'leaseItemAmount');
        //首付比例
        this.addExtCmp(data.raw.down_payment_ratio,'downPercentage');
        //首付款
        this.addExtCmp(data.raw.down_payment,'downPayment');
        //年利率
        this.addExtCmp(data.raw.int_rate,'intRate');
        //支付频率
        this.addExtCmp(data.raw.annual_pay_times,'annualPayTimes');
        //期数
        this.addExtCmp(data.raw.lease_times,'leaseTimes');
        //尾款比例
        this.addExtCmp(data.raw.balloon_ratio,'balloonPercentage');
        //大额尾款
        this.addExtCmp(data.raw.balloon,'balloon');
        //先付、后付
        this.addExtCmp(data.raw.pay_type,'payType');
        Ext.getCmp('financialcard').setActiveItem(1);
    },
    /*
    * 动态增加field
    *
    * */
    addExtCmp: function(obj,attrName){
        Ext.getCmp(attrName+'Cmp') ? Ext.getCmp(attrName+'Cmp').destroy() : null;
        var validationType = obj.validation_type,
            format4payment = HLSCalculator.utils.Common.format4payment;
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
            labelWidth: '10em',
            id: attrName+'Cmp',
            name: attrName,
            labelCls: 'calc-item',
            //value: obj.percent == '%' ? (parseFloat(obj.default_value) * 100).toString() + obj.percent : obj.default_value,
            hidden: obj.display_flag == 'Y' ? false : true,
            required: obj.input_mode == 'REQUIRED' ? true : false,
            requiredCls: 'requiredField',
            readOnly: obj.input_mode == 'READONLY' ? true : false
        }));
        var cmp = Ext.getCmp(attrName+'Cmp');
        //下拉框添加数据集
        if(obj.default_value){
            cmp.setValue(obj.percent == '%' ? format4payment(obj.default_value) : obj.default_value);
        }else{
            cmp.setValue("");
        }
        if(cmpType == 'Ext.field.Select'){
            //debugger;

            var store =  Ext.create('Ext.data.Store',{
                storeId: attrName + 'Store',
                model: 'HLSCalculator.model.ComboBox',
                data: obj.store
            });
            cmp.setStore(store)
            cmp.setDisplayField("value_name");
            cmp.setValueField("value_code");
        }
        //车价
        if(attrName == 'leaseItemAmount'){
            //cmp.setValue(HLSCalculator.utils.Data.getPrice());
        }
    },
    onPlanChange: function(that, newValue, oldValue, eOpts ){
        if(that.id == 'planCmp' && newValue != '-1' && oldValue != '-1'){
            this.onFinancialPlanItem(null,newValue,null,null,null);
            Ext.getCmp('leaseItemAmountCmp').setValue(HLSCalculator.utils.Data.getPrice());
        }
    }
})