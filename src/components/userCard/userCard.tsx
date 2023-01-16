import { Account } from '@cosmjs/launchpad'
import { Key } from '@keplr-wallet/types'
import {} from 'react'
import classes from "./style.module.css"

interface Props {
  userInfo: Key | undefined;
  setShowModal: (val: boolean) => void
}

const UserCard = ({userInfo, setShowModal}: Props) => {

  return (
    <div className={classes.main}>
      <h2 className={classes.name}>{userInfo?.name}</h2>
      <p className={classes.path}>{userInfo?.bech32Address}</p>
      <button className={classes.sendBtn} onClick={() => setShowModal(true)}>Send Cosmos</button>
    </div>
  )
}

export default UserCard