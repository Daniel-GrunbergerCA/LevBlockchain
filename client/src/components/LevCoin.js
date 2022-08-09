import  { React, useEffect, useState } from 'react'
import {  getCoinValueInUSD, getFeedbacks } from '../axios_requests'
import { BsFillStarFill } from "react-icons/bs";
import {
    CSpinner, 
    CCard,
    CCardImage,
    CCardBody,
    CCardTitle,
    CCardText,
    CCarousel,
    CCarouselItem,
    CBadge,
    CCallout
} from '@coreui/react'

import UsersChart from './UsersChart'
import SocialMedia from './SocialMedia';


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
      <CCallout color="primary" style={{'marginLeft': 'auto', 'marginRight': 'auto', 'width': '40%'}}>
      Current LevCoin value: {coinValue+8} USD 
    </CCallout>
      <UsersChart/>
      <h1 style={{'marginLeft': 'auto', 'marginRight': 'auto', 'width': '30%'}}>Users feedback</h1>
    <CCarousel controls indicators dark style={{'width': '50%', 'height': '260px', 'margin': 'auto'}}>
    {feedbacks.map((item, index) => (
        <CCarouselItem style={{'marginLeft': '100px', 'marginTop': '-10px'}}  key={index}>

      <CCard key={index} style={{ width: '18rem',    'height': '100%', backgroundColor: '#ADD8E6' }} >
    <CCardImage orientation="top" src={`data:image/svg+xml;base64,${item.image}`} style={{"width": '20%', "height": '50%', "marginTop": '5%', "marginLeft": '5%',}}/>
      <CCardTitle style={{"marginLeft": '5%',}}>{item.user}</CCardTitle>
    <CCardBody>
      <CCardText>
       {item.feedback}
      </CCardText>
     <BsFillStarFill color='FFA500' />  <BsFillStarFill color='FFA500'/>  <BsFillStarFill color='FFA500'/>  <BsFillStarFill color='FFA500'/>  <BsFillStarFill color='FFA500'/>
    </CCardBody>
  </CCard>
  </CCarouselItem>
        ))}
</CCarousel>
<h3>Check we out on social media!</h3>
<SocialMedia/>
</div>


  )
}
