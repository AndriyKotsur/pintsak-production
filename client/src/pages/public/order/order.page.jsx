import React from 'react'
import { Link } from 'react-router-dom'
import { Icon, Form, Input } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const OrderPage = () => {
	return (
		<div className={s.section}>
			<div className="container">
				<div className={s.wrapper}>
					<div className={s.form}>
						<Form
							title="Відправити замовлення"
							text="Будь ласка, заповніть обов'язкові поля і ми зв'яжемося з вами повашому замовленню"
							required>
							<Input
								type='text'
								name='title'
								title='Ваше Ім’я'
								// onChange={e => dispatch(AddTileActions.handleChange(e))}
								isRequired />
							<Input
								type='text'
								name='phone'
								title='Ваше номер телефону'
								// onChange={e => dispatch(AddTileActions.handleChange(e))}
								isRequired />
							<Input
								type='text'
								name='message'
								title='Ваш комментар'
								// onChange={e => dispatch(AddTileActions.handleChange(e))}
								isRequired />
						</Form>
					</div>
					<div className={s.order}>
						<div className={s.edit}>
							<span className={s.edit_title}>Редагувати замовлення</span>
							<button className={s.edit_btn}>
								<Icon name="arrow" className="icon icon-arrow"/>
							</button>
						</div>
						<div className={s.summary}>
							<h2 className={s.summary_title}>Замовлення</h2>
							<div className={s.summary_box}>
								<span className={s.summary_text}>Підсумок:</span>
								<span className={s.summary_price}>172 422,00 грн</span>
							</div>
						</div>
						<div className={s.list}>
							<div className={s.list_item}>
								<picture className={s.list_image}>
									<img src="" alt="Product image" />
								</picture>
								<Link to="" className={s.list_title}>Бордюр поворотний</Link>
								<span className={s.list_size}>75 м<sup>2</sup></span>
								<span className={s.list_price}>4567,00 грн</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default OrderPage