import React, { useState, useEffect } from 'react'
import StepWizard from 'react-step-wizard'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'

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
		e.preventDefault()
		dispatch(AddTileActions.addTile(state))
	}

	useEffect(() => {
		if(state.add_tile_status === 'success')
			history.push('/admin/dashboard')
	}, [state.add_tile_status])

	useEffect(() => {
		dispatch(AddTileActions.getTileTypes())

		return () => dispatch(AddTileActions.clear())
	}, [])

	return (
		<section className={s.section}>
			<div className="container">
				<div className={s.wrapper}>
					<div className={s.steps}>
						<StepWizard initialStep={1} onStepChange={e => setCurrentStep(e.activeStep)} instance={setSteps}>
							<Options />
							<Characteristics />
							<Prices />
						</StepWizard>
					</div>

					<div className={classNames( s.controllers, {[s.extended]: currentStep == 1})}>
					{ currentStep > 1 &&
						<button
							type="button"
							className={classNames('btn-sent', 'btn-orange', s.btn)}
							onClick={handlePrev}>
								Назад
							</button> }
					{ currentStep >= 3
						? <button
								type="button"
								className={classNames('btn-sent', 'btn-orange', s.btn)}
								onClick={handleSubmit}>
									Додати товар
								</button>
						: <button
								type="button"
								className={classNames('btn-sent', 'btn-orange', s.btn)}
								onClick={handleNext}>
									Продовжити
							</button> }
					</div>
				</div>
			</div>
		</section>
	)
}

export default AddTile
