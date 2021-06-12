const { appUrl } = require('../../config')

module.exports = ({ types }) => {
	const today = new Date()

	return `
	<!doctype html>
	<html>
		 <head>
				<meta charset="utf-8">
				<title>Пінцак продакшн: Каталог продукції</title>
				<style>
				html, body {
					margin: 0;
					padding: 0;
					font-family: "Noto Sans", sans-serif;
					font-size: 100%;
					font-size: 16px;
					line-height: 1;
					box-sizing: border-box;
				}

				.page {
					width: 100%;
					font-size: 16px;
					line-height: 24px;
					color: #373f48;
				}
				
				.page_header {
					position: relative;
					width: 100%;
					padding: 20px 0;
					margin-bottom: 20px;
				}
				
				.page_header h1 {
					font-size: 24px;
					font-wight: bold;
					line-height: 24px;
					text-align: center;
					color: #373f48;
				}
				
				.page_header p {
					font-size: 14px;
					font-weight: normal;
					text-align: center;
					color: #373f48;
				}
				
				.page_category {
					padding: 10px 20px;
					background: #f2f0f0;
					border-bottom: 2px solid #ff8e01;
				}

				.page_category td {
					padding: 15px 10px 20px;
					font-size: 18px;
					font-weight: bold;
					line-height: 24px;
					color: #ffffff;
				}
				
				.page_category td:nth-child(2) {
					font-size: 14px;
					font-weight: normal;
				}
				
				.page table {
					width: 100%;
					text-aligh: left;
				}
				
				.page table tr td:nth-child(2) {
					font-weight: normal;
					text-aligh: right;
				}

				.page_item td {
					vertical-align: top;
					padding: 10px 15px;
					border-bottom: 1px solid #999999;
					font-size: 16px;
					font-weight: bold;
					line-height: 24px;
				}

				.item_value {
					font-weight: normal;
					text-aligh: right;
				}
				
				.image {
					width: 100px;
					height: 80px;
				}
			
				</style>
		 </head>
		 <body>
				<div class="page">
					<div class="page_header">
						<h1>Каталог продукції</h1>
						<p>Актуальна дата каталогу: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}</p>
					</div>
					<div class="page_items">
						${types && types.length > 0 && types.map(({ url, title, tiles }) => (
							`<div class="page_category">
								<h2>Категорія: ${title}</h2>
								<p>Посилання на категорію: ${appUrl}catalogue/${url}</p>
							</div>
							<table>
							${tiles && tiles.length > 0 && tiles.map(({ url: tileUrl, title: tileTitle, images, prices }) => (
								`<tr class="page_item">	
									<td>Назва продукту</td>
									<td style="text-align: right">${tileTitle}</td>
								</tr>
								<tr class="page_item">
									<td>Посилання</td>
									<td>${appUrl}catalogue/${url}/${tileUrl}</td>
								</tr>
								<tr class="page_item">
									<td>Зображення продукту</td>
									<td><img class='image' src=${images[0]} alt='image' /></td>
								</tr>
								<tr class="page_item">
									<td>Базова ціна продукту</td>
									<td>${prices.grey}$</td>
								</tr>`
								))}
							</table>`
					))}
					</div>
				</div>
		 </body>
	</html>`
}
