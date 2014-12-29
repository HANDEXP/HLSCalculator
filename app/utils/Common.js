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
                case null:
                    return false;
                    break;
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
        },
        //增加百分号
        format4payment: function(payment){
            return (Math.round(payment * 10000)/100).toFixed(2) + '%'
        },
        calculate : function PMT(p_rate,p_nper,p_pv,p_fv,p_type)
        {
            var pmt, r,R1, n,pv,fv,ct;

            if(p_rate == 0){

                return -p_pv/p_nper;
            }

            r = p_rate;
            R1 = 1+r;
            n = p_nper;
            pv = p_pv;

            if (p_fv == 'undefined'){

                fv = 0;


            }else {


                fv =  p_fv;

            }

            if(p_type == 'undefined' ){

                ct = 0;
            }else {function PMT(p_rate,p_nper,p_pv,p_fv,p_type)
            {
            var pmt, r,R1, n,pv,fv,ct;

            if(p_rate == 0){

                return -p_pv/p_nper;
            }

                r = p_rate;
                R1 = 1+r;
                n = p_nper;
                pv = p_pv;

            if (p_fv == 'undefined'){

                fv = 0;


            }else {


                fv =  p_fv;

            }

            if(p_type == 'undefined' ){

                ct = 0;
            }else {

                ct  = p_type;
            }


            pmt =  -( pv * Math.pow(R1,n) + fv) * r/((1 + r *ct) * (Math.pow(R1,n)-1));



                return pmt.toFixed(2);



            }

                ct  = p_type;
            }


            pmt =  -( pv * Math.pow(R1,n) + fv) * r/((1 + r *ct) * (Math.pow(R1,n)-1));




            return pmt.toFixed(2);



}
    }
});