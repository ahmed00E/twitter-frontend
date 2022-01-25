import { useContext } from "react"

import { ModalContext } from "../contexts/Modal"
import Modal from "./Modal"
import Login from './Forms/Login'
import Signup from './Forms/Signup'
import Tweet from "./Forms/Tweet"
import Profile from "./Forms/Profile"
import Comment from "./Forms/Comment"

const Modals = () => {
  const { type } = useContext(ModalContext)

  if (!type) {
    return null
  }

  return (
    <Modal>
      {type === 'login' && <Login />}
      {type === 'signup' && <Signup />}
      {type === 'tweet' && <Tweet />}
      {type === 'editProfile' && <Profile />}
      {type === 'comment' && <Comment />}
    </Modal>
  )
}

export default Modals