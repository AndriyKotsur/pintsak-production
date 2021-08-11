import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import { Icon } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const KILO_BYTES_PER_BYTE = 1000000
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5000000
const DEFAULT_MAX_FILES_QUANTITY = 10

const File = ({
  id,
  error,
  errorName,
  name,
  validFiles = [],
  previewFiles = [],
  handleChange,
  handleDelete
}) => {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [activeError, setActiveError] = useState(false)

  const fileInputField = useRef(null)

  const dragOver = e => {
    e.preventDefault()
  }

  const dragEnter = e => {
    e.preventDefault()
  }

  const dragLeave = e => {
    e.preventDefault()
  }

  const fileName = filename => {
    return filename.substring(0, filename.lastIndexOf('.')) + '.' || filename
  }

  const fileType = filename => {
    return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename
  }

  const fileSize = size => {
    return (size / KILO_BYTES_PER_BYTE).toFixed(2)
  }

  const validateFile = file => {
    const validateTypes = ['image/svg', 'image/png', 'image/jpeg', 'image/jpg']
    if (validateTypes.indexOf(file.type) === -1 || file.size > DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
      return false
    }
    return true
  }

  const handleClick = () => {
    fileInputField.current.click()
  }

  const handleClickUpload = () => {
    if (fileInputField.current.files.length) handleFiles(fileInputField.current.files)
  }

  const handleDropUpload = e => {
    e.preventDefault()
    const newFiles = e.dataTransfer.files

    if (newFiles.length) {
      handleFiles(newFiles)
    }
  }

  const handleFiles = files => {
    if (files.length < DEFAULT_MAX_FILES_QUANTITY) {
      setActiveError(false)
      for (let i = 0; i < files.length; i++) {
        if (validateFile(files[i])) {
          setActiveError(false)
          setSelectedFiles(prev => [...prev, files[i]])
        } else {
          setActiveError(true)
        }
      }
    } else {
      setActiveError(true)
    }
  }

  const handleRemove = filename => {
    const validFileIndex = validFiles.findIndex(element => element.name === filename)
    validFiles.splice(validFileIndex, 1)

    const selectedFileIndex = selectedFiles.findIndex(element => element.name === filename)
    selectedFiles.splice(selectedFileIndex, 1)
    setSelectedFiles([...selectedFiles])
  }

  useEffect(() => {
    let filteredArray = selectedFiles.reduce((files, current) => {
      const element = files.find(item => item.name === current.name)
      if (!element) {
        return files.concat([current])
      } else {
        return files
      }
    }, [])

    if (filteredArray.length > 0) handleChange([...filteredArray])
    // eslint-disable-next-line
  }, [selectedFiles])

  return (
    <div className={classNames(s.upload, { [s.error]: activeError || error })}>
      <div className={s.upload_container}>
        <div className={s.upload_area}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={handleDropUpload}>
          <h2 className={s.upload_title}>Завантаження файлів</h2>
          <p className={s.upload_description}>Підтримувані формати: JPEG, PNG або SVG</p>
          <div className={s.upload_group}>
            <input
              ref={fileInputField}
              type='file'
              name={name}
              value=''
              onChange={handleClickUpload}
              accept='image/svg, image/x-png, image/jpeg'
              className={s.upload_input}
              multiple />
            <button type='button' onClick={handleClick} className={s.upload_button}>Додати файли</button>
          </div>
          <span className={s.upload_remarks}>Максимальний розмір файла: 5МБ</span>
          {(activeError || errorName) &&
            <span className={s.upload_error}>
              {errorName ? errorName : 'Файл не відповідає заданим параметрам!'}
            </span>}
        </div>
      </div>
      {validFiles.length > 0 &&
        <div className={s.list}>
          {validFiles.map((file, index) =>
            <div key={'file_' + index} className={s.list_item}>
              <picture className={s.list_image}>
                <img src={URL.createObjectURL(file)} alt={'image_' + index} />
              </picture>
              <div className={s.list_info}>
                <div className={s.list_file}>
                  <button
                    type='button'
                    onClick={() => handleRemove(file.name)}
                    className={s.list_delete}>
                    <Icon name='close' className={classNames('icon', s.list_icon)} />
                  </button>
                  <span className={s.list_name}>{fileName(file.name)}</span>
                  <span className={s.list_type}>{fileType(file.name)}</span>
                </div>
                <span className={s.list_size}>{fileSize(file.size)}MБ</span>
              </div>
            </div>
          )}
        </div>}

      {previewFiles && previewFiles.length > 0 &&
        <div className={s.preview}>
          <div className={s.preview_container}>
            {previewFiles.map((file, index) =>
              <div key={'file_' + index} className={s.preview_item}>
                <picture className={s.preview_image}>
                  <img src={file} alt={'image_' + index} />
                </picture>
                <button
                  type='button'
                  onClick={() => handleDelete(file, id)}
                  className={s.preview_delete}>
                  <Icon name='close' className={classNames('icon', s.preview_icon)} />
                </button>
              </div>
            )}
          </div>
        </div>}
    </div>
  )
}

File.propTypes = {
  id: PropTypes.string,
  error: PropTypes.any,
  errorName: PropTypes.any,
  name: PropTypes.string,
  validFiles: PropTypes.any,
  previewFiles: PropTypes.any,
  handleChange: PropTypes.func,
  handleDelete: PropTypes.func
}

File.defaultProps = {
  id: '',
  error: false,
  errorName: '',
  name: '',
  validFiles: [],
  previewFiles: [],
  onChange: () => null,
  onDelete: () => null
}
export default File