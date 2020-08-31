import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { HTTP } from '../../../../helpers'

const AddTile = () => {
  const history = useHistory()
  const [types, setTypes] = useState([])
  const [title, setTitle] = useState('')
  const [title_url, setTitle_url] = useState('')
  const [type, setType] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [thickness, setThickness] = useState('')
  const [grey, setGrey] = useState(null)
  const [yellow, setYellow] = useState('-')
  const [orange, setOrange] = useState('-')
  const [red, setRed] = useState('-')
  const [brown, setBrown] = useState('-')
  const [black, setBlack] = useState('-')
  const [weight_per_meter, setWeight_per_meter] = useState('')
  const [pieces_per_meter, setPieces_per_meter] = useState('')
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await HTTP.getTypes()
      setTypes(response)
      setType(response[0].title)
    }
    fetchTypes()
  }, [])

  const addTile = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData();
      types.forEach(type => {
        if (type.title === type) {
          formData.append("folderName", type.title_url);
        }
      })
      formData.append("title_url", title_url.toLowerCase());
      formData.append("title", title);
      formData.append("type", type);
      formData.append("width", width);
      formData.append("height", height);
      formData.append("thickness", thickness);
      formData.append("weight_per_meter", weight_per_meter);
      formData.append("pieces_per_meter", pieces_per_meter);
      const color_price = { grey, yellow, orange, red, brown, black, }
      formData.append("color_price", JSON.stringify(color_price));
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      };

      await HTTP.addTile(formData)
      history.push('/admin/main/tile')
    } catch (err) {}
  }

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

  return (
    <>
      <div className="contact-us">
        <div className="container">
          <div className="contact-us-inner">
            <h2 className="contact-us__title">
              Додати товар
            </h2>
            <form onSubmit={(e) => addTile(e)} className="form contact-us-form">
              <div className="input-field contact-us-field">
                <input type="file" name="images" onChange={(e) => onImageChange(e)} className="input contact-us__input" multiple/>
                {imagesPreview.length > 0 && imagesPreview.map(image => (
                  <img key={imagesPreview.indexOf(image)} src={image} alt="Alt item"/>
                ))}
                <label>Картинка товару</label>
              </div>
              <div className="input-field contact-us-field">
                <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} className="input contact-us__input" required/>
                <label className="label contact-us__label">Назва товару</label>
              </div>
              <div className="input-field contact-us-field">
                <input type="text" name="title_url" onChange={(e) => setTitle_url(e.target.value)} className="input contact-us__input" required/>
                <label className="label contact-us__label">Назва товару (aнгл)</label>
              </div>
              <div>
                <select name="type" defaultValue={type} onChange={(e) => setType(e.target.value)} className="input contact-us__input" required>
                  {types ? types.map((type) => (
                    <option key={type.type_uid}>{type.title}</option>
                  ))
                  : <option>Немає доданих категорій</option>
                  }
                </select>
                <label>Категорія товару</label>
              </div>
              <div className="input-field contact-us-field">
                <input type="number" name="width" onChange={(e) => setWidth(e.target.value)} className="input contact-us__input" required/>
                <label className="label contact-us__label">Ширина товару</label>
              </div>
              <div className="input-field contact-us-field">
                <input type="number" name="height" onChange={(e) => setHeight(e.target.value)} className="input contact-us__input" required/>
                <label className="label contact-us__label">Висота товару</label>
              </div>
              <div className="input-field contact-us-field">
                <input type="number" name="thickness" onChange={(e) => setThickness(e.target.value)} className="input contact-us__input" required/>
                <label className="label contact-us__label">Товщина товару</label>
              </div>
              <div className="input-field contact-us-field">
                <input type="number" name="weight_per_meter" onChange={(e) => setWeight_per_meter(e.target.value)} className="input contact-us__input" required/>
                <label className="label contact-us__label">Вага на метр кв.</label>
              </div>
              <div className="input-field contact-us-field">
                <input type="number" name="pieces_per_meter" onChange={(e) => setPieces_per_meter(e.target.value)} className="input contact-us__input" required/>
                <label className="label contact-us__label">Кількість на метр кв.</label>
              </div>
              <div className="input-field contact-us-field">
                <input type="number" name="grey" onChange={(e) => setGrey(e.target.value)} className="input contact-us__input" required/>
                <label className="label contact-us__label">Ціна сірої</label>
              </div>
              <div className="input-field contact-us-field">
                <input type="number" name="yellow" onChange={(e) => setYellow(e.target.value)} className="input contact-us__input" />
                <label className="label contact-us__label">Ціна жовтої</label>
              </div>
              <div className="input-field contact-us-field">
                <input type="number" name="orange" onChange={(e) => setOrange(e.target.value)} className="input contact-us__input" />
                <label className="label contact-us__label">Ціна оранжевої</label>
              </div>
              <div className="input-field contact-us-field">
                <input type="number" name="red" onChange={(e) => setRed(e.target.value)} className="input contact-us__input" />
                <label className="label contact-us__label">Ціна червоної</label>
              </div>
              <div className="input-field contact-us-field">
                <input type="number" name="brown" onChange={(e) => setBrown(e.target.value)} className="input contact-us__input" />
                <label className="label contact-us__label">Ціна корич</label>
              </div>
              <div className="input-field contact-us-field">
                <input type="number" name="black" onChange={(e) => setBlack(e.target.value)} className="input contact-us__input" />
                <label className="label contact-us__label">Ціна чорної</label>
              </div>
              <p className="contact-us__required">обов’язкові поля</p>
              <button className="contact-us__btn">Пітвердити</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddTile