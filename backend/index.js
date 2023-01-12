const express = require("express");
const cors = require('cors');
const app = express();
const cookieParser = require("cookie-parser");
const connectDatabase = require("./config/db");
const initRoutes = require("./routes/index");
require('dotenv').config()

//Connect database
connectDatabase();

app.use(express.urlencoded({ limit: '50mb', extended: true }))
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.json())
app.use(cors())

//Routes
initRoutes(app)

app.listen(process.env.PORT, () => {console.log(`Server is working on http://localhost:${process.env.PORT}`)});


// //Momo payment
// const { v1: uuidv1 } = require('uuid');
// const https = require('https');
// //parameters send to MoMo get get payUrl
// var endpoint = "https://payment.momo.vn/gw_payment/transactionProcessor"
// var hostname = "https://payment.momo.vn"
// var path = "/gw_payment/transactionProcessor"
//     // var partnerCode = "MOMO"
//     // var accessKey = "F8BBA842ECF85"
//     // var serectkey = "K951B6PE1waDMi640xX08PD3vg6EkVlz"
//     var partnerCode = 'MOMOBKUN20180529';
//     var accessKey = 'klm05TvNBzhg7h7j';
//     var serectkey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa'
// // var partnerCode = "MOMOP66L20211116"
// // var accessKey = "WkefdMLZj1z7usZG"
// // var serectkey = "ZNXrhfRVGnQu6dI0WlM5AqWt1hlIzyfW"
// var orderInfo = "Dịch vụ Aprycot"
// var returnUrl = "http://localhost:5000/success"
// var notifyurl = "https://callback.url/notify"
// var amount = '1000'
// var orderId = uuidv1()
// var requestId = uuidv1()
// var requestType = "captureMoMoWallet"
// var extraData = "merchantName=;merchantId=" //pass empty value if your merchant does not have stores else merchantName=[storeName]; merchantId=[storeId] to identify a transaction map with a physical store

// //before sign HMAC SHA256 with format
// //partnerCode=$partnerCode&accessKey=$accessKey&requestId=$requestId&amount=$amount&orderId=$oderId&orderInfo=$orderInfo&returnUrl=$returnUrl&notifyUrl=$notifyUrl&extraData=$extraData
// var rawSignature = "partnerCode=" + partnerCode + "&accessKey=" + accessKey + "&requestId=" + requestId + "&amount=" + amount + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&returnUrl=" + returnUrl + "&notifyUrl=" + notifyurl + "&extraData=" + extraData
//     //puts raw signature
// console.log("--------------------RAW SIGNATURE----------------")
// console.log(rawSignature)
//     //signature
// const crypto = require('crypto');
// const { url } = require('inspector');
// const { type } = require('os');
// var signature = crypto.createHmac('sha256', serectkey)
//     .update(rawSignature)
//     .digest('hex');
// console.log("--------------------SIGNATURE----------------")
// console.log(signature)

// //json object send to MoMo endpoint
// var body = JSON.stringify({
//         partnerCode: partnerCode,
//         accessKey: accessKey,
//         requestId: requestId,
//         amount: amount,
//         orderId: orderId,
//         orderInfo: orderInfo,
//         returnUrl: returnUrl,
//         notifyUrl: notifyurl,
//         extraData: extraData,
//         requestType: requestType,
//         signature: signature,
//     })
//     //Create the HTTPS objects
// var options = {
//     hostname: 'payment.momo.vn',
//     port: 443,
//     path: '/gw_payment/transactionProcessor',
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': Buffer.byteLength(body)
//     }
// };

// //Send the request and get the response
// console.log("Sending....")

// app.post('/pay', (require, respon) => {
//     var req = https.request(options, (res) => {
//         console.log(`Status: ${res.statusCode}`);
//         console.log(`Headers: ${JSON.stringify(res.headers)}`);
//         res.setEncoding('utf8');
//         res.on('data', (body) => {
//             console.log('Body');
//             console.log(body);
//             console.log('payURL');
//             console.log((JSON.parse(body).payUrl));
//             var a = JSON.parse(body).payUrl
//             console.log(String(a))
//             respon.redirect(a)
//         });

//         // res.on('end', () => {
//         //     console.log('No more data in response.');
//         // });
//     });
//     req.write(body);
//     req.end();
//     // var a = JSON.parse(body).payUrl
//     // console.log(type(a))

// })
// app.get('/success', function(req, res) {
//     res.send("Saa");
// })