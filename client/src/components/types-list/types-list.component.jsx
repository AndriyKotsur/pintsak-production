import React from 'react';

const TypesList = ({ types, editFunc, deleteFunc }) => {
  return (
    <>
      <div className="aside-navigation popular-aside-navigation">
        <h2 className="aside-navigation__header">
          Категорії товарів
        </h2>
        {types && types.map((type) => (
          <div key={type.type_uid}>
            <div>
              <span>{type.title}</span>
              <button onClick={()=> editFunc(type.type_uid)}>Редагувати</button>
              <button onClick={()=>deleteFunc(type.type_uid)}>Видалити</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default TypesList;