const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow;
const fs = require('fs')
const path = require('path')
import { db } from './firebase-helper'
import { currencyFormat } from './app-helper'

export default {
    methods: {
        print: print,
    }
}

export const print = function (bill, invoiceArr) {
    let name = `${new Date().getTime()}.html`
    let content = presentBill(bill, invoiceArr)

    fs.writeFile(path.join(__dirname, name), content, 'utf-8', function (err) {
        if (err) throw err;
        let win = new BrowserWindow({ show: false })
        const winURL = process.env.NODE_ENV === 'development'
            ? `http://localhost:9080/${__dirname}/${name}`
            : `file://${__dirname}/${name}`
            
        setTimeout(() => {
            win.loadURL(winURL)   
                      
            win.webContents.on('did-finish-load', () => {
                win.webContents.print({ silent: true }, () => {                
                    setTimeout(() => {
                        win.close()
                        deleteFile(name)
                    }, 1000)
                })
            }) 
             
        }, 2000); // 1 second wasn't enough lol
        
    });
}

export const deleteFile = function (name) {
    fs.unlink(path.join(__dirname, name), function (err) {
        if (err) throw err;
    });
}

export const presentBill = function(bill, invoiceArr) {
    let html =
    `<html>
    <head>
        <style>
            h3, h2, h1, h4, h5 {margin: 0; text-align: center}
            p {margin: 0; font-size: 12px;}
            body {text-align: justify; padding: 0; margin: 0;}
            th, td {text-align: center; font-size: 12px;}
            .center {text-align: center;}
            .left {text-align: left;}
            .right {text-align: right;}
            .bold {font-weight: bold;}
            .m-t-10 {margin-top: 10px;}
            .m-b-10 {margin-bottom: 10px;}

        </style>
    </head>
    <body>
        <h4 class="m-b-10">NÔNG NGHIỆP PHÚ THỊNH</h4>
        <p class="center bold">Thôn Eatut, PơngĐrang, KrôngBuk, DakLak</p>
        <p class="center">Tel: 0945.359.269 - 0973.480.305</p>
        <h5 class="m-t-10 m-b-10">HOÁ ĐƠN THANH TOÁN</h5>
        <p>Khách hàng: ${bill.name}</p>
        <p>Địa chỉ: ${bill.address}</p>
        <p class="m-b-10">Số ĐT: ${bill.phone}</p>`
    

    html += 
    `<table style="width:100%">
        <tr>
            <th class="left">Tên</th> 
            <th class="right">S/l</th>
            <th class="right">Đ/g</th>
            <th class="right">T/t</th>
        </tr>`

    for (let i = 0; i < invoiceArr.length; i++) {
        let invoice = invoiceArr[i]
        let name = invoice.productName
        let quantity = invoice.quantity
        let unitPrice = invoice.unitPrice
        let cost = quantity * unitPrice

        html += 
        `<tr>
            <td class="left">${name}</td> 
            <td class="right">${quantity}</td>
            <td class="right">${currencyFormat(unitPrice)} đ</td>
            <td class="right">${currencyFormat(cost)} đ</td>
        </tr>`
    }
    

    html += 
    `<tr>
        <td class="left">Phí giao hàng</td> 
        <td class="right"></td>
        <td class="right"></td>
        <td class="right">${currencyFormat(bill.ship)} đ</td>
    </tr>
    <tr>
        <td class="left">Dùng điểm tích luỹ</td> 
        <td class="right"></td>
        <td class="right"></td>
        <td class="right">${currencyFormat(bill.saved)} đ</td>
    </tr>
    <tr>
        <th class="left">Thành tiền:</th> 
        <th class="right"></td>
        <th class="right"></td>
        <th class="right">${currencyFormat(+bill.cost + +bill.ship - +bill.saved)} đ</th>
    </tr>`

    

    html += 
    `   </table>
        <p class="m-b-10 m-t-10 center">Cám ơn quý khách đã sử dụng dịch vụ</p>
        <p class="m-b-10 center">-----------------------------------</p>
    </body>
    </html>`  
    return html  
}