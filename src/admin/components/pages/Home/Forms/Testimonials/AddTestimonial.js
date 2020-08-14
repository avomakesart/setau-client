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
    testimonial_desc: '',
    testimonial_img: '',
    testimonial_name: '',
  })

  const { testimonial_desc, testimonial_img, testimonial_name } = formValues

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const resp = await fetchData(
        `testimonials`,
        {
          testimonial_desc,
          testimonial_img,
          testimonial_name,
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
        id="testimonial_desc"
        type="textarea"
        name="testimonial_desc"
        value={testimonial_desc}
        label="Descripción:"
        rows="5"
        placeholder="Descripción de testimonial"
        onChange={handleChange}
      />

      <Input
        id="testimonial_img"
        type="text"
        name="testimonial_img"
        value={testimonial_img}
        label="Imagen:"
        placeholder="Url de foto de cliente"
        onChange={handleChange}
      />

      <Input
        id="testimonial_name"
        type="text"
        name="testimonial_name"
        value={testimonial_name}
        label="Nombre:"
        placeholder="Nombre del client"
        onChange={handleChange}
      />

      {
        (testimonial_desc,
        testimonial_img,
        testimonial_name ? (
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
