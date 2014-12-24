/**
 * Created by gonglixuan on 14/12/23.
 */
Ext.define('HLSCalculator.view.QuotePage',{
    extend: 'Ext.Container',
    xtype: 'quotepage',
    config: {
        items: [{
            xtype: 'image',
            id: 'headerCmp',
            src: 'resources/images/header.png',
            cls: 'header'
        },{
            xtype: 'xquoteitem',
            data: {
                quoteItemTitle: '车型',
                quoteItemValue: '2014款GLK200标准型'
            }
        },{
            xtype: 'xquoteitem',
            data: {
                quoteItemTitle: '产品',
                quoteItemValue: '标准信贷'
            }
        },{
            xtype: 'xquoteitem',
            data: {
                quoteItemTitle: '车价',
                quoteItemValue: '¥268,800.00'
            }
        },{
            xtype: 'xquoteitem',
            data: {
                quoteItemTitle: '首付比例',
                quoteItemValue: '20%'
            }
        },{
            xtype: 'xquoteitem',
            data: {
                quoteItemTitle: '首付金额',
                quoteItemValue: '¥53,760.00'
            }
        },{
            xtype: 'xquoteitem',
            data: {
                quoteItemTitle: '贷款金额',
                quoteItemValue: '¥215,040.00'
            }
        },{
            xtype: 'xquoteitem',
            data: {
                quoteItemTitle: '贷款期限',
                quoteItemValue: '12'
            }
        },{
            xtype: 'xquoteitem',
            data: {
                quoteItemTitle: '月供',
                quoteItemValue: '¥17920.00'
            },
            id: 'specialItem'
        },{
            xtype: 'label',
            html: '* 详情请洽当地经销商',
            cls: 'quoteLabel'

        }]
    }
})