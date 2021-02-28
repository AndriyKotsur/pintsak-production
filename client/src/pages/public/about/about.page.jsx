import React from 'react'
import { Link } from 'react-router-dom'
import { Background, Icon } from 'components'
import s from './style.module.scss'
import classNames from 'classnames'

import BackgroundTop from 'assets/images/background-top.png'

const AboutPage = () => {
	return(
		<>
			<section className={s.section}>
				<Background settings={{ hiddenLeft: true }} />
				<picture className={s.background}>
					<div className={s.overlay}></div>
					<img src={BackgroundTop} alt="Background image" />
				</picture>
				<div className={s.wrapper}>
					<div className={s.block}>
						<h2 className={s.title}>Про нас</h2>
						<p className={s.text}>
							<span><b>&quot;</b>ПП - Пінцак<b>&quot;</b></span> здійснює свою діяльність з 2007 року. Ми займаємось виробництвом широкого асортименту бетонних виробів.
						</p>
						<a href="#" className={s.catalogue}>Каталог
							<Icon name="catalogue" className="icon icon-catalogue" />
						</a>
						<p className={s.text}>Наше підприємство розташоване в с. Мирча, Великоберезнянський район, але попитом наша продукція не тільки по всій Закарпатській області, а також частими покупцями нашої продукції є громадяни Словаччини та Угорщини.</p>
					</div>
					<div className={s.block}>
						<h2 className={s.title}>Виробництво</h2>
						<p className={s.text}><span>На сьогоднішній день ми виробляємо<b>:</b></span> бетонні накриття для огорож та стовпців, парапети, тротуарну та фасадну плитки, бордюри, глечики та елементи садово-паркового декору, а такожзбірні секції євроогорожей.</p>
						<p className={s.text}>В основі виробничого процесу лежить вібролиття, яке забезпечує максимальну надійність виробу та в повній мірі відтворює його текстуру. Виробництво здійснюється в такі етапи:
						</p>
						<ol className={s.list}>
							<li className={s.item}>Змащення підібраних форм</li>
							<li className={s.item}>Підготовка бетонної суміші</li>
							<li className={s.item}>Заповнення форм бетоном</li>
							<li className={s.item}>Визрівання виробу</li>
							<li className={s.item}>Виконання розпалубочних робіт</li>
							<li className={s.item}>Складування готової продукції</li>
						</ol>
						<Link to="/catalogue" className={classNames('btn-catalogue', 'btn-orange', s.link)}>Перейти В Магазин</Link>
					</div>
				</div>
			</section>
		</>
	)
}

export default AboutPage