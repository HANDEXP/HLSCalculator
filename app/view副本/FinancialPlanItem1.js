/**
 * Created by titengjiang on 14/12/21.
 */
Ext.define('HLSCalculator.view.FinancialPlanItem1', {
    extend: 'Ext.dataview.DataView',
    xtype: 'financialplanitem1',
    requires:['HLSCalculator.view.FinancialPlanItem2'],
    config: {
        xtype: 'dataview',
        title: 'DataView Demo',
        itemTpl: '<div class="tweetdiv"> <img  class="planimg" src="resources/images/img.png"> </img> <p class="name">{name}</p> </div>',
        store : {

            xtype : 'financialplanstore'
        },
        listeners: {
            itemtap : function(me,index, target, record, e)
            {

                var item2 = Ext.create('HLSCalculator.view.FinancialPlanItem2', {


                });

               //Ext.getCmp('label1').setHtml('my labfefefef');



                Ext.getCmp('financialplanView').push(item2);
            }



        }
    }

});