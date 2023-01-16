import { ChainInfoWithoutEndpoints } from '@keplr-wallet/types';
import { useEffect, useState } from 'react'
import { getData } from '../../keplr/start'

interface Props {
    COSMOS_ID: string
}

const Chaines = ({COSMOS_ID}: Props) => {

    const [chaines, setChaines] = useState<ChainInfoWithoutEndpoints[] | null>(null);

    const getChaines = () => {
        const keplr = getData(COSMOS_ID);
        keplr.then(async keplr => {
            const chaines = await keplr?.getChainInfosWithoutEndpoints();
            chaines && setChaines(chaines)
        })
    }

    console.log(chaines);
    

    useEffect(() => {
        getChaines();
    }, [])

  return (
    <div>
        <ul>
            {
                chaines 
                ? chaines.map(obj => (
                    <li>
                    </li>
                ))
                : null
            }
        </ul>
    </div>
  )
}

export default Chaines