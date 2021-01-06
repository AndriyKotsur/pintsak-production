import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { HTTP } from '../../../helpers'

const useCatalogue = () => {
	const params = useParams()
	const location = useLocation()
	const [loading, setLoading] = useState(false)
	const [tiles, setTiles] = useState()
	const [types, setTypes] = useState()
	const [typeTitle, setTypeTitle] = useState()

	useEffect(()=>{
		const fetchTypes = async () => {
			const response = await HTTP.getTypes()
			setTypes(response)
			const typeTitle = response.filter(type => type.url === params.type)
			setTypeTitle(typeTitle[0].title)
		}
		fetchTypes()
	}, [])

	useEffect(() => {
		const fetchTiles = async () => {
			setLoading(true)
			const response = await HTTP.getTiles(params.type, location.search)
			setTiles(response)
			setLoading(false)
		}
		fetchTiles()
	}, [params.type, location.search])

	return {
		loading,
		tiles,
		types,
		typeTitle,
	}
}

export default useCatalogue
