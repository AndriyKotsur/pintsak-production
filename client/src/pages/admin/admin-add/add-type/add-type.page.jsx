import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { HTTP } from '../../../../helpers'

const AddType = () => {
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const addType = async (e) => {
    e.preventDefault();
    try {
        await HTTP.addType({ title, url });
        history.push('/admin/main/type')
    } catch (err) {}
  }

  return (
    <div className="contact-us">
      <div className="container">
        <div className="contact-us-inner">
          <h2 className="contact-us__title">
            Додати категорію
          </h2>
          <form onSubmit={(e) => addType(e)} className="form contact-us-form">
            <div className="input-field contact-us-field">
              <input type="text" name="title" onChange={(e) => {setTitle(e.target.value)}} className="input contact-us__input" required/>
              <label className="label contact-us__label">Назва категорії</label>
            </div>
            <div className="input-field contact-us-field">
              <input type="text" name="url" onChange={(e) => {setUrl(e.target.value)}} className="input contact-us__input" required/>
              <label className="label contact-us__label">Назва категорії (англ.)</label>
            </div>
            <p className="contact-us__required">обов’язкові поля</p>
            <button className="contact-us__btn">Пітвердити</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddType