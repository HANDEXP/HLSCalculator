/**
 * Created by titengjiang on 14/12/22.
 */

Ext.define('HLSCalculator.view.FinancialPlanItem2',{
    extend: 'Ext.Container',
    xtype: 'financialplanitem2',
    style : 'background-color: white;',

    config: {
        layout: {
            type: 'vbox'
        },
        items : [
            {
                xtype : 'label',
                html : '标准信贷-等额月供信贷产品',
                style : 'font-size: 0.9em;padding: 10px;padding-top: 5%;font-weight: bold'
            },
            {
                xtype : 'label',
                html : '标准信贷再世界各地得到了人们的广泛信赖。也让你拥有灵活度更大的财务支配空间与更多生活方式的选择。它除了有首付款与等额月供外，还有一个贷款额25%的弹性尾款。这种日渐受到欢迎的汽车融资方式将让您的月供失踪维持再一个ji较低水平',
                style: 'font-size: 0.8em;padding: 10px;',
                flex: 4

            },
            {
                xtype : 'container',
                style : "border-top: 1px solid gray;margin-left: 10px;margin-right: 10px;"
            },
            {
                xtype : 'img',
                style: 'background-size:  100%,100%;margin-left: 10px;margin-right: 10px;',
                src : '../../resources/images/plan1.png',
                flex: 2.5
            },
            {
                xtype : 'container',
                style : "border-top: 1px solid gray;margin-left: 10px;margin-right: 10px;",
                height : '1px'

            },
            {
                xtype : 'container',
                style : 'background-color: white;',
                    items:[
                        {
                            xtype : 'button',
                            text : '查看其他方案',
                            height : '35px',
                            style : 'margin-top: 10%;margin-left: 10px;margin-right: 10px;border-radius:0;color: white;background-image: -webkit-linear-gradient(top, #5f9ac4, #3382b7 );font-size: 0.8em',
                            pressedCls : ''

                        }

                    ],

                flex : 2

            }



        ]



    }
})