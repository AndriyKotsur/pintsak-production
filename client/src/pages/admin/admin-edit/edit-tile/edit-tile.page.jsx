import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useEditTile from './edit-tile.logic'
import { HTTP } from '../../../../helpers'

const EditTile = () => {
  const history = useHistory()
  const { id } = useParams()
  const { tile, types } = useEditTile()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [type, setType] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [thickness, setThickness] = useState('')
  const [grey, setGrey] = useState('')
  const [red, setRed] = useState('')
  const [yellow, setYellow] = useState('')
  const [orange, setOrange] = useState('')
  const [brown, setBrown] = useState('')
  const [black, setBlack] = useState('')
  const [weight_per_meter, setWeight_per_meter] = useState('')
  const [pieces_per_meter, setPieces_per_meter] = useState('')
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [imagesPrevious, setImagesPrevious] = useState([])
  const [is_popular, setIs_popular] = useState(false)
  const [is_available, setIs_available] = useState(false)

  useEffect(() => {
    if (tile) {
      setTitle(tile.title)
      setUrl(tile.url)
      setType(tile.type)
      setWidth(tile.width)
      setHeight(tile.height)
      setThickness(tile.thickness)
      setGrey(tile.color_price.grey)
      setRed(tile.color_price.red)
      setYellow(tile.color_price.yellow)
      setOrange(tile.color_price.orange)
      setBrown(tile.color_price.brown)
      setBlack(tile.color_price.black)
      setWeight_per_meter(tile.weight_per_meter)
      setPieces_per_meter(tile.pieces_per_meter)
      setImagesPrevious(tile.images)
      setIs_popular(tile.is_popular)
      setIs_available(tile.is_available)
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
    setImages(imageArr)
    setImagesPreview(imagePre)
  }

  const updateTile = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      types.forEach(item => {
        if (item.title === type) formData.append("folderName", item.url);
      });
      formData.append("title", title);
      formData.append("url", url);
      formData.append("type", type);
      formData.append("width", width);
      formData.append("height", height);
      formData.append("thickness", thickness);
      formData.append("weight_per_meter", weight_per_meter);
      formData.append("pieces_per_meter", pieces_per_meter);
      formData.append("is_popular", is_popular);
      formData.append("is_available", is_available);
      const color_price = {
        grey: grey,
        yellow: yellow,
        orange: orange,
        red: red,
        brown: brown,
        black: black
      }
      formData.append("color_price", JSON.stringify(color_price));
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
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
                  {imagesPrevious.map(image => (
                    <img key={imagesPrevious.indexOf(image)} src={image} alt="Alt item"/>
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
                  {imagesPreview.length > 0 && imagesPreview.map(image => (
                    <img key={imagesPreview.indexOf(image)} src={image} alt="Alt item"/>
                  ))}
                  <br />
                  <label>Нові картинки</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Назва товару</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="text"
                    name="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Назва товару (aнгл)</label>
                </div>
                <div>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
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
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Ширина товару</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="number"
                    name="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Висота товару</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="number"
                    name="thickness"
                    value={thickness}
                    onChange={(e) => setThickness(e.target.value)}
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Товщина товару</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="number"
                    name="weight_per_meter"
                    value={weight_per_meter}
                    onChange={(e) => setWeight_per_meter(e.target.value)}
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Вага на метр кв.</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="number"
                    name="pieces_per_meter"
                    value={pieces_per_meter}
                    onChange={(e) => setPieces_per_meter(e.target.value)}
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Кількість на метр кв.</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="number"
                    name="grey"
                    value={grey}
                    onChange={(e) => setGrey(e.target.value)}
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
                    value={yellow}
                    onChange={(e) => setYellow(e.target.value)}
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
                    value={orange}
                    onChange={(e) => setOrange(e.target.value)}
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
                    value={red}
                    onChange={(e) => setRed(e.target.value)}
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
                    value={brown}
                    onChange={(e) => setBrown(e.target.value)}
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
                    value={black}
                    onChange={(e) => setBlack(e.target.value)}
                    pattern="[0-9-]+"
                    className="input contact-us__input"
                    required
                  />
                  <label className="label contact-us__label">Ціна чорної</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="checkbox"
                    name="is_popular"
                    checked={is_popular ? true : false}
                    onChange={(e) => setIs_popular(e.target.checked)}
                    className="input"
                  />
                  <label className="label contact-us__label">Популярна</label>
                </div>
                <div className="input-field contact-us-field">
                  <input
                    type="checkbox"
                    name="is_available"
                    checked={is_available ? true : false}
                    onChange={(e) => setIs_available(e.target.checked)}
                    className="input"
                  />
                  <label className="label contact-us__label">В наявності</label>
                </div>
                <p className="contact-us__required">обов’язкові поля *</p>
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