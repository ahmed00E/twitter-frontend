import { useContext } from 'react'
import { useFormik } from 'formik'
import styled from 'styled-components'
import * as Yup from 'yup'

import { UserContext } from '../../contexts/User'
import Box from "../Containers/Box"
import TextArea from '../TextArea'
import Button from '../Button'
import { blue, borderColor, offBlue } from '../../styles/colors'

import { postComment } from '../../api/comments'
import { ModalContext } from '../../contexts/Modal'
import { FeedContext } from '../../contexts/Feed'

const Form = styled.form`
  width: 100%;
`

const Footer = styled.div`
  border-top: solid ${props => props.noBorder ? '0' : '1'}px ${borderColor};
  padding-top: 16px;
  padding-bottom: 8px;
  display: flex;
  justify-content: flex-end;
`

const Comment = ({ noBorder, callback }) => {
  const { user, getUser } = useContext(UserContext)
  const { fetchFeed } = useContext(FeedContext)
  const { close, commentTweetId } = useContext(ModalContext)

  const {
    values,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues: {
      content: ''
    },
    onSubmit: async ({ content }, { resetForm }) => {
      await postComment({
        content,
        author: user._id,
        tweet: commentTweetId
      })

      await getUser()
      await fetchFeed()

      if (callback) {
        await callback()
      }

      resetForm() 
      close()
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      content: Yup.string()
        .required()
    })
  })

  return (
    <Box>
      <Form onSubmit={handleSubmit}>
        <TextArea
          placeholder="Comment your reply!"
          onChange={handleChange}
          value={values.content}
          name="content"
        />
        <Footer noBorder={noBorder}>
          <Button
            background={blue}
            round
            disabled={!values.content}
            disabledBackground={offBlue}
            type="submit"
            hover={{
              background: offBlue
            }}
          >
            Comment
          </Button>
        </Footer>
      </Form>
    </Box>
  )
}

export default Comment
