import React, { useState, useEffect, Fragment } from 'react'
import StepWizard from 'react-step-wizard'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'

import { Background, Preloader } from 'components'
import { Options, Characteristics, Prices } from './components'

import s from './style.module.scss'
import classNames from 'classnames'

const AddTile = () => {
	const [stepWizard, setStepWizard] = useState()
	const [currentStep, setCurrentStep] = useState(1)

	const history = useHistory()
	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)

	const setSteps = (e) => setStepWizard(e)

	const handlePrev = () => stepWizard.previousStep()
	const handleNext = () => stepWizard.nextStep()

	const handleSubmit = async e => {
		const { prices, title, width, height, thickness, weight_per_meter, pieces_per_meter } = state
		e.preventDefault()
		if (Object.keys(prices).length >= 1 && title && width && height && thickness && weight_per_meter && pieces_per_meter)
			dispatch(AddTileActions.addTile(state))
		else
			alert('Fill all fields')
	}

	useEffect(() => {
		if (state.add_tile_status === 'success')
			history.push('/admin/dashboard')
	}, [state.add_tile_status, history])

	useEffect(() => {
		dispatch(AddTileActions.getTileTypes())

		return () => dispatch(AddTileActions.clear())
	}, [dispatch])

	return (
		<Fragment>
			{ (state.get_types_status === 'loading') && <Preloader />}
			{ state.get_types_status === 'success' && (
				<section className={s.section}>
					<Background settings={{ hiddenLeft: false, hiddenRight: false }} />
					<div className="container">
						<div className={s.wrapper}>
							<StepWizard initialStep={1} onStepChange={e => setCurrentStep(e.activeStep)} instance={setSteps}>
								<Options />
								<Characteristics />
								<Prices />
							</StepWizard>

							<div className={classNames(s.controllers, { [s.extended]: currentStep === 1 })}>
								{currentStep > 1 &&
									<button
										type="button"
										className={classNames('btn-sent', 'btn-orange', s.btn)}
										onClick={handlePrev}>
										Назад
								</button>}
								{currentStep >= 3
									? <button
										type="button"
										className={classNames('btn-sent', 'btn-orange', s.btn)}
										onClick={handleSubmit}>
										Пітвердити
									</button>
									: <button
										type="button"
										className={classNames('btn-sent', 'btn-orange', s.btn)}
										onClick={handleNext}>
										Продовжити
								</button>}
							</div>
						</div>
					</div>
				</section>)}
		</Fragment>
	)
}

export default AddTile
