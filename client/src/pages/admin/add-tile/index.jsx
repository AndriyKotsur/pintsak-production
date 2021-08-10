import React, { Fragment, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'

import { useFormik } from 'formik'
import { Background, Button, Preloader } from 'components'
import { Options, Characteristics, Prices } from './components'

import validationSchema from "./validationScheme"

import classNames from 'classnames'
import s from './style.module.scss'

const AddTile = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)

	const disabledStatus = Object.keys(state.prices).length <= 0 && state.current_step >= 3
	const loadingStatus = state.get_types_status === 'loading'
	const successStatus = state.get_types_status === 'success'

	const handlePrev = () => {
		dispatch(AddTileActions.handleChangeCurrentStep(state.current_step - 1))
	}

	const handleNext = () => {
		if (state.current_step >= 3) {
			handleSubmit()
		} else {
			dispatch(AddTileActions.handleChangeCurrentStep(state.current_step + 1))
			formik.setTouched({})
			formik.setErrors({})
		}
	}

	const handleSubmit = () => {
		if (Object.keys(state.prices).length > 0) dispatch(AddTileActions.addTile(state))
	}

	const formik = useFormik({
		initialValues: {
			images: [],
			title: '',
			width: '',
			height: '',
			thickness: '',
			weight: '',
			quantity: '',
			prices: {
				color: '',
				price: ''
			}
		},
		validationSchema: validationSchema[state.current_step - 1],
		onSubmit: handleNext
	})

	const handleSteps = step => {
		switch (step) {
			case 1:
				return <Options formikProps={formik} />
			case 2:
				return <Characteristics formikProps={formik} />
			case 3:
				return <Prices formikProps={formik} />
			default:
				return 'Помилка запиту даних'
		}
	}

	useEffect(() => {
		dispatch(AddTileActions.getTileTypes())

		return () => dispatch(AddTileActions.clear())
	}, [dispatch])

	useEffect(() => {
		if (state.add_tile_status === 'success')
			history.push('/admin/dashboard')
	}, [state.add_tile_status, history])

	return (
		<Fragment>
			{loadingStatus && <Preloader />}
			{successStatus && (
				<section className={s.steps_section}>
					<Background settings={{ hiddenLeft: false, hiddenRight: false }} />
					<div className="container">
						<div className={s.steps_wrapper}>
							<form onSubmit={formik.handleSubmit}>
								{handleSteps(state.current_step)}
								<div className={classNames(s.steps_controllers, { [s.extended]: state.current_step === 1 })}>
									{state.current_step > 1 &&
										<Button
											type="button"
											background="orange"
											styleName={s.steps_btn}
											handleClick={handlePrev}>
											Назад
										</Button>}
									<Button
										type="submit"
										background="orange"
										disabled={disabledStatus}
										styleName={s.steps_btn}>
										{state.current_step >= 3 ? 'Пітвердити' : 'Продовжити'}
									</Button>
								</div>
							</form>
						</div>
					</div>
				</section>)}
		</Fragment>
	)
}

export default AddTile
