import { Keplr, Key } from '@keplr-wallet/types';
import { SetStateAction, useEffect, useState } from 'react'
import './App.css'
import Form from './components/form/form';
import Modal from './components/modal/modal';
import UserCard from './components/userCard/userCard';
import { getData } from './keplr/start'

const COSMOS_ID = "cosmoshub-4";

function App() {

  const [userInfo, setUserInfo] = useState<Key | undefined>();
  const [showModal, setShowModal] = useState<boolean>(true)

  useEffect(() => {
    getData(COSMOS_ID).then(async (keplr: Keplr | undefined) => {
      const userInfo = await keplr?.getKey(COSMOS_ID);
      return userInfo
    }).then((userInfo) => {
      setUserInfo(userInfo)
    })
    
  }, [])

  return (
    <div className="App">
      <UserCard userInfo={userInfo} setShowModal={setShowModal}/>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <Form COSMOS_ID={COSMOS_ID}/>
      </Modal>
    </div>
  )
}

export default App
