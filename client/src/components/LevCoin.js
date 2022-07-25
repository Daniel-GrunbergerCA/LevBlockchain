import  { React, useEffect, useState } from 'react'
import { getCoinValueInNIS, getCoinValueInUSD } from '../axios_requests'
import {
    CSpinner
} from '@coreui/react'

export default function LevCoin() {

    const [coinValue, setcoinValue] = useState();

    const getLevCoinValue = async () => {
        let coinValue = (await getCoinValueInUSD()).data.value;

        setcoinValue(coinValue);
    }
    

    useEffect(()=> {
        getLevCoinValue();
    }, []);
    

    if (coinValue === undefined) {
        return <><CSpinner color="success"/> <br/> Loading... </>;
      }

  return (
    <div>{coinValue}</div>
  )
}
