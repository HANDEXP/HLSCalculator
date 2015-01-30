Ext.define('HLSCalculator.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    id: 'mainCmp',
    requires: [
        'Ext.TitleBar',
        'Ext.Video',
        'Ext.field.Select',
        'Ext.form.FieldSet',
        'Ext.Img'
    ],
    config: {
        tabBarPosition: 'bottom',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items: [
            {
                title: '选购车型',
                iconCls: 'car',
                xtype: 'selectautopage'
            },
            {
                title : '报价方案',
                iconCls: 'pricelist',
                xtype: 'financialcard'

            },
            {
                title: '贷款计算',
                iconCls: 'compose',
                xtype: 'loancalcpage'
            },
            {
                title: '报价',
                iconCls: 'report',
                xtype: 'quotepage'
            }



        ],
        listeners: {
            activate: function( newActiveItem, that, oldActiveItem, eOpts ){
                //debugger;
            }
        }
    }
});
