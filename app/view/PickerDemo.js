/**
 * Created by gonglixuan on 14/12/19.
 */
Ext.define('HLSCalculator.view.PickerDemo', {
    extend: 'Ext.Container',
    xtype: 'pickerdemo',
    config: {
        defaults: {
            margin: 20
        },
        layout: {
            type: 'vbox'
        },
        items: [{
            xtype: 'label',
            html: 'Touch the button to show an example of a picker'
        }, {
            xtype: 'button',
            text: 'Touch to show picker',
            itemId: 'openButton',
            listeners: {
                tap: function (button, e, eOpts) {
                    if (!button.picker) {
                        button.picker = Ext.widget('picker', {
                            slots: [{
                                name: 'brand',
                                title: 'Brand',
                                data: [{
                                    text: 'John',
                                    value: 'john'
                                }, {
                                    text: 'James',
                                    value: 'james'
                                }, {
                                    text: 'Paul',
                                    value: 'paul'
                                }, {
                                    text: 'Michael',
                                    value: 'michael'
                                }]
                            }],
                            listeners: {
                                cancel: function (picker, opts) {
                                    Ext.Msg.alert('cancel', 'Picker has been canceled');
                                },
                                change: function (picker, value, opts) {
                                    Ext.Msg.alert('chance', 'Picker has value: ' + Ext.JSON.encode(value));
                                }
                            }
                        });
                        Ext.Viewport.add(button.picker);
                    }
                    button.picker.show();
                }
            }
        },
            {
                xtype: 'fieldset',
                title: 'Select',
                items: [
                    {
                        xtype: 'selectfield',
                        label: 'Choose one',
                        options: [
                            {text: 'First Option', value: 'first'},
                            {text: 'Second Option', value: 'second'},
                            {text: 'Third Option', value: 'third'}
                        ]
                    }
                ]
            }]
    }
});

