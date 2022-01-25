import { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ModalContext = createContext({ })

const ModalProvider = ({ children }) => {
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  const [commentTweetId, setCommentTweetId] = useState(null)
  const [type, setType] = useState(null)

  useEffect(() => {
    setVisible(false)
    setType(null)
  }, [location])

  const close = () => {
    setType(null)
    setVisible(false)
  }

  const open = () => {
    setVisible(true)
  }

  const handleSignupClick = () => {
    open()
    setType('signup')
  }
  
  const handleLoginClick = () => {
    open()
    setType('login')
  }

  const handleNewTweetClick = () => {
    open()
    setType('tweet')
  }

  const handleEditProfileClick = () => {
    open()
    setType('editProfile')
  }

  const handleCommentClick = tweetId => {
    open()
    setCommentTweetId(tweetId)
    setType('comment')
  }
  
  console.log(commentTweetId)

  const value = {
    visible,
    setVisible,
    type,
    setType,
    close,
    open,
    handleSignupClick,
    handleLoginClick,
    handleNewTweetClick,
    handleEditProfileClick,
    handleCommentClick,
    commentTweetId,
    setCommentTweetId
  }

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  )
}

export {
  ModalContext,
  ModalProvider
}