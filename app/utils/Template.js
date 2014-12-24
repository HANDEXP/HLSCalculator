/**
 * Created by gonglixuan on 14/12/22.
 */
Ext.define('HLSCalculator.utils.Template', {
    statics: {
        header: Ext.create('Ext.XTemplate', '<div class=\"header\">{title}</div>'),
        quoteItem: Ext.create('Ext.XTemplate', '<div class=\"quoteItems\">' +
        '<div class=\"quoteItemTitle\">{quoteItemTitle}' +
        '</div>' +
        '<div class=\"quoteItemLine\">' +
        '</div>' +
        '<div class=\"quoteItemValue\">{quoteItemValue}' +
        '</div>' +
        '<div class=\"clear\"></div></div>')
        //quoteItem: Ext.create('Ext.XTemplate', '<div class=\"header\">{title}</div>')
    }
});