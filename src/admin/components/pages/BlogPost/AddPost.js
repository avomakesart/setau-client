import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { fetchData } from '../../../../helpers/fetch'
import { useForm } from '../../../../hooks/useForm'
import Navbar from '../../ui/Navbar/Navbar'
import Input from '../../ui/Input/Input'
import TitleInput from '../../ui/Input/TitleInput'
import TextArea from '../../ui/TextArea/TextArea'
import authService from '../../../../services/auth-service'
import { PrivateMessage } from '../../hoc/PrivateMessage'

import {
  InputWrapper,
  InputWrapperInner,
  InputContainer,
  Label,
} from '../../ui/Input/Input.styles'

import {
  Button,
  DisabledButton,
  FullSection,
  Container,
  Row,
  Column,
  AddFormBody,
  AddPostBtnContainer,
} from '../BlogPost/BlogPost.styles'

export const AddPost = () => {
  const [content, setContent] = useState('')
  const [featured_image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)
  const [formValues, handleChange] = useForm({
    title: '',
    metatitle: '',
    slug: '',
    summary: '',
    read_time: '',
  })

  const { title, metatitle, slug, summary, read_time } = formValues

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `blog_post`,
        {
          title,
          metatitle,
          slug,
          summary,
          content,
          read_time,
          featured_image,
        },
        'POST'
      )
      const body = await resp.json()
      console.log(body)
      Swal.fire(
        'Correct',
        `La entrada del blog se a publicado correctamente`,
        'success'
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    // [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    ['clean'],
    ['link', 'image', 'video'],
  ]

  const modules = {
    toolbar: toolbarOptions,
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
  }

  const uploadImage = async (e) => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'setau_assets')
    setLoading(true)
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/bluecatencode/upload',
      {
        method: 'POST',
        body: data,
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    console.log(file.secure_url)
    setLoading(false)
  }

  useEffect(() => {
    const user = authService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
    }
  }, [])

  return (
    <>
      {showAdminBoard ? (
        <>
          <Navbar />
          <FullSection>
            <Container>
              <Row>
                <Column>
                  <AddFormBody>
                    <TitleInput
                      id="title"
                      type="text"
                      name="title"
                      value={title}
                      placeholder="Añade un titulo"
                      onChange={handleChange}
                    />

                    <InputWrapper>
                      <InputWrapperInner>
                        <InputContainer>
                          <Input
                            id="metatitle"
                            type="text"
                            autoComplete="off"
                            name="metatitle"
                            value={metatitle}
                            label="Titulo meta"
                            placeholder="ej: welcome, cool, cats"
                            onChange={handleChange}
                          />
                        </InputContainer>
                        <InputContainer>
                          <Input
                            id="slug"
                            type="text"
                            autoComplete="off"
                            name="slug"
                            value={slug.toLowerCase()}
                            label="Slug"
                            placeholder="En minusculas, ej: cool_post"
                            onChange={handleChange}
                          />
                        </InputContainer>
                      </InputWrapperInner>

                      <InputWrapperInner>
                        <InputContainer>
                          <TextArea
                            id="summary"
                            type="text"
                            autoComplete="off"
                            name="summary"
                            value={summary}
                            label="Descripción corta"
                            placeholder="Una breve descripción"
                            onChange={handleChange}
                          />
                        </InputContainer>
                        <InputContainer>
                          <Input
                            id="read_time"
                            type="text"
                            autoComplete="off"
                            name="read_time"
                            value={read_time}
                            label="Tiempo de lectura"
                            placeholder="Ej: 30 minutos"
                            onChange={handleChange}
                          />
                        </InputContainer>
                      </InputWrapperInner>
                    </InputWrapper>

                    <InputContainer>
                      <Input
                        type="file"
                        name="file"
                        label="Imagen de la entrada"
                        placeholder="Upload an image"
                        onChange={uploadImage}
                      />

                      <Input
                        id="featured_image"
                        type="text"
                        name="featured_image"
                        value={featured_image}
                        onChange={handleChange}
                        style={{ display: 'none' }}
                      />
                      {loading ? (
                        <h3>Cargando...</h3>
                      ) : (
                        <>
                          {featured_image && (
                            <img
                              src={featured_image}
                              style={{ width: '300px' }}
                              alt="Featured Post"
                            />
                          )}
                        </>
                      )}
                      <br />

                      <Label>Contenido del post</Label>
                      <ReactQuill
                        value={content}
                        onChange={setContent}
                        theme="snow"
                        modules={modules}
                        name="content"
                      />
                    </InputContainer>
                    <AddPostBtnContainer>
                      {
                        (title !== '',
                        metatitle !== '',
                        slug !== '',
                        summary !== '',
                        content !== '',
                        read_time !== '',
                        featured_image !== '' ? (
                          <Button onClick={handleSubmit} type="submit">
                            Agregar Entrada
                          </Button>
                        ) : (
                          <DisabledButton disabled>
                            Agregar Entrada
                          </DisabledButton>
                        ))
                      }
                    </AddPostBtnContainer>
                  </AddFormBody>
                </Column>
              </Row>
            </Container>
          </FullSection>
        </>
      ) : (
        <PrivateMessage />
      )}
    </>
  )
}

AddPost.propTypes = {
  name: PropTypes.string,
}
