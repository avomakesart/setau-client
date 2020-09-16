import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useParams, useHistory } from 'react-router-dom'
import { useForm } from '../../../../../../hooks/useForm'
import { fetchData } from '../../../../../../helpers/fetch'
import Navbar from '../../../../ui/Navbar/Navbar'
import Input from '../../../../ui/Input/Input'
import { InputContainer } from '../../../../ui/Input/Input.styles'
import TextArea from '../../../../ui/TextArea/TextArea'
import AboutEditMenu from '../../AboutEditMenu'
import authService from '../../../../../../services/auth-service'
import { PrivateMessage } from '../../../../hoc/PrivateMessage'

import { Button, DisabledButton, Toggle, ToggleText } from '../../About.styles'

import {
  FullSection,
  Container,
  Row,
  Column,
  AddFormBody,
} from '../../../BlogPost/BlogPost.styles'

export const UpdateMember = () => {
  const [updateValues, setUpdateValues] = useState([])
  const [openMenu, setOpenMenu] = useState(false)
  const [member_image, setImage] = useState('')
  const [, setLoading] = useState(false)
  const [showAdminBoard, setShowAdminBoard] = useState(false)
  const [, setCurrentUser] = useState(undefined)
  const [formValues, handleChange] = useForm({
    member_description: '',
    member_name: '',
    member_position: '',
  })

  const { member_description, member_name, member_position } = formValues

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
        `team_member/${id}`,
        {
          member_description,
          member_image,
          member_name,
          member_position,
        },
        'PUT'
      )

      const body = await resp.json()

      if (body) {
        setUpdateValues(true)
      }
    } catch (err) {
      setUpdateValues(false)
      Swal.fire('Algo salio mal :(', `${err.message}!`, 'error')
      console.log(err.message)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getTestimonialInfo = async () => {
      try {
        const resp = await fetchData(`team_member/${id}`, { signal: signal })
        const teamMembers = await resp.json()

        setUpdateValues(teamMembers)
      } catch (error) {
        console.log(error.message)
      }
    }
    getTestimonialInfo()
    return function cleanup() {
      abortController.abort()
    }
  }, [id])

  useEffect(() => {
    const user = authService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
    }
  }, [])

  const toggleMenu = () => {
    return setOpenMenu(!openMenu)
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
              <AddFormBody>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {!openMenu ? (
                    <>
                      <Toggle id="toggle" onClick={toggleMenu}>
                        &#8801;
                      </Toggle>
                      <ToggleText onClick={toggleMenu}>Menu</ToggleText>
                    </>
                  ) : (
                    <>
                      <Toggle id="toggle" onClick={toggleMenu}>
                        x
                      </Toggle>
                      <ToggleText onClick={toggleMenu}>Cerrar</ToggleText>
                    </>
                  )}

                  {openMenu && <AboutEditMenu />}
                </div>
                {updateValues.map((update) => (
                  <div key={update.id}>
                    <InputContainer>
                      <Input
                        id="member_name"
                        type="text"
                        name="member_name"
                        value={member_name}
                        label="Nombre:"
                        placeholder={update.member_name}
                        onChange={handleChange}
                      />

                      <Input
                        type="file"
                        name="file"
                        label="Imagen"
                        placeholder="Upload an image"
                        onChange={uploadImage}
                      />

                      <Input
                        id="member_image"
                        type="text"
                        name="member_image"
                        value={member_image}
                        placeholder={update.member_image}
                        onChange={handleChange}
                        style={{ display: 'none' }}
                      />

                      <Input
                        id="member_position"
                        type="text"
                        name="member_position"
                        value={member_position}
                        label="Posicion:"
                        placeholder={update.member_position}
                        onChange={handleChange}
                      />

                      <TextArea
                        id="member_description"
                        type="textarea"
                        name="member_description"
                        value={member_description}
                        label="Descripción:"
                        rows="5"
                        placeholder={update.member_description}
                        onChange={handleChange}
                      />
                    </InputContainer>
                    {
                      (member_description,
                      member_image,
                      member_name,
                      member_position ? (
                        <>
                          <Button onClick={handleUpdate} type="submit">
                            Actualizar testimonial
                          </Button>
                          <br />
                        </>
                      ) : (
                        <DisabledButton disabled>
                          Actualizar testimonial
                        </DisabledButton>
                      ))
                    }
                    <br />
                    <Button onClick={handleReturn} typs="button">
                      Regresar
                    </Button>
                  </div>
                ))}
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
