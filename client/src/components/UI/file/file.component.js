import React, { useEffect, useState } from 'react'
import s from './style.module.scss'

const File = ({ name, label, previous, onChange}) => {
	const [filename, setFilename] = React.useState(label)
	const [images, setImages] = useState([])

	const clickHandler = e => {
		let current = []
		let previous = []

		for(let i = 0; i < e.target.files.length; i++) {
			if(e.target.files.length == 1) setFilename(e.target.files[0].name)

			previous.push(URL.createObjectURL(e.target.files[i]))
			current.push(e.target.files[i])
		}
		setImages(previous)
		onChange(current)
	}

	useEffect(() => {
		if(images.length > 1) setFilename(`${images.length} картинки вибрано`)
	}, [images])

	return(
		<>
			{
				previous && previous.length > 0 &&
				<div className={s.previous}>
					<span>Попередня галерея</span>
					{ previous.map(image => (
						<picture key={previous.indexOf(image)} className={s.image}>
							<img
								src={image}
								alt="Preview image"/>
						</picture>
					)) }
				</div>
			}

			<div className={s.field}>
				<input
					id={name}
					name={name}
					type="file"
					onChange={clickHandler}
					className={s.input}
					multiple />
				<label htmlFor={name} className={s.label}>
					<span>{filename}</span>
				</label>
			</div>

			{
				images && images.length > 0 &&
				<div className={s.images}>
					{images.length > 0 && images.map(image => (
						<picture key={images.indexOf(image)} className={s.image}>
							<img
								src={image}
								alt="Preview image"/>
						</picture>
					))}
				</div>
			}
		</>
	)
}

export default File