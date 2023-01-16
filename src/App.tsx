import { Keplr, Key } from '@keplr-wallet/types';
import { SetStateAction, useEffect, useState } from 'react'
import './App.css'
import Chaines from './components/chianes/chaines';
import Form from './components/form/form';
import Modal from './components/modal/modal';
import UserCard from './components/userCard/userCard';
import { getData } from './keplr/start'

const COSMOS_ID = "cosmoshub-4";

function App() {

  return (
    <div className="App">
      <Chaines COSMOS_ID={COSMOS_ID}/>
    </div>
  )
}

export default App
