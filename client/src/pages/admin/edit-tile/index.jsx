import React, { Fragment, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTileActions from 'actions/edit-tile.action'

import { useFormik } from 'formik'
import { Background, Button, Preloader } from 'components'
import { Options, Characteristics, Prices } from './components'

import validationSchema from "./validationSchema"

import s from './style.module.scss'
import classNames from 'classnames'

const EditTile = () => {
	const history = useHistory()
	const { url } = useParams()

	const dispatch = useDispatch()
	const state = useSelector(state => state.editTile)

	const disabledStatus = Object.keys(state.prices).length <= 0 && state.current_step >= 3
	const loadingStatus = state.get_tile_status === 'loading' || state.get_types_status === 'loading'
	const successStatus = state.get_tile_status === 'success' && state.get_types_status

	const handlePrev = () => {
		dispatch(EditTileActions.handleChangeCurrentStep(state.current_step - 1))
	}

	const handleNext = () => {
		if (state.current_step >= 3) {
			handleSubmit()
		} else {
			dispatch(EditTileActions.handleChangeCurrentStep(state.current_step + 1))
			formik.setTouched({})
			formik.setErrors({})
		}
	}

	const handleSubmit = () => {
		dispatch(EditTileActions.editTile(url, state))
	}

	const formik = useFormik({
		initialValues: {
			images: state.images,
			title: state.title,
			width: state.sizes.width,
			height: state.sizes.height,
			thickness: state.sizes.thickness,
			weight: state.sizes.weight,
			quantity: state.sizes.quantity,
			prices: {
				color: '',
				price: ''
			}
		},
		enableReinitialize: true,
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
		if (state.edit_tile_status === 'success')
			history.push('/admin/dashboard')
	}, [state.edit_tile_status, history])

	useEffect(() => {
		dispatch(EditTileActions.getTile(url))
		dispatch(EditTileActions.getTileTypes())

		return () => dispatch(EditTileActions.clear())
	}, [url, dispatch])

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
				</section>
			)}
		</Fragment>
	)
}

export default EditTile
