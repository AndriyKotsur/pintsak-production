import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useEditTile from './edit-tile.logic'
import { HTTP } from '../../../../helpers'

const EditTile = () => {
  const history = useHistory()
  const { id } = useParams()
  const { tile, types } = useEditTile()
  const [tileTitle, setTileTitle] = useState('')
  const [tileUrl, setTileUrl] = useState('')
  const [tileType, setTileType] = useState('')
  const [tileWidth, setTileWidth] = useState('')
  const [tileHeight, setTileHeight] = useState('')
  const [tileThickness, setTileThickness] = useState('')
  const [tileGrey, setTileGrey] = useState('')
  const [tileRed, setTileRed] = useState('')
  const [tileYellow, setTileYellow] = useState('')
  const [tileOrange, setTileOrange] = useState('')
  const [tileBrown, setTileBrown] = useState('')
  const [tileBlack, setTileBlack] = useState('')
  const [tileWeight_per_meter, setTileWeight_per_meter] = useState('')
  const [tilePieces_per_meter, setTilePieces_per_meter] = useState('')
  const [tileImages, setTileImages] = useState([])
  const [tileImagesPreview, setTileImagesPreview] = useState([])
  const [tileImagesPrevious, setTileImagesPrevious] = useState([])

  useEffect(() => {
    if (tile) {
      setTileTitle(tile.title)
      setTileUrl(tile.url)
      setTileType(tile.type)
      setTileWidth(tile.width)
      setTileHeight(tile.height)
      setTileThickness(tile.thickness)
      setTileGrey(tile.color_price.grey)
      setTileRed(tile.color_price.red)
      setTileYellow(tile.color_price.yellow)
      setTileOrange(tile.color_price.orange)
      setTileBrown(tile.color_price.brown)
      setTileBlack(tile.color_price.black)
      setTileWeight_per_meter(tile.weight_per_meter)
      setTilePieces_per_meter(tile.pieces_per_meter)
      setTileImagesPrevious(tile.images)
    }
  }, [tile])

  const onImageChange = (e) => {
    let imageObj = [];
    imageObj.push(e.target.files);
    let imageArr = [];
    let imagePre = [];
    for(let i = 0; i < imageObj[0].length; i++) {
        imagePre.push(URL.createObjectURL(imageObj[0][i]));
        imageArr.push(imageObj[0][i]);
    }
    setTileImages(imageArr)
    setTileImagesPreview(imagePre)
  }

  const updateTile = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      types.forEach(item => {
        if (item.title === tileType) formData.append("folderName", item.url);
      });
      formData.append("title", tileTitle);
      formData.append("url", tileUrl);
      formData.append("type", tileType);
      formData.append("width", tileWidth);
      formData.append("height", tileHeight);
      formData.append("thickness", tileThickness);
      formData.append("weight_per_meter", tileWeight_per_meter);
      formData.append("pieces_per_meter", tilePieces_per_meter);
      const color_price = {
        grey: tileGrey,
        yellow: tileYellow,
        orange: tileOrange,
        red: tileRed,
        brown: tileBrown,
        black: tileBlack
      }
      formData.append("color_price", JSON.stringify(color_price));
      for (let i = 0; i < tileImages.length; i++) {
        formData.append('images', tileImages[i]);
      };
      await HTTP.updateTile( id, formData )
      history.push('/admin/main/tile')
    } catch (err) {}
  }

  return (
    <>
      {tile && (
        <div className="contact-us">
          <div className="container">
            <div className="contact-us-inner">
              <h2 className="contact-us__title">
                Редагувати товар
              </h2>
              <form
                onSubmit={(e) => {updateTile(e)}}
                className="form contact-us-form"
              >
                <div>
                  <label>Попередні картинки</label>
                  {tileImagesPrevious.map(image => (
                    <img key={tileImagesPrevious.indexOf(image)} src={image} alt="Alt item"/>
                  ))}
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="file"
                    name="images"
                    onChange={onImageChange}
                    className="input contact-us__input"
                    multiple
                  />
                  {tileImagesPreview.length > 0 && tileImagesPreview.map(image => (
                    <img key={tileImagesPreview.indexOf(image)} src={image} alt="Alt item"/>
                  ))}
                  <br />
                  <label>Нові картинки</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="text"
                    name="title"
                    value={tileTitle}
                    onChange={(e) => setTileTitle(e.target.value)}
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Назва товару</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="text"
                    name="url"
                    value={tileUrl}
                    onChange={(e) => setTileUrl(e.target.value)}
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Назва товару (aнгл)</label>
                </div>
                <div>
                  <select
                    value={tileType}
                    onChange={(e) => setTileType(e.target.value)}
                    name="type"
                    className="input contact-us__input"
                    required
                  >
                    {types && tile ? (
                      types.map((type) => (
                        <option key={type.id} >{type.title}</option>
                      ))
                    ) : <option>Немає доданих категорій</option>
                    }
                  </select>
                  <label>Категорія товару</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="number"
                    name="width"
                    value={tileWidth}
                    onChange={(e) => setTileWidth(e.target.value)}
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Ширина товару</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="number"
                    name="height"
                    value={tileHeight}
                    onChange={(e) => setTileHeight(e.target.value)}
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Висота товару</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="number"
                    name="thickness"
                    value={tileThickness}
                    onChange={(e) => setTileThickness(e.target.value)}
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Товщина товару</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="number"
                    name="weight_per_meter"
                    value={tileWeight_per_meter}
                    onChange={(e) => setTileWeight_per_meter(e.target.value)}
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Вага на метр кв.</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="number"
                    name="pieces_per_meter"
                    value={tilePieces_per_meter}
                    onChange={(e) => setTilePieces_per_meter(e.target.value)}
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Кількість на метр кв.</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="number"
                    name="grey"
                    value={tileGrey}
                    onChange={(e) => setTileGrey(e.target.value)}
                    pattern="[0-9]"
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Ціна сірої</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="text"
                    name="yellow"
                    value={tileYellow}
                    onChange={(e) => setTileYellow(e.target.value)}
                    pattern="[0-9-]+"
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Ціна жовтої</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="text"
                    name="orange"
                    value={tileOrange}
                    onChange={(e) => setTileOrange(e.target.value)}
                    pattern="[0-9-]+"
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Ціна оранжевої</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="text"
                    name="red"
                    value={tileRed}
                    onChange={(e) => setTileRed(e.target.value)}
                    pattern="[0-9-]+"
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Ціна червоної</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="text"
                    name="brown"
                    value={tileBrown}
                    onChange={(e) => setTileBrown(e.target.value)}
                    pattern="[0-9-]+"
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Ціна корич</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="text"
                    name="black"
                    value={tileBlack}
                    onChange={(e) => setTileBlack(e.target.value)}
                    pattern="[0-9-]+"
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Ціна чорної</label>
                </div>
                <p className="contact-us__required">обов’язкові поля</p>
                <button className="contact-us__btn">Пітвердити</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EditTile