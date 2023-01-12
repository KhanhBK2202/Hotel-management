// const dateFormat = require("dateformat") ;
const moment = require("moment");
const Booking = require("../models/BookingModel");
var Buffer = require('buffer/').Buffer
const qs = require('qs')
 var crypto = require("crypto");   
//  const randomOrderRef = () => {
//     return Math.floor(Math.random() * 100000)
// }



function sortObject(o) {
    var sorted = {},
        key, a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}
const PaymentController = {
    createPayment: async(req, res) => {
        var ipAddr = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    
    
     
    
       
        var tmnCode = 'GUZWDB80' ;
        var secretKey = 'UKHUGOZAFGZGJTNBBJBRTOVWHPAKJNUD';
        var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
        var returnUrl = 'https://localhost:3000/order/vnpay_return';
    
      //  var date = new Date();
    
     //   var createDate = dateFormat(date, 'yyyymmddHHmmss');
        //var createDate = moment().format('YYYYMMDDHHmmss');
//         var orderId = randomOrderRef();//req.body.id;
//         var amount = req.body.amount;
//        // var bankCode = req.body.bankCode;
        
//         var orderInfo = req.body.orderDescription;
//       //  var orderType = req.body.orderType;
//         var locale = req.body.language;
//         if(locale === null || locale === 'vn'){
//             locale = 'vn';
//         }
//         var currCode = 'VND';
//         var vnp_Params = {};
//         vnp_Params['vnp_Version'] = '2.1.0';
//         vnp_Params['vnp_Command'] = 'pay';
//         vnp_Params['vnp_TmnCode'] = tmnCode;
//         // vnp_Params['vnp_Merchant'] = ''
//         vnp_Params['vnp_Locale'] = locale;
//         vnp_Params['vnp_CurrCode'] = currCode;
//         vnp_Params['vnp_TxnRef'] = orderId;
//         vnp_Params['vnp_OrderInfo'] = orderInfo;
//    //     vnp_Params['vnp_OrderType'] = orderType;
//         vnp_Params['vnp_Amount'] = amount * 100;
//         vnp_Params['vnp_ReturnUrl'] = returnUrl;
//         vnp_Params['vnp_IpAddr'] = ipAddr;
//         vnp_Params['vnp_CreateDate'] = createDate;
//         // if(bankCode !== null && bankCode !== ''){
//         //     vnp_Params['vnp_BankCode'] = bankCode;
//         // }
    
//         vnp_Params = sortObject(vnp_Params);
    
//         var querystring = require('qs');
//         var signData = querystring.stringify(vnp_Params, { encode: false });
       
//         var hmac = crypto.createHmac("sha512", secretKey);
//         var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex"); 
//         vnp_Params['vnp_SecureHash'] = signed;
//          vnpUrl= `${vnpUrl}?${querystring.stringify(vnp_Params, { encode: false })}`;

//         // const signData = qs.stringify(vnp_Params, {encode: false});
//         // const hmac = crypto.createHmac("sha512", secretKey);
//         // vnp_Params['vnp_SecureHash'] = hmac.update(new Buffer(signData, 'utf-8')).digest("hex")
//       //  // const url = `${vnpUrl}?${qs.stringify(data, {encode: false})}`
//         res.status(200).json({code: '00', data: vnpUrl})
     // res.redirect(vnpUrl)
     const data = {
        vnp_Amount: req.body.amount,
        vnp_Command: 'pay',
        vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
        vnp_CurrCode: 'VND',
        vnp_IpAddr: ipAddr,
        vnp_Locale: 'vn',
        vnp_OrderInfo: req.body.orderInfo,
        vnp_ReturnUrl: returnUrl,
        vnp_TmnCode: tmnCode,
        vnp_TxnRef: req.body.orderId,
        vnp_Version: '2.0.1'
    }
    const signData = qs.stringify(data, {encode: false});
    const hmac = crypto.createHmac("sha512", secretKey);
    data.vnp_SecureHash = hmac.update(new Buffer(signData, 'utf-8')).digest("hex")
    const url = `${vnpUrl}?${qs.stringify(data, {encode: false})}`
    res.status(200).json({code: '00', data: url})
    
    
    
    
    }
         
   ,
      getPayment: async(req,res)=> {
        var vnp_Params = req.query;
        var secureHash = vnp_Params['vnp_SecureHash'];
    
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
    
        vnp_Params = sortObject(vnp_Params);
       
        var secretKey ='UKHUGOZAFGZGJTNBBJBRTOVWHPAKJNUD';
        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");     
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
         
    
        if(secureHash === signed){
            var orderId = vnp_Params['vnp_TxnRef'];
            var rspCode = vnp_Params['vnp_ResponseCode'];
            const booking = await Booking.findById(orderId);
            await booking.updateOne({ statusPayment: 'success', responseCode: rspCode });
            res.status(200).json({RspCode: '00', Message: 'success'})
        }
        else {
            var orderId = vnp_Params['vnp_TxnRef'];
            var rspCode = vnp_Params['vnp_ResponseCode'];
            const booking = await Booking.findById(orderId);
            await booking.updateOne({ statusPayment: 'Fail checksum', responseCode: rspCode });
            res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
        }
      }  

    
    , 
    getPaymentReturn: async(req,res)=> {
        var vnp_Params = req.query;
        var secureHash = vnp_Params['vnp_SecureHash'];
    
        delete vnp_Params['vnp_SecureHash'];
        delete vnp_Params['vnp_SecureHashType'];
    
        vnp_Params = sortObject(vnp_Params);
       
        var secretKey ='UKHUGOZAFGZGJTNBBJBRTOVWHPAKJNUD';
        var querystring = require('qs');
        var signData = querystring.stringify(vnp_Params, { encode: false });
        var crypto = require("crypto");     
        var hmac = crypto.createHmac("sha512", secretKey);
        var signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");     
         
    
        if(secureHash === signed){
            // var orderId = vnp_Params['vnp_TxnRef'];
            // var rspCode = vnp_Params['vnp_ResponseCode'];
            // const booking = await Booking.findById(orderId);
            // await booking.updateOne({ statusPayment: 'success', responseCode: rspCode });
            res.status(200).json({RspCode: '00', Message: 'success'})
        }
        else {
            // var orderId = vnp_Params['vnp_TxnRef'];
            // var rspCode = vnp_Params['vnp_ResponseCode'];
            // const booking = await Booking.findById(orderId);
            // await booking.updateOne({ statusPayment: 'Fail checksum', responseCode: rspCode });
            res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
        }
      }  

};
module.exports = PaymentController;