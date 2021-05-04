import React, { Fragment, useState, useEffect } from 'react'
import StepWizard from 'react-step-wizard'
import { useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as EditTileActions from 'actions/edit-tile.action'

import { Preloader } from 'components'
import { Options, Characteristics, Prices } from './components'

import s from './style.module.scss'
import classNames from 'classnames'

const EditTile = () => {
	const [stepWizard, setStepWizard] = useState()
	const [currentStep, setCurrentStep] = useState(1)

	const history = useHistory()
	const { url } = useParams()

	const dispatch = useDispatch()
	const state = useSelector(state => state.editTile)

	const setSteps = (e) => setStepWizard(e)

	const handlePrev = () => stepWizard.previousStep()
	const handleNext = () => stepWizard.nextStep()

	const handleSubmit = async e => {
		e.preventDefault()
		dispatch(EditTileActions.editTile(url, state))
	}

	useEffect(() => {
		if(state.edit_tile_status === 'success')
			history.push('/admin/dashboard')
	}, [state.edit_tile_status])

	useEffect(() => {
		dispatch(EditTileActions.getTile(url))
		dispatch(EditTileActions.getTileTypes())

		return () => dispatch(EditTileActions.clear())
	}, [url])

	return (
		<Fragment>
			{ (state.get_tile_status === 'loading' || state.get_types_status === 'loading') && <Preloader /> }
			{ state.get_tile_status === 'success' && state.get_types_status && (
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
											Редагувати товар
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
			)}
		</Fragment>
	)
}

export default EditTile
