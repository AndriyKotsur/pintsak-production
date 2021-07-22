import React, { useState } from 'react'
import PropTypes from 'prop-types'

import s from './style.module.scss'
import classNames from 'classnames'

const Gallery = ({ images }) => {
	const [galleryIndex, setGalleryIndex] = useState(0)
	const [galleryImage, setGalleryImage] = useState(images[0])
	
	const handleActiveImage = e => {
		let imageIndex = e.currentTarget.dataset.index		
		if(imageIndex) setGalleryIndex(Number(imageIndex))
		
		let imageSource = e.currentTarget.dataset.image
		if(imageSource) setGalleryImage(imageSource)
	}

	return (
		<div className={s.gallery}>
			<div className={s.gallery_small}>
				{ images.length > 0 && images.map((item, index) => (
						<picture
							key={'gallery_'+ index}
							data-index={index}
							data-image={item}
							className={classNames(s.image_small, {[s.active]: index === galleryIndex})}
							onClick={e => handleActiveImage(e)}>
							<img src={item} alt="Small gallery" />
						</picture>
					)) }
			</div>
			<div className={s.gallery_large}>
				<picture className={s.image_large}>
					<img src={galleryImage} alt="Large gallery" />
				</picture>
			</div>
		</div>
	)
}

Gallery.propTypes = {
	images: PropTypes.array,
}

Gallery.defaultProps = {
	images: [],
}
export default Gallery
