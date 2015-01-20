/**
 * Created by titengjiang on 14/12/21.
 */
Ext.define('HLSCalculator.view.FinancialPlanList', {
    extend: 'Ext.dataview.DataView',
    xtype: 'financialplanlist',
    config: {
        xtype: 'dataview',
        title: 'DataView Demo',
        style: 'padding: 0 2%',
        itemTpl: '<div class="tweetdiv"> <img  class="planimg" src="resources/images/img.png"> </img> <p class="name">{description.default_value}</p></div><div class="clear"><div>',
        store : {
            xtype : 'financialplanstore'
        },
        listeners: {

        }
    }

});