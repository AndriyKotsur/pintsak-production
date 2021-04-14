import React, { Fragment, useEffect, useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as AddTileActions from 'actions/add-tile.action'
import { Form, Input, Select, Checkbox, File } from 'components'
import { Step1, Step2, Step3 } from './components'

const AddTile = () => {
	const history = useHistory()
	const dispatch = useDispatch()
	const state = useSelector(state => state.addTile)
	const currentStep = useSelector(state => state.addTile.step)

	const addTile = async e => {
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

	const step = useMemo(() => {
		const steps = {
			'0': <Step1 />,
			'1': <Step2 />,
			'2': <Step3 />,
		}
		return steps[currentStep]
	}, [currentStep])

	return (
		<Fragment>
			{ step }
		</Fragment>
	)
}

export default AddTile
