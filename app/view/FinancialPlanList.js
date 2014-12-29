/**
 * Created by titengjiang on 14/12/21.
 */
Ext.define('HLSCalculator.view.FinancialPlanList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'financialplanlist',
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



                Ext.getCmp('financialcard').setActiveItem(1);
            }



        }
    }

});