import React from 'react'
import { Link } from 'react-router-dom'
import { AdminLogout } from '../'

const AdminMain = () => {
  return (
    <>
      <header>
        <nav>
          <Link to="/admin/main/tile">Список товарів</Link>
          <Link to="/admin/main/type">Список категорій</Link>
        </nav>
      </header>
      <AdminLogout />
    </>
  )
}

export default AdminMain