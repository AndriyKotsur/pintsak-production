import React, { Fragment, useState, useEffect } from 'react'
import StepWizard from 'react-step-wizard'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'

import { Background, Button, Preloader } from 'components'
import { Options, Characteristics, Prices } from './components'

import s from './style.module.scss'
import classNames from 'classnames'

const AddTile = () => {
	const [stepWizard, setStepWizard] = useState()
	const [activeError, setActiveError] = useState(false)
	const [currentStep, setCurrentStep] = useState(1)

	const history = useHistory()
	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)

	const setSteps = e => setStepWizard(e)

	const handlePrev = () => {
		stepWizard.previousStep()
	}

	const handleNext = () => {
		dispatch(AddTileActions.handleChangeCurrentStep("step" + currentStep))
	}

	const handleValidate = (errors, touched) => {
		if (Object.keys(errors).length > 0 || Object.keys(touched).length === 0) {
			setActiveError(true)
		} else {
			setActiveError(false)
			stepWizard.nextStep()
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		dispatch(AddTileActions.addTile(state))
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
			{(state.get_types_status === 'loading') && <Preloader />}
			{state.get_types_status === 'success' && (
				<section className={s.steps_section}>
					<Background settings={{ hiddenLeft: false, hiddenRight: false }} />
					<div className="container">
						<div className={s.steps_wrapper}>
							<StepWizard initialStep={1} onStepChange={e => setCurrentStep(e.activeStep)} instance={setSteps}>
								<Options getData={handleValidate} />
								<Characteristics getData={handleValidate} />
								<Prices getData={handleValidate} />
							</StepWizard>

							<div className={classNames(s.steps_controllers, { [s.extended]: currentStep === 1 })}>
								{currentStep > 1 &&
									<Button
										type="button"
										background="orange"
										styleName={s.steps_btn}
										handleClick={handlePrev}>
										Назад
									</Button>}
								{currentStep >= 3
									? <Button
										type="button"
										background="orange"
										styleName={s.steps_btn}
										handleClick={handleSubmit}>
										Пітвердити
									</Button>
									: <Button
										type="button"
										background="orange"
										styleName={s.steps_btn}
										handleClick={handleNext}>
										Продовжити
									</Button>}
							</div>
						</div>
					</div>
				</section>)}
		</Fragment>
	)
}

export default AddTile
