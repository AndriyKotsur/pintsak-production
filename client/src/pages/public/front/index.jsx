import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as GetTypesActions from 'actions/get-types.action'

import Hero from "./components/hero"
import Popular from "./components/popular"
import Advantages from "./components/advantages"
import Contact from "./components/contact/contact"

const FrontPage = () => {
	const dispatch = useDispatch()
	const types = useSelector(types => types.getTypes)

	useEffect(() => {
		dispatch(GetTypesActions.getTypes())
		return () => dispatch(GetTypesActions.clear())
	}, [])

	return (
		<>
			<Hero types={types} />
			<Popular types={types}/>
			<Advantages />
			<Contact />
		</>
	)
}

export default FrontPage
