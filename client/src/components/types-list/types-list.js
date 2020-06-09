import React, {Fragment} from 'react';

const TypesList = ({types, editFunc, deleteFunc}) => {
    return(
        <Fragment>
                <div class="aside-navigation popular-aside-navigation">
                    <h2 class="aside-navigation__header">
                        Категорії товарів
                    </h2>
                    {
                    (types && types.length) ? (
                        types.map((type)=>(
                            <div key={type.type_uid}>
                                <div>
                                    <span>{type.title}</span>
                                    <button onClick={()=> editFunc(type.type_uid)}>Редагувати</button>
                                    <button onClick={()=>deleteFunc(type.type_uid)}>Видалити</button>
                                </div>
                            </div>

                        ))
                    ): "Нема створених категорії"
                    }
                </div>
        </Fragment>
    )
}

export default TypesList;