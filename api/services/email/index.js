const { appUrl } = require('../../config')

module.exports = (name, phone, message, order) => {
  return (
    `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
     <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Новий запит від користувача</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </head>
    <body>
      <table border="1" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" bgcolor="#373f48" style="padding: 40px 0 30px 0;">
            <img src="${appUrl}/logotype.svg" width="300" height="230" style="display: block;" alt="Company logotype" />
          </td>
        </tr>
        <tr>
          <td>
            ${name}
          </td>
        <tr>
          <td>
            ${phone}
          </td>
        </tr>
        <tr>
          <td>
            ${message}
          </td>
        </tr>
      </table>
      </body>
    </html>
    `
  )
}
