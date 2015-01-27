/**
 * Created by gonglixuan on 14/12/23.
 */
Ext.define('HLSCalculator.view.QuotePage',{
    extend: 'Ext.Container',
    xtype: 'quotepage',
    config: {
        id: 'quotepage',
        scrollable: {
            direction: 'all',
            directionLock: true
        },
        items: [{
            xtype: 'image',
            id: 'headerCmp',
            src: 'resources/images/header.png',
            cls: 'header'
        },{
            xtype: 'xquoteitem',
            id: 'quotetype',
            data: {
                quoteItemTitle: '车型',
                quoteItemValue: '2014款GLK200标准型'
            }
        },{
            xtype: 'xquoteitem',
            id: 'quoteplan',
            data: {
                quoteItemTitle: '产品',
                quoteItemValue: ''
            }
        },{
            xtype: 'xquoteitem',
            id: 'quoteprice',
            data: {
                quoteItemTitle: '车价',
                quoteItemValue: ''
            }
        },{
            xtype: 'xquoteitem',
            id: 'quotedownpaymentratio',
            data: {
                quoteItemTitle: '首付比例',
                quoteItemValue: ''
            }
        },{
            xtype: 'xquoteitem',
            id: 'quotedownpayment',
            data: {
                quoteItemTitle: '首付款',
                quoteItemValue: ''
            }
        },{
            xtype: 'xquoteitem',
            id: 'quoteloan',
            data: {
                quoteItemTitle: '贷款金额',
                quoteItemValue: ''
            }
        },{
            xtype: 'xquoteitem',
            id: 'quotenper',
            data: {
                quoteItemTitle: '期数',
                quoteItemValue: ''
            }
        },{
            xtype: 'xquoteitem',
            id: 'quoteballoon',
            data: {
                quoteItemTitle: '尾款',
                quoteItemValue: ''
            }
        },{
            xtype: 'xquoteitem',
            id: 'quotemonthlypayment',
            data: {
                quoteItemTitle: '月供',
                quoteItemValue: ''
            }
        },{
            xtype: 'label',
            html: '* 详情请洽当地经销商',
            cls: 'quoteLabel'

        }]
    }
})