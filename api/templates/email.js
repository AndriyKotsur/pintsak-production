const { appUrl } = require('../config')

module.exports = (name, phone, message, order) => {
  return (
    `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
     <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Новий запит від користувача</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <style type="text/css">
        body {width: 600px;margin: 0 auto;}
        table {border-collapse: collapse;}
        table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
        img {-ms-interpolation-mode: bicubic;}
      </style>
      <style>
        body, p, div {
          font-family: "Noto Sans", sans-serif;
					font-size: 100%;
					font-size: 14px;
        }
        body {
          color: #373f48;
        }
        body a {
          color: #ff8e01;
          text-decoration: none;
        }
        p { margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" bgcolor="#373f48" style="padding: 40px 0 30px 0;">
            <img src="${appUrl}/favicon-32x32.png" width="150" height="75" style="display: block;" alt="Company logotype" />
          </td>
        </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td bgcolor="#f2f0f0" style="padding:20px 10px; border-bottom: 2px solid #ff8e01; font-size: 18px; font-weight: 700;">
            Контактні дані користувача
          </td>
        </tr>
      </table>
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td width="50%" style="padding: 5px 10px;">Ім'я</td>
          <td width="50%" style="padding: 5px 10px;">${name}</td>
        <tr>
          <td width="50%" style="padding: 5px 10px;">Номер телефону</td>
          <td width="50%" style="padding: 5px 10px;">${phone}</td>
        </tr>
        <tr>
          <td width="50%" style="padding: 5px 10px;">Повідомлення</td>
          <td width="50%" style="padding: 5px 10px;">${message}</td>
        </tr>
      </table>
      ${order && order.length ?
      `<table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td bgcolor="#f2f0f0" style="padding: 20px 10px; border-bottom: 2px solid #ff8e01; font-size: 18px; font-weight: 700;">
            Інформація про замовлення
          </td>
        </tr>
      </table>` : ''}
      ${order && order.length ? order.map(item => (
        `<table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-bottom: 1px solid #f2f0f0;">
          <tr>
            <td width="50%" style="padding: 5px 10px;">Назва</td>
            <td width="50%" style="padding: 5px 10px;">${item.title}</td>
          </tr>
          <tr>
            <td width="50%" style="padding: 5px 10px;">Кількість</td>
            <td width="50%" style="padding: 5px 10px;">${item.quantity}</td>
          </tr>
          <tr>
            <td width="50%" style="padding: 5px 10px;">Варіант</td>
            <td width="50%" style="padding: 5px 10px;">${item.variant}</td>
          </tr>
          <tr>
            <td width="50%" style="padding: 5px 10px;">Ціна</td>
            <td width="50%" style="padding: 5px 10px;">${item.price}</td>
          </tr>
        </table>`
      )).join('') : ''}
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" bgcolor="#373f48" style="padding: 40px 0 30px 0;">
            <a href="${appUrl}/" style="font-size: 16px; font-weight: 400; text-decoration: underline; color: #ff8e01;">
              Перейти на головну сторінку
            </a>
          </td>
        </tr>
      </table>
    </body>
    </html>
    `
  )
}
