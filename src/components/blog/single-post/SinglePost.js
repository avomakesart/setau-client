import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import moment from 'moment'
import { fetchData } from '../../../helpers/fetch'
import { AddComment } from './AddComment'
import { Comments } from './Comments'
import Navbar from '../../ui/Navbar/Navbar'
import AuthService from '../../../services/auth-service'
import {
  Container,
  FeaturedImage,
  DateContainer,
  ReadTime,
  SinglePostTitle,
  Separator,
  ReturnButton,
} from './SinglePost.styles'
import InfoAlert from '../../ui/Alert/InfoAlert/InfoAlert'

export default function SinglePost() {
  const [, setShowModeratorBoard] = useState(false)
  const [, setShowAdminBoard] = useState(false)
  const [currentUser, setCurrentUser] = useState(undefined)

  const { id } = useParams()
  const history = useHistory()

  const [singlePost, setSinglePost] = useState([])
  const [comments, setComments] = useState([])

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push('/')
    } else {
      history.goBack()
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const getSinglePost = async () => {
      try {
        const resp = await fetchData(`blog_post/${id}`, { signal: signal })
        const postData = await resp.json()

        setSinglePost(postData)
      } catch (error) {
        console.log(error.message)
      }
    }

    const getComment = async () => {
      try {
        const resp = await fetchData(`blog_post/${id}/comments/${id}`, {
          signal: signal,
        })
        const commentData = await resp.json()
        setComments(commentData)
      } catch (error) {
        console.log(error.message)
      }
    }

    getComment()
    getSinglePost()

    return function cleanup() {
      abortController.abort()
    }
  }, [id])

  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      setCurrentUser(user)
      setShowModeratorBoard(user.roles.includes('ROLE_MODERATOR'))
      setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
    }
  }, [])

  return (
    <div>
      <Navbar />
      {singlePost.map((sp) => (
        <Container key={sp.id}>
          <SinglePostTitle className="animate__animated animate__fadeIn">
            {sp.title}
          </SinglePostTitle>
          <DateContainer>
            <p>{moment(`${sp.createdat}`).format('LL')} -</p>
            <ReadTime>{sp.read_time} de lectura -</ReadTime>
            <p> por: {sp.author_name}</p>
          </DateContainer>
          <FeaturedImage src={sp.featured_image} alt={sp.title} />
          <div>
            <div dangerouslySetInnerHTML={{ __html: sp.content }}></div>
          </div>
          <p>{sp.post_category}</p>
          <ReturnButton onClick={handleReturn}>Regresar</ReturnButton>
          <Separator />

          <Comments comments={comments} />
          {currentUser ? (
            <AddComment />
          ) : (
            <div className="center">
              <InfoAlert>
                <h5>
                  Inicia Sesión <Link to="/login">aqui</Link> para comentar
                </h5>
              </InfoAlert>
            </div>
          )}
        </Container>
      ))}
    </div>
  )
}
