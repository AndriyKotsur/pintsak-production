import React from 'react';
import useEditType from './edit-type.logic'
import EditType from './edit-type.page'

const EditTypeContext = React.createContext(null)

const EditTypeContainer = (props) => {
  return (
    <EditTypeContext.Provider value={useEditType()} >
      <EditType {...props} />
    </EditTypeContext.Provider>
  )
}

export default EditTypeContainer