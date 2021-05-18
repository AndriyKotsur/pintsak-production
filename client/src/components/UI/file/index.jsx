import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import { Icon } from 'components'

import classNames from 'classnames'
import s from './style.module.scss'

const KILO_BYTES_PER_BYTE = 1000000
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 5000000
const DEFAULT_MAX_FILES_QUANTITY = 10

const File = ({ onChange, onDelete }) => {
  const state = useSelector(state => state.editTile)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [validFiles, setValidFiles] = useState([])
  const [error, setError] = useState(false)

  const fileInputField = useRef(null)

  const dragOver = (e) => {
    e.preventDefault()
  }

  const dragEnter = (e) => {
    e.preventDefault()
  }

  const dragLeave = (e) => {
    e.preventDefault()
  }

  const fileName = (filename) => {
    return filename.substring(0, filename.lastIndexOf(".")) + "." || filename
  }

  const fileType = (filename) => {
    return filename.substring(filename.lastIndexOf(".") + 1, filename.length) || filename
  }

  const fileSize = (size) => {
    return (size / KILO_BYTES_PER_BYTE).toFixed(2)
  }

  const validateFile = (file) => {
    const validateTypes = ["image/svg", "image/png", "image/jpeg", "image/jpg"]
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

  const handleDropUpload = (e) => {
    e.preventDefault()
    const newFiles = e.dataTransfer.files

    if (newFiles.length) {
      handleFiles(newFiles)
    }
  }

  const handleFiles = (files) => {
    if (files.length < DEFAULT_MAX_FILES_QUANTITY) {
      setError(false)
      for (let i = 0; i < files.length; i++) {
        if (validateFile(files[i])) {
          setError(false)
          setSelectedFiles(prev => [...prev, files[i]])
        } else {
          setError(true)
        }
      }
    } else {
      setError(true)
    }
  }

  const handleDelete = (filename) => {
    const validFileIndex = validFiles.findIndex(element => element.name === filename)
    validFiles.splice(validFileIndex, 1)
    setValidFiles([...validFiles])

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

    setValidFiles([...filteredArray])
    onChange([...filteredArray])
  }, [selectedFiles])

  return (
    <div className={s.container}>
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
              type="file"
              value=""
              onChange={handleClickUpload}
              accept="image/svg, image/x-png, image/jpeg"
              className={s.upload_input}
              multiple />
            <button type="button" onClick={handleClick} className={s.upload_button}>Додати файли</button>
          </div>
          <span className={s.upload_remarks}>Максимальний розмір файла: 5МБ</span>
          {error && <span className={s.upload_error}>Файл не відповідає заданим параметрам!</span>}
        </div>
      </div>
      {
        validFiles.length > 0 &&
        <div className={s.preview}>
          {
            validFiles.map((file, index) =>
              <div key={'file_' + index} className={s.preview_item}>
                <picture className={s.preview_image}>
                  <img src={URL.createObjectURL(file)} alt={'image_' + index} />
                </picture>
                <div className={s.preview_info}>
                  <div className={s.preview_file}>
                    <button
                      type="button"
                      onClick={() => handleDelete(file.name)}
                      className={s.preview_delete}>
                      <Icon name="close" className={classNames('icon', s.preview_icon)} />
                    </button>
                    <span className={s.preview_name}>{fileName(file.name)}</span>
                    <span className={s.preview_type}>{fileType(file.name)}</span>
                  </div>
                  <span className={s.preview_size}>{fileSize(file.size)}MБ</span>
                </div>
              </div>
            )
          }
        </div>
      }
      {
        state.imagesPreview && state.imagesPreview.length > 0 &&
        state.imagesPreview.map((file, index) =>
          <div key={'file_' + index} className={s.preview_item}>
            <picture className={s.preview_image}>
              <img src={file} alt={'image_' + index} />
            </picture>
            <div className={s.preview_info}>
              <div className={s.preview_file}>
                <button
                  type="button"
                  onClick={() => onDelete(file, state._id)}
                  className={s.preview_delete}>
                  <Icon name="close" className={classNames('icon', s.preview_icon)} />
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default File