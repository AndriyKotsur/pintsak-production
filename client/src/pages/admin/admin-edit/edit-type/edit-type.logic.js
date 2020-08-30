import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import { HTTP } from '../../../../helpers'

const useEditType = () => {
  const { id } = useParams()
  const history = useHistory()
  const [type, setType] = useState()

  useEffect(() => {
    const fetchType = async () => {
      const response = await HTTP.getType(id)
      setType(response)
    }
    fetchType()
  }, [id])

  const updateType = async (e, title, title_url) => {
    e.preventDefault()
    try {
      await HTTP.updateType({id, title, title_url})
      history.push('/admin/main/type')
    } catch (err) {}
  }
  
  return {
    type,
    updateType,
  }
}

export default useEditType