import React from 'react'
import { Link } from 'react-router-dom'

import { Background, Button, Icon } from 'components'

import s from './style.module.scss'

import backgroundTop from 'assets/images/background-top.png'
import catalogueLeft from 'assets/images/catalogue-left.jpg'
import catalogueRight from 'assets/images/catalogue-right.jpg'

const AboutPage = () => {
	return (
		<section className={s.about}>
			<Background settings={{ hiddenLeft: true }} />
			<picture className={s.about_background}>
				<div className={s.background_overlay} />
				<img src={backgroundTop} alt='Tiles background' />
			</picture>
			<div className={s.about_wrapper}>
				<div className={s.about_block}>
					<h2 className={s.about_title}>
						Про нас
					</h2>
					<div className={s.about_container}>
						<p className={s.about_text}>
							<span><b>&quot;</b>ПП - Пінцак<b>&quot;</b></span> здійснює свою діяльність з 2007 року.
							Ми займаємось виробництвом широкого асортименту бетонних виробів.
						</p>
						<div className={s.about_catalogue}>
							<div className={s.catalogue_images}>
								<picture className={s.catalogue_image}>
									<img src={catalogueLeft} alt='Catalogue icon' />
								</picture>
								<picture className={s.catalogue_image}>
									<img src={catalogueRight} alt='Catalogue icon' />
								</picture>
							</div>
							<a href={`${process.env.REACT_APP_API}/v1/catalogue`} className={s.catalogue_link}>
							Каталог
							<Icon name='catalogue' className='icon icon-catalogue' />
						</a>
						</div>
					</div>
					<p className={s.about_text}>Наше підприємство розташоване в с. Мирча, Великоберезнянський район,
					але попитом наша продукція не тільки по всій Закарпатській області,
					а також частими покупцями нашої продукції є громадяни Словаччини та Угорщини.</p>
				</div>
				<div className={s.about_block}>
					<h2 className={s.about_title}>
						Виробництво
					</h2>
					<p className={s.about_text}><span>На сьогоднішній день ми виробляємо<b>:</b></span> бетонні накриття для огорож та стовпців,
					парапети, тротуарну та фасадну плитки, бордюри, глечики та елементи садово-паркового декору, а такожзбірні секції євроогорожей.</p>
					<p className={s.about_text}>В основі виробничого процесу лежить вібролиття, яке забезпечує максимальну надійність виробу
					та в повній мірі відтворює його текстуру. Виробництво здійснюється в такі етапи:
					</p>
					<ol className={s.about_list}>
						<li className={s.list_item}>
							<span className={s.list_dot} />
							Змащення підібраних форм
						</li>
						<li className={s.list_item}>
							<span className={s.list_dot} />
							Підготовка бетонної суміші
						</li>
						<li className={s.list_item}>
							<span className={s.list_dot} />
							Заповнення форм бетоном
						</li>
						<li className={s.list_item}>
							<span className={s.list_dot} />
							Визрівання виробу
						</li>
						<li className={s.list_item}>
							<span className={s.list_dot} />
							Виконання розпалубочних робіт
						</li>
						<li className={s.list_item}>
							<span className={s.list_dot} />
							Складування готової продукції
						</li>
					</ol>
					<Link to='/catalogue'>
						<Button
							background="orange"
							type="button"
							styleName={s.about_link}>
							Перейти В Магазин
						</Button>
					</Link>
				</div>
			</div>
		</section>
	)
}

export default AboutPage