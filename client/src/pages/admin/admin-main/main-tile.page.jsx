import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HTTP } from '../../../helpers'
import { AdminMain } from '../'
import { TilesList } from '../../../components'

const MainTile = () => {
  const [tiles, setTiles] = useState([])
  useEffect(() => {
    const fetchTiles = async () => {
      const allTiles = await HTTP.getAllTiles()
      setTiles(allTiles)
    }
    fetchTiles()
  }, [])

  return (
    <>
      <header>
        <AdminMain />
        <nav>
          <Link to="/admin/add/tile">Додати товар</Link>
        </nav>
      </header>
      <TilesList tiles={tiles} />
    </>
  )
}

export default MainTile