Ext.define('HLSCalculator.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
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
                title: '贷款计算器',
                iconCls: 'action',
                xtype: 'loancalcpage'
            },
            {
                title: '报价',
                iconCls: 'favorites',
                xtype: 'quotepage'
            },
            {
                title: 'Welcome',
                iconCls: 'home',

                styleHtmlContent: true,
                scrollable: true,

                items: {
                    docked: 'top',
                    xtype: 'titlebar',
                    title: 'Welcome to Sencha Touch 2'
                },

                html: [
                    "You've just generated a new Sencha Touch 2 project. What you're looking at right now is the ",
                    "contents of <a target='_blank' href=\"app/view/Main.js\">app/view/Main.js</a> - edit that file ",
                    "and refresh to change what's rendered here."
                ].join("")
            }

        ]
    }
});
