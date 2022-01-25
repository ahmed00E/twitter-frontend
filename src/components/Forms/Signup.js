import { useContext } from 'react'
import styled from 'styled-components'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../contexts/User'
import Button from '../Button'
import Input from '../Input'
import { H3, ErrorMessage } from '../../styles/typography'
import { white, offWhite } from '../../styles/colors'
import { Row, Col, FloatingLabel } from 'react-bootstrap'
import Select from '../Select'

import { logIn, signUp } from '../../api/auth'
import { getDaysInMonth, getYears } from '../../helpers/moment'

const Form = styled.form`
  width: 320px;
  margin: 0 auto;
`

const SignupForm = () => {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const { values, errors, handleSubmit, handleChange } = useFormik({
    initialValues: {
      username: '',
      password: '',
      month: '',
      day: '',
      year: ''
    },
    onSubmit: async (values, { setFieldError }) => {
      const birthDate = moment(`${values.year}-${values.month}-${values.day}`).format()

      const { username, password } = values

      const response = await signUp({
        username,
        password,
        birthDate
      })

      if (response.error) {
        setFieldError('submit', response.error)
      } else {
        const user = await logIn({ username, password })
        setUser(user)
        navigate('/home')
      }
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required('Username is required'),
      password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short'),
      month: Yup.string()
        .required('Month is required'),
      day: Yup.string()
        .required('Day is required'),
      year: Yup.string()
        .required('Year is required')
    }),
    validateOnChange: false
  })

  return (
    <Form onSubmit={handleSubmit}>
      <H3>Create your account</H3>

      <FloatingLabel
        controlId="floatingInput"
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
        controlId="floatingInput"
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

      <Row>
        <Col xs="6">
          <Select
            initialOption={{ value: "", label: "Month" }}
            options={moment.months().map((month, i) => ({ value: i + 1, label: month }))}
            onChange={handleChange}
            value={values.month}
            name="month"
            error={errors.month}
          />
        </Col>
        <Col xs="3">
          <Select
            initialOption={{ value: "", label: "Day"}}
            options={getDaysInMonth(values.month)}
            onChange={handleChange}
            value={values.day}
            name="day"
            error={errors.day}
          />
        </Col>
        <Col xs="3">
          <Select
            initialOption={{ value: "", label: "Year"}}
            options={getYears()}
            onChange={handleChange}
            value={values.year}
            name="year"
            error={errors.year}
          />
        </Col>
      </Row>
      {errors.month && <ErrorMessage marginBottom>{errors.month}</ErrorMessage>}
      {errors.day && <ErrorMessage marginBottom>{errors.day}</ErrorMessage>}
      {errors.year && <ErrorMessage marginBottom>{errors.year}</ErrorMessage>}

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
        Sign in
      </Button>
      
      {errors.submit && <ErrorMessage marginTop>{errors.submit}</ErrorMessage>}
    </Form>
  )
}

export default SignupForm