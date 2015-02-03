/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when it performs code generation tasks such as generating new
 models, controllers or views and when running "sencha app upgrade".

 Ideally changes to this file would be limited and most work would be done
 in other places (such as Controllers). If Sencha Cmd cannot merge your
 changes and its generated code, it will produce a "merge conflict" that you
 will need to resolve manually.
 */

Ext.application({
    name: 'HLSCalculator',

    requires: [
        'Ext.MessageBox',
        'Ext.data.Store',
        'HLSCalculator.utils.Common',
        'HLSCalculator.utils.Data',
        'HLSCalculator.utils.Template',
        'Ext.Label',
        'Ext.Toast',
        'Ext.field.Number',
        'Ext.field.Password'
    ],

    controllers: [
        'StorageController',
        'FinancialPlanController',
        'LoanCalcController'
    ],

    views: [
        'Main',
        'SelectAutoPage',
        'LoanCalcPage',
        'QuotePage',
        'HeaderCmp',
        'QuoteItemCmp',
        'FinancialCard'
    ],

    stores: [
        'SeriesStore',
        'BrandStore',
        'ModelStore',
        'FinancialPlanStore',
        'PicStore'
    ],

    models: [
        'HLSCalculator.model.Brand',
        'HLSCalculator.model.Series',
        'HLSCalculator.model.Model',
        'HLSCalculator.model.Pic',
        'HLSCalculator.model.FinancialPlan',
        'HLSCalculator.model.ComboBox'
    ],
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function () {
        
        Function.prototype.method = function (name, func) {
            var that = this;
            if(!that.prototype[name]){
                this.prototype[name] = func;
            }
            return this;
        };
        // Destroy the #appLoadingIndicator element

        Ext.fly('appLoadingIndicator').destroy();
        //localStorage.clear();
        //localStorage.setItem("jsonData",Ext.JSON.encode(json));
        // Initialize the main view

        Ext.Viewport.add({
            xtype: 'titlebar',
            docked: 'top',
            style: 'background-color: #1986D0;background-image: none;min-height: inherit;font-size: 0.9em;',
            title: '',
            id: 'titleBarCmp',
            items: [
                {
                    text: '后退',
                    style: 'border: 0px;background-image: none;background-color: #1986D0;',
                    pressedCls: 'x-back-button-pressing',
                    align: 'left',
                    listeners : {
                        tap : function(that, e, eOpts)
                        {
                            if(that.getId() !== "ext-button-1"){
                                return;
                            }
                            var mainCmp = Ext.getCmp('mainCmp');
                            var id = mainCmp.getActiveItem().getId();
                            //alert(id);
                            if(id ==  'financialcard'){
                                ////2
                                mainCmp.setActiveItem(0);
                            }

                            if(id ==  'loancalcpage'){
                                //////3
                                mainCmp.setActiveItem(1);
                            }

                            if(id == 'quotepage'){
                                //////4
                                mainCmp.setActiveItem(2);
                            }
                        }
                    }
                }
            ]
        });

        Ext.Viewport.add(Ext.create('HLSCalculator.view.Main'));

    },

    onUpdated: function () {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function (buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
