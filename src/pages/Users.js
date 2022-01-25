import { useState, useEffect } from 'react'

import { LeftContainer } from '../components/Containers/Containers'
import Main from '../layouts/Main'
import User from '../components/User'

import { getUsers } from '../api/users'
import PageHeader from '../components/Headers/PageHeader'

const Home = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const users = await getUsers()
    setUsers(users)
    setLoading(false)
  }

  return (
    <Main
      loading={loading}
      header={<PageHeader title="Users" />}
    >
      <LeftContainer>
        {users.map(user => (
          <User
            key={user.createdAt}
            username={user.username}
            usertag={user.usertag}
            _id={user._id}
            followCallback={fetchUsers}
          />
        ))}
      </LeftContainer>
    </Main>
  )
}

export default Home