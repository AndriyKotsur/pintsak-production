import React, { useState } from 'react'
import s from './style.module.scss'

const File = ({ name, label, previous, onChange}) => {
	const [filename, setFilename] = React.useState(label)
	const [images, setImages] = useState([])

	const filenameHandler = files => {
		let text = 'картинок/и вибрано'

		if(files.length == 1) setFilename(files[0].name)
		else if (files.length > 1) setFilename(files.length + ' ' + text)
	}

	const clickHandler = e => {
		let files = e.target.files
		let current = []
		let previous = []

		for(let i = 0; i < files.length; i++) {
			previous.push(URL.createObjectURL(files[i]))
			current.push(files[i])
		}

		filenameHandler(files)
		setImages(previous)
		onChange(current)
	}

	return(
		<>
			{
				previous && previous.length > 0 &&
				<div className={s.previous}>
					{ previous.map(image => (
						<picture key={previous.indexOf(image)} className={s.image}>
							<img src={image} alt="Preview image"/>
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
							<img src={image} alt="Preview image"/>
						</picture>
					))}
				</div>
			}
		</>
	)
}

export default File