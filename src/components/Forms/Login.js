import { useContext } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom' 

import { UserContext } from '../../contexts/User'
import Button from '../Button'
import Input from '../Input'
import { H3, ErrorMessage } from '../../styles/typography'
import { white, offWhite } from '../../styles/colors'
import { FloatingLabel } from 'react-bootstrap'

import { logIn } from '../../api/auth'

const Form = styled.form`
  width: 320px;
  margin: 0 auto;
`

const LoginForm = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (values, { setFieldError }) => {
      try {
        const response = await logIn(values)
        setUser(response)
        navigate('/home')
      } catch (e) {
        setFieldError('submit', 'Incorrect username/password')
      }
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('Username is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short')
    }),
    validateOnChange: false
  })

  return (
    <Form onSubmit={handleSubmit}>
      <H3>Sign in to Twitter</H3>

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
        controlId="passwordInput"
        label="Password"
        className="mb-3"
      >
        <Input
          placeholder="Password"
          name="password"
          type="password"
          onChange={handleChange}
          value ={values.password}
          error={errors.password}
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
        Log in
      </Button>
      
      {errors.submit && <ErrorMessage marginTop>{errors.submit}</ErrorMessage>}
    </Form>
  )
}

export default LoginForm