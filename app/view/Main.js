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

        items: [
            {
                title: '选购车型',
                iconCls: 'star',
                xtype: 'selectautopage'
            },
            {
                title : '金融方案',
                iconCls: 'action',
                xtype: 'financialcard'

            },
            {
                title: '贷款计算器',
                iconCls: 'action',
                xtype: 'loancalcpage'
            },
            {
                title: '报价',
                iconCls: 'favorites',
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
