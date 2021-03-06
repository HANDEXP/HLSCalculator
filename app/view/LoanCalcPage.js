/**
 * Created by gonglixuan on 14/12/19.
 */
Ext.define('HLSCalculator.view.LoanCalcPage', {
    extend: 'Ext.Container',
    xtype: 'loancalcpage',
    config: {
        id: 'loancalcpage',
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },
        items: [{
            xtype: 'fieldset',
            id: 'fieldsetCmp',
            style: 'margin: .5em .5em .2em .5em;',
            items: [
                {
                    xtype: 'textfield',
                    id: 'autoTypeCmp',
                    name: 'autoType',
                    labelCls: 'calc-item',
                    disabled: true,
                    value: '请先选择车系和车型'
                }, {
                    xtype: 'selectfield',
                    id: 'planCmp',
                    name: 'plan',
                    displayField: 'text',
                    valueField: 'index'
                }
            ]
        }, {
            xtype: 'button',
            name: 'calcButton',
            pressedCls: 'x-calc-button-pressing',
            text: '计算',
            cls: 'x-calc-button',
            listeners: {}
        }
        ]
    }
}, function () {

    console.log('LoanCalcPage is ready.');
});