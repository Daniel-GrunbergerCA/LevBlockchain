import { React, useState, useEffect } from 'react'
import download from "../download.png"

import {
    CRow,
    CFormLabel,
    CCol,
    CFormInput,
    CSpinner,
    CModal,
    CModalBody,
    CModalHeader,
    CModalFooter,
    CModalTitle,
    CButton,
    CDropdown,
    CDropdownToggle,
    CDropdownItem,
    CDropdownDivider,
    CDropdownMenu,
    CInputGroup,
    CFormSelect
} from '@coreui/react'
import { getUserProfile, getCoinValueInNIS, getCoinValueInUSD } from '../axios_requests'
import  EditForm  from './EditForm'

const currencies = {
    LevCoin: "LevCoin",
    USD: "USD",
    NIS: "NIS",
}

export default function Profile() {

    const [user, setUser] = useState();
    const [balance, setBalance] = useState(0);
    const [visible, setVisible] = useState(false)
    const [currency, setCurrency] = useState(currencies.LevCoin);

    const handleClose = async () => {
        setVisible(!visible)
        await getUserData();
      }

    const handleCurrencyChange = async (e) => {
        setCurrency(e.target.value);
        let resp, coinValue;
        if (e.target.value === currencies.USD) {
            resp = await getCoinValueInUSD();
            coinValue = resp.data.value;
        } else if (e.target.value === currencies.NIS) {
            resp = await getCoinValueInNIS();
            coinValue = resp.data.value;
        } else {
            coinValue = 1;
        }
        setBalance(coinValue * user.balance)

    };

    const getUserData = async () => {
        try {
            const data = await getUserProfile();
            let currentUser = data.data;
            setUser(currentUser);
            setBalance(currentUser.balance);

        } catch (e) {
            console.log(e);
        }
    };

    useEffect(()=> {
        getUserData();
    }, []);

    if (user === undefined) {
        return <><CSpinner color="success"/> <br/> Loading... </>;
      }

  return (
    <div className='container emp-profile'>
        <form method=''>
            <div className='row-md-3'>
                <div className='col-md-2'>
                    <img     src={`data:image/svg+xml;base64,${user.image}`} />
                </div>
                <div className='col-md-10'>
                    <div className='profile-head'>
                        <h5>{user.username}</h5>

                    <div className='col-md-16 pl-5 about-info'>
                        <div className='tab-content profile-tab'>
                            <div className='tab-pane fade show active' role='tabpanel' aria-labelledby='home-tab'>

                            <CRow>
                            <CFormLabel htmlFor="colFormLabelLg" className="col-lg-2 col-form-label col-form-label-lg">Username</CFormLabel>
                            <CCol sm={10} >
                                <CFormInput  className="form-control form-control-lg" id="colFormLabelLg" value={user.username}/>
                            </CCol>
                            </CRow>
                            <CRow>
                            <CFormLabel htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">FirstName</CFormLabel>
                            <CCol sm={10} >
                                <CFormInput type="text" className="form-control form-control-lg" id="colFormLabelLg" value={user.firstName}/>
                            </CCol>
                            </CRow>

                            <CRow>
                            <CFormLabel htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">Lastname</CFormLabel>
                            <CCol sm={10} >
                                <CFormInput  className="form-control form-control-lg" id="colFormLabelLg" value={user.lastName}/>
                            </CCol>
                            </CRow>

                            <CRow>
                            <CFormLabel htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">Email</CFormLabel>
                            <CCol sm={10} >
                                <CFormInput  className="form-control form-control-lg" id="colFormLabelLg" value={user.email}/>
                            </CCol>
                            </CRow>

                            <CRow>
                            <CFormLabel htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">Address</CFormLabel>
                            <CCol sm={10} >
                                <CFormInput className="form-control form-control-lg" id="colFormLabelLg" value={user.address}/>
                            </CCol>
                            </CRow>

                            <CRow>
                            <CFormLabel htmlFor="colFormLabelLg" className="col-sm-2 col-form-label col-form-label-lg">Balance</CFormLabel>
                            <CCol sm={10} >
                            <CInputGroup className="mb-2" >
                            <CFormInput  style={{"width": "75%"}}  value={balance}/>
                            <CFormSelect  onChange={((e) => {handleCurrencyChange(e)})} value={currency}>
                            <option value="LevCoin">LevCoin</option>
                            <option value="USD">USD</option>
                            <option value="NIS">NIS</option>
                            </CFormSelect>
                            </CInputGroup>
                            </CCol>
                            </CRow>

                            <button type="button" className="btn btn-info  rounded-pill btn-lg" onClick={() => setVisible(!visible)}>Edit</button>

                            <CModal visible={visible} >
                            <CModalHeader>
                            <CModalTitle>Edit user</CModalTitle>
                            </CModalHeader>
                            <CModalBody>
                            <EditForm user={user} curr onClose={handleClose}/>
                            </CModalBody>
                            <CModalFooter>
                            <CButton color="secondary" onClick={handleClose}>
                                Close
                            </CButton>
                            </CModalFooter>
                            </CModal>
                                

                            </div>
                        </div>
                    </div>

                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}
