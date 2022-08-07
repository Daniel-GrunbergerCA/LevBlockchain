import { React, useState, useEffect} from 'react'

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
  CAvatar,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { register, getRandomAvatar } from '../../../axios_requests'
import { Buffer } from "buffer";
import { styled } from '@material-ui/styles'
import axios from "axios"; // pour le request de mail for register
const Register = () => {
 
  const [usernameinfo, setUserName] = useState();
  const [passwordinfo, setPassword] = useState();
  const [emailinfo, setEmail] = useState();
  const [addressinfo, setAddress] = useState();
  const [firstNameinfo, setFirstName] = useState();
  const [lastNameinfo, setLastName] = useState();
  const [balance, setBalance] = useState(0);
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);




  useEffect(async () => {
    const data = [];
    for (let i = 0; i < 4; i++) {
      const image = await getRandomAvatar();
      const buf = new Buffer(image.data); 
      data.push(buf.toString("base64"));
    }
    
    setAvatars(data);
    setIsLoading(false);
  }, []);

  const handleHighlight = (e) => {
    e.target.style.opacity = ".5";
  }

  const handleDisableHighlight = (e, index) => {
    console.log(selectedAvatar)
    console.log(index)
    if (selectedAvatar === undefined ||  selectedAvatar !== index) {
      e.target.style.opacity = "1";
    }
  }
  const setAvatar = (index) => {
    console.log(index)
    setSelectedAvatar(index);
  }


  const handleSubmit = async e => {
      e.preventDefault();
      
     
      const data = new FormData();


      data.append("username", usernameinfo)
      data.append("password", passwordinfo)
      data.append("email", emailinfo)
      data.append("address", addressinfo)
      data.append("firstName", firstNameinfo)
      data.append("lastName", lastNameinfo)
      data.append("balance", balance)
      data.append("position", "client") // joss comment : to change with positions 
      data.append("img", avatars[selectedAvatar])

      
      axios.post('http://localhost:8081/register/email', {value : usernameinfo}); // send to server Side
     
      register(data)
          .catch(err => console.log(err))
  }


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm enctype="multipart/form-data">
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" onChange={e => setUserName(e.target.value)} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" onChange={e => setEmail(e.target.value)}/>
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
                    <CFormInput placeholder="Address" autoComplete="address" onChange={e => setAddress(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>FirstName</CInputGroupText>
                    <CFormInput placeholder="FirstName" autoComplete="FirstName" onChange={e => setFirstName(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>LastName</CInputGroupText>
                    <CFormInput placeholder="LastName" autoComplete="LastName" onChange={e => setLastName(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>Balance</CInputGroupText>
                    <CFormInput placeholder="Balance" autoComplete="Balance" onChange={e => setBalance(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                  <CInputGroupText>Choose your Avatar</CInputGroupText>
                  {isLoading ? (
                    <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  ): (
                    <div>
                      {avatars.map((avatar, index) => {
                  return (
                  <CAvatar   src={`data:image/svg+xml;base64,${avatar}` }
                  onMouseEnter={handleHighlight}
                  onMouseLeave={(e) => {handleDisableHighlight(e, index)}}
                  alt="avatar"
                  key={avatar}
                  onClick={() => {setAvatar(index)}}>
                  </CAvatar>
                  );
                      })}
                  </div>
                  )}
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={handleSubmit}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}



export default Register
