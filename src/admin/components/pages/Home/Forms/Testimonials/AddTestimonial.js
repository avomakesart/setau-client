import React from 'react'
import Swal from 'sweetalert2'
import { fetchData } from '../../../../../../helpers/fetch'
import { useForm } from '../../../../../../hooks/useForm'
import { Button, DisabledButton } from '../../Home.styles'
import {
  TextArea,
  Input,
} from '../../../../../../components/blog/single-post/SinglePost.styles'

export const AddTestimonial = () => {
  const [formValues, handleChange] = useForm({
    testimonials_desc: '',
    testimonials_img: '',
    testimonials_name: '',
  })

  const { testimonials_desc, testimonials_img, testimonials_name } = formValues

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `testimonials`,
        {
          testimonials_desc,
          testimonials_img,
          testimonials_name,
        },
        'POST'
      )
      const body = await resp.json()
      console.log(body)
      Swal.fire(
        'Correct',
        `El testimonial se a publicado correctamente`,
        'success'
      ).then(
        setTimeout(() => {
          window.location.reload(true)
        }, 2000)
      )
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <div>
      <TextArea
        id="testimonials_desc"
        type="textarea"
        name="testimonials_desc"
        value={testimonials_desc}
        label="Descripción:"
        rows="5"
        placeholder="Descripción de testimonial"
        onChange={handleChange}
      />

      <Input
        id="testimonials_img"
        type="text"
        name="testimonials_img"
        value={testimonials_img}
        label="Imagen:"
        placeholder="Url de foto de cliente"
        onChange={handleChange}
      />

      <Input
        id="testimonials_name"
        type="text"
        name="testimonials_name"
        value={testimonials_name}
        label="Nombre:"
        placeholder="Nombre del client"
        onChange={handleChange}
      />

      {
        (testimonials_desc,
        testimonials_img,
        testimonials_name ? (
          <Button onClick={handleSubmit} type="submit">
            Agregar testimonial
          </Button>
        ) : (
          <DisabledButton disabled>Agregar testimonial</DisabledButton>
        ))
      }
    </div>
  )
}
