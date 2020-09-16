import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { fetchData } from '../../../../helpers/fetch'
import { useForm } from '../../../../hooks/useForm'
import Navbar from '../../ui/Navbar/Navbar'
import Input from '../../ui/Input/Input'
import TextArea from '../../ui/TextArea/TextArea'
import TitleInput from '../../ui/Input/TitleInput'
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

export const EditPost = () => {
  const [content, setContent] = useState('')
  const [updateValue, setUpdateValue] = useState([])
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

  const { id } = useParams()
  const history = useHistory()

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push('/')
    } else {
      history.goBack()
    }
  }

  const handleUpdate = async (e) => {
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

      if (body) {
        setUpdateValue(true)
      }
    } catch (err) {
      setUpdateValue(false)
      Swal.fire('Algo salio mal :(', `${err.message}!`, 'error')
      console.log(err.message)
    }
  }

  useEffect(() => {
    const user = authService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
    }
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getPostInfo = async () => {
      try {
        const resp = await fetchData(`blog_post/${id}`, { signal: signal })
        const blogpost = await resp.json()

        setUpdateValue(blogpost)
      } catch (error) {
        console.log(error.message)
      }
    }
    getPostInfo()
    return function cleanup() {
      abortController.abort()
    }
  }, [id])

  console.log(id)

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

  return (
    <>
      {showAdminBoard ? (
        <>
          <Navbar />
          <FullSection>
            <Container>
              <Row>
                <Column>
                  {updateValue.map((post) => (
                    <AddFormBody key={post.id}>
                      <TitleInput
                        id="title"
                        type="text"
                        name="title"
                        value={title}
                        placeholder={post.title}
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
                              placeholder={post.metatitle}
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
                              placeholder={post.slug}
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
                              placeholder={post.summary}
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
                              placeholder={post.read_time}
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
                          <h3>Loading...</h3>
                        ) : (
                          <img
                            src={post.featured_image}
                            style={{ width: '300px' }}
                            alt="Client"
                          />
                        )}
                        <br />

                        <Label>Contenido del post</Label>
                        <ReactQuill
                          value={content}
                          onChange={setContent}
                          theme="snow"
                          placeholder={post.content}
                          modules={modules}
                          name="content"
                        />
                      </InputContainer>

                      <AddPostBtnContainer>
                        {
                          (title,
                          metatitle,
                          slug,
                          summary,
                          content,
                          read_time,
                          featured_image ? (
                            <Button onClick={handleUpdate} type="submit">
                              Actualizar Entrada
                            </Button>
                          ) : (
                            <DisabledButton disabled>
                              Actualizar Entrada
                            </DisabledButton>
                          ))
                        }
                      </AddPostBtnContainer>
                    </AddFormBody>
                  ))}
                  <Button onClick={handleReturn}>Regresar</Button>
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
