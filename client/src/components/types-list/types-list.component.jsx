import React from 'react';
import { useHistory } from 'react-router-dom'
import { HTTP } from '../../helpers'

const TypesList = ({ types }) => {
  const history = useHistory()
  const onDeleteType = async (id) => {
    await HTTP.deleteType(id)
    window.location = '/admin/main/type'
  }
  return (
    <>
      {types && types.map((type) => (
        <div key={type.id}>
          <div>
            <span>{type.title}</span>
            <button onClick={() => history.push(`/admin/edit/type/${type.id}`)}>Редагувати</button>
            <button onClick={() => {onDeleteType(type.id)}}>Видалити</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default TypesList;