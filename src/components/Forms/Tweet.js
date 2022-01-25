import { useContext } from 'react'
import { useFormik } from 'formik'
import styled from 'styled-components'
import * as Yup from 'yup'

import { UserContext } from '../../contexts/User'
import Box from "../Containers/Box"
import TextArea from '../TextArea'
import Button from '../Button'
import { blue, borderColor, offBlue } from '../../styles/colors'

import { createTweet } from '../../api/tweets'
import { FeedContext } from '../../contexts/Feed'
import { ModalContext } from '../../contexts/Modal'

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

const Tweet = ({ noBorder }) => {
  const { user, getUser } = useContext(UserContext)
  const { fetchFeed } = useContext(FeedContext)
  const { close } = useContext(ModalContext)

  const {
    values,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues: {
      content: ''
    },
    onSubmit: async ({ content }, { resetForm }) => {
      await createTweet({
        content,
        author: user._id
      })
      await getUser()
      await fetchFeed()
      resetForm() 
      close()
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      content: Yup.string()
        .required()
        .max(280, 'Tweet trop long')
    })
  })

  return (
    <Box>
      <Form onSubmit={handleSubmit}>
        <TextArea
          placeholder="What's happening?"
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
            Tweet
          </Button>
        </Footer>
      </Form>
    </Box>
  )
}

export default Tweet
