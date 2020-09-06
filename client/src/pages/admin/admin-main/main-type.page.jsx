import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HTTP } from '../../../helpers'
import { AdminMain } from '../'
import { TypesList } from '../../../components'

const MainType = () => {
  const [types, setTypes] = useState([])
  useEffect(() => {
    const fetchTypes = async () => {
      const allTypes = await HTTP.getTypes()
      setTypes(allTypes)
    }
    fetchTypes()
  }, [])

  return (
    <>
      <header>
        <AdminMain />
        <nav>
          <Link to="/admin/add/type">Додати категорію</Link>
        </nav>
      </header>
      <TypesList types={types} />
    </>
  )
}

export default MainType