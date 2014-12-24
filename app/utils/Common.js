/**
 * Created by gonglixuan on 14/12/21.
 */
Ext.define('HLSCalculator.utils.Common',{
    statics :{
        //增加千分位和两位小数点
        format4price: function(price) {
            if(!HLSCalculator.utils.Common.isValid(price)){
                price = 0;
            }
            return parseInt(price).toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
        },
        //判断值是否有效
        isValid: function(value) {
            switch (value){
                case '':
                    return false;
                    break;
                case ' ':
                    return false;
                    break;
                case 'default default':
                    return false;
                    break;
                case 'default':
                    return false;
                    break;
                default:
                    return true;
            }
        }
    }
});