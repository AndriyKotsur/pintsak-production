import React, { useState } from 'react'
import s from './style.module.scss'

const Gallery = ({ images }) => {
	const [galleryImage, setGalleryImage] = useState(images[0])

	return (
		<div className={s.gallery}>
			<div className={s.gallery_small}>
				{
					images.length > 0 && images.map((item, index) => (
						<picture key={'gallery_' + index} className={s.image_small} onClick={() => setGalleryImage(item)}>
							<img src={item} alt="Gallery" />
						</picture>
					))
				}
			</div>
			<div className={s.gallery_large}>
				<picture className={s.image_large}>
					<img src={galleryImage} alt="Gallery" />
				</picture>
			</div>
		</div>
	)
}

export default Gallery
