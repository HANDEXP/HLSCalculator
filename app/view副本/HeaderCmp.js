/**
 * Created by gonglixuan on 14/12/23.
 */
Ext.define('HLSCalculator.view.HeaderCmp',{
    extend: 'Ext.Component',
    xtype: 'xheader',
    config: {
        tpl: HLSCalculator.utils.Template.header,
        data: {
            title: ''
        },
        itemId: 'headercmp'
    }
});