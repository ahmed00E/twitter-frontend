import { useContext } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import { UserContext } from '../../contexts/User'
import Button from '../Button'
import Input from '../Input'
import { H3, ErrorMessage } from '../../styles/typography'
import { white, offWhite } from '../../styles/colors'
import { FloatingLabel } from 'react-bootstrap'

import { editUser } from '../../api/users'

const Form = styled.form`
  width: 320px;
  margin: 0 auto;
`

const SignupForm = () => {
  const navigate = useNavigate()
  const { setUser, user } = useContext(UserContext)

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: user.username || '',
      bio: user.bio || '',
      location: user.location || '',
      website: user.website || ''
    },

    onSubmit: async values => {
      const response = await editUser({
        ...values,
        usertag: `@${values.username}`,
        userId: user._id
      })

      if (response.error) {
        console.log('error')
      }

      setUser(response)
      navigate(`/${response.username}`)
    },
    validateOnChange: false,
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('Username is required'),
      bio: Yup.string() 
        .max(160, 'Password is too short'),
      location: Yup.string()
        .max(160, 'Location is too long'),
      webiste: Yup.string()
        .max(100, 'website is too long'),
    })
  })

  return (
    <Form onSubmit={handleSubmit}>
      <H3>Edit your profile</H3>

      <FloatingLabel
        controlId="usernameInput"
        label="Username"
        className="mb-3"
      >
        <Input
          placeholder="Username"
          name="username"
          type="text"
          onChange={handleChange}
          value ={values.username}
          error={errors.username}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="bioInput"
        label="Bio"
        className="mb-3"
      >
        <Input
          placeholder="Bio"
          name="bio"
          type="text"
          onChange={handleChange}
          value ={values.bio}
          error={errors.bio}
          large
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="locationInput"
        label="location"
        className="mb-3"
      >
        <Input
          placeholder="Location"
          name="location"
          type="location"
          onChange={handleChange}
          value ={values.location}
          error={errors.location}
        />
      </FloatingLabel>

      <FloatingLabel
        controlId="websiteInput"
        label="website"
        className="mb-3"
      >
        <Input
          placeholder="Website"
          name="website"
          type="website"
          onChange={handleChange}
          value ={values.website}
          error={errors.website}
        />
      </FloatingLabel>


      <Button
        type="submit"
        width='100%'
        round
        background={white}
        color="black"
        hover={{
          background: offWhite,
          color: "black"
        }}
      >
        Save
      </Button>
      
      {errors.submit && <ErrorMessage marginTop>{errors.submit}</ErrorMessage>}
    </Form>
  )
}

export default SignupForm