import  { React, useEffect, useState } from 'react'
import { getCoinValueInNIS, getCoinValueInUSD, getFeedbacks, getAnotherUser } from '../axios_requests'
import {
    CSpinner, 
    CCard,
    CCardImage,
    CCardBody,
    CCardTitle,
    CCardText,
    CButton
} from '@coreui/react'

export default function LevCoin() {

    const [coinValue, setcoinValue] = useState();

    const [feedbacks, setfeedbacks] = useState([]);

    const getLevCoinValue = async () => {
        let coinValue = (await getCoinValueInUSD()).data.value;

        setcoinValue(coinValue);
    }

    const getFdbks = async () => {
      let fdbks =  (await getFeedbacks()).data;
      setfeedbacks(fdbks);

     };

    

    useEffect(()=> {
        getLevCoinValue();
        getFdbks();
    }, []);
    

    if (coinValue === undefined) {
        return <><CSpinner color="success"/> <br/> Loading... </>;
      }

  return (
      <div>
    {feedbacks.map((item, index) => (
      <CCard key={index} style={{ width: '18rem', 'display': 'inline-block', 'height': '100%' }} >
    <CCardImage orientation="top" src={`data:image/svg+xml;base64,${item.image}`} style={{"width": '20%', "height": '50%', "marginTop": '5%', "marginLeft": '5%',}}/>
      <CCardTitle style={{"marginLeft": '5%',}}>{item.user}</CCardTitle>
    <CCardBody>
      <CCardText>
       {item.feedback}
      </CCardText>
      <div className="ratings mt-3">
      {Array(item.rating)
            .fill(0)
            .map((x, idx) => (
              <div key={idx}>
            <i className="bi bi-star"></i>
      </div>
            ))}
      </div>
    </CCardBody>
  </CCard>

        ))}





    </div>
  )
}
