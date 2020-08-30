import React from 'react';
import useEditTile from './edit-tile.logic'
import EditTile from './edit-tile.page'

const EditTileContext = React.createContext(null)

const EditTileContainer = (props) => {
  return (
    <EditTileContext.Provider value={useEditTile()} >
      <EditTile {...props} />
    </EditTileContext.Provider>
  )
}

export default EditTileContainer