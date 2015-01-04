/**
 * Created by titengjiang on 14/12/21.
 */
Ext.define('HLSCalculator.view.FinancialPlanList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'financialplanlist',
    config: {
        xtype: 'dataview',
        title: 'DataView Demo',
        itemTpl: '<div class="tweetdiv"> <img  class="planimg" src="resources/images/img.png"> </img> <p class="name">{plan_name}</p> </div>',
        store : {

            xtype : 'financialplanstore'
        },
        listeners: {
            itemtap : function(me,index, target, record, e)
            {

                var data  = Ext.getStore('financialplanstore').getAt(index);


                Ext.getCmp('plan_title_id').set('html',data.raw.plan_title);
                Ext.getCmp('plan_desc_id').set('html',data.raw.plan_desc);



                HLSCalculator.utils.Data.setDownPaymentRatio(data.raw.downpayment_ratio);
                HLSCalculator.utils.Data.setAnnualRate(data.raw.annual_rate);
                HLSCalculator.utils.Data.setAnnualPayItems(data.raw.annual_pay_items);
                HLSCalculator.utils.Data.setFvRation(data.raw.fv_ratio);
                HLSCalculator.utils.Data.setPayTypeRatio(data.raw.pay_type_ratio);
                HLSCalculator.utils.Data.setPlanName(data.raw.plan_name);



                Ext.getCmp('financialcard').setActiveItem(1);



            }



        }
    }

});