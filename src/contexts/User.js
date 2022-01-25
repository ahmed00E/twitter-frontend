import { createContext, useEffect, useState } from 'react'

import { getMe } from '../api/auth'

const UserContext = createContext({ })

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const fetchedUser = await getMe()

    if (!fetchedUser.error) {
      setUser(fetchedUser)
    }
  }

  const value = {
    user,
    setUser,
    getUser
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export {
  UserContext,
  UserProvider
}