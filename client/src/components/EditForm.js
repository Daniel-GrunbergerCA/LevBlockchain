import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'


import { cilLockLocked, cilUser } from '@coreui/icons'
import { editUser } from '../axios_requests'
import PropTypes from 'prop-types';


EditForm.propTypes  ={
    user: PropTypes.shape({
        username: PropTypes.string,
        email: PropTypes.string,
        address: PropTypes.string,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
      })
}

export default function EditForm({user})  {
  const [usernameinfo, setUserName] = useState(user.username);
  const [emailinfo, setEmail] = useState(user.email);
  const [addressinfo, setAddress] = useState(user.address);
  const [firstNameinfo, setFirstName] = useState(user.firstName);
  const [passwordinfo, setPassword] = useState('');
  const [lastNameinfo, setLastName] = useState(user.lastName);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
 

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new URLSearchParams();

    data.append("username", usernameinfo)
    data.append("password", passwordinfo)
    data.append("email", emailinfo)
    data.append("address", addressinfo)
    data.append("firstName", firstNameinfo)
    data.append("lastName", lastNameinfo)


    const resp = await editUser(data);
    if (resp.status === 200) {
      setSuccessAlertVisible(true);
    };

}

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol >
          <CCard className="mx-4">
          <CAlert color="success" dismissible visible={successAlertVisible} onClose={() => setSuccessAlertVisible(false)}>
                User succesfully edited!
            </CAlert>
            <CCardBody className="p-4">
              <CForm enctype="multipart/form-data" >
                <CInputGroup className="mb-3">
                <CInputGroupText>Username</CInputGroupText>
                  <CFormInput placeholder="Username" autoComplete="username" readOnly value={usernameinfo}   />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput placeholder="Email" autoComplete="email" value={emailinfo}  onChange={e => setEmail(e.target.value)}/>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    onChange={e => setPassword(e.target.value)}
                  />
                </CInputGroup>
                <CInputGroup className="mb-4">
                  <CInputGroupText>
                    <CIcon icon={cilLockLocked} />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Repeat password"
                    autoComplete="new-password"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>Address</CInputGroupText>
                  <CFormInput placeholder="Address" value={addressinfo} autoComplete="address" onChange={e => setAddress(e.target.value)}/>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>FirstName</CInputGroupText>
                  <CFormInput placeholder="FirstName" value={firstNameinfo}  autoComplete="FirstName" onChange={e => setFirstName(e.target.value)}/>
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>LastName</CInputGroupText>
                  <CFormInput placeholder="LastName" value={lastNameinfo}  autoComplete="LastName" onChange={e => setLastName(e.target.value)}/>
                </CInputGroup>
                <CButton color="primary" onClick={handleSubmit}>Edit</CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}
