/**
 * Created by gonglixuan on 14/12/23.
 */
Ext.define('HLSCalculator.view.QuoteItemCmp',{
    extend: 'Ext.Component',
    xtype: 'xquoteitem',
    config: {
        tpl: HLSCalculator.utils.Template.quoteItem,
        data: {
            quoteItemTitle: '',
            quoteItemValue: ''
        },
        itemId: 'quoteitemcmp'
    }
});