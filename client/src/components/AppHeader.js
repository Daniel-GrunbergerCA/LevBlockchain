import React, { useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CDropdown,
  CDropdownDivider,
  CButton,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CModal,
  CAlert,
  CModalHeader,
  CInputGroup,
  CFormInput,
  CModalFooter,
  CModalTitle,
  CModalBody,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import { io } from "socket.io-client";
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import '../scss/notifications.css'
import { getPendingNotifications, rejectNotification, dismissNotification, borrowMoney, acceptNotification, logout } from '../axios_requests'
import Calendar from 'react-calendar';
import { useNavigate  } from 'react-router-dom';

const AppHeader = () => {
  const navigate  = useNavigate();


  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  //const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [isAcceptModalVisible, setIsAcceptModalVisible] = useState(false);
  const [acceptAmmount, setAcceptAmmount] = useState();
  const [acceptAmmountUserDestination, setAcceptAmmountUserDestination] = useState();
  const [open, setOpen] = useState(false);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [failureAlertVisible, setFailureAlertVisible] = useState(false);
  const [currNotification, setCurrNotification] = useState();
  const [returnDate, setReturnDate] = useState();
  const [failureText, setFailureText] = useState('');

  const handleNotificationsClick = () => {
    setOpen(true);

  };

  const handleReject = async (notification) => {
    await rejectNotification(notification);
    getNotificationsData();
  }

  
  const handleClose = async () => {
    setIsAcceptModalVisible(false)
    setFailureAlertVisible(false);
    setSuccessAlertVisible(false);
    await getNotificationsData();
  };

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  const handleTransfer = async () => {
    setSuccessAlertVisible(false);
    setFailureAlertVisible(false);
    let resp = await borrowMoney(acceptAmmountUserDestination, acceptAmmount, "LevCoin", returnDate);
    if (resp.status == 200) {
      if (resp.data.error === undefined) {
        setSuccessAlertVisible(true);
        await acceptNotification(currNotification);
        getNotificationsData();
      }
       else {
        setFailureText(resp.data.error);
        setFailureAlertVisible(true);
       }
      }
      else {
        setFailureText("Unauthorized");
        setFailureAlertVisible(true);
      }
};
 
  const handleAccept = async (notification) => {
    setIsAcceptModalVisible(true);
    setCurrNotification(notification);
    setReturnDate(notification.returnDate);
    let acceptAmmount = (notification.message).split(" ");
    setAcceptAmmount(acceptAmmount[3]);
    setAcceptAmmountUserDestination(notification.from);

   
  }

  const handleDismiss = async (notification) => {
    await dismissNotification(notification);
    getNotificationsData();
  }

  const getNotificationsData = async () => {
    try {
        const resp = await getPendingNotifications();
        const data = resp.data;
        setNotifications(data)
    } catch (e) {
        console.log(e);
    }
};

  const handleLogout = async () => {
    logout().then(resp => {
      navigate('/');
    } );
  }

  useEffect(() => {
    getNotificationsData();
  }, [])


  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
          <div style={{"marginLeft": "20px"}}>
            
            LevCoin - Your digital bank
            </div>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={require('../assets/images/logo.jpeg')} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
        </CHeaderNav>
        <CButton color="light" onClick={handleLogout}>
                Logout
        </CButton>
        <CDropdown alignment="end">
          <CDropdownToggle color='muted'>
            <CIcon icon={cilBell} size="lg"  onClick={() => handleNotificationsClick()}/>
            {
            notifications.length >0 &&
            <div className="counter">{notifications.length}</div>
          }
          </CDropdownToggle>
          
          <CDropdownMenu >
            {open && (
              <div className="notifications" style={{"width": "450px"}}>
              {notifications.map((n) => (
                  <CDropdownItem key={n} style={{"background": "#DCDCDC"}}>{n.message}
                  {n.category == "request" ? 
                  <div style={{"display": "inline-block", "padding": "10px"}}>
                  <CButton size='sm' style={{"fontSize": "75%"}} color="success" shape="rounded-pill" onClick={() => {handleAccept(n)}}>Accept</CButton>
                  <CButton   style={{"fontSize": "75%", "margin": "5px"}} size='sm' color="warning" shape="rounded-pill" onClick={() => {handleReject(n)}}>Reject</CButton>
                  </div>
                  :
                  <div style={{"display": "inline-block", "padding": "10px"}}>
                  <CButton color="warning" shape="rounded-pill"  size='sm' style={{"fontSize": "75%"}} onClick={() => {handleDismiss(n)}}>Dismiss</CButton>
                  </div>
                  }
                </CDropdownItem>
                
             ))
             }
             </div>

             )}
          </CDropdownMenu>
          
          <CModal  visible={isAcceptModalVisible}>
              <CAlert color="success" dismissible visible={successAlertVisible} onClose={() => setIsAcceptModalVisible(false)}>
                Succesfully loaned {acceptAmmount} LevCoins to {acceptAmmountUserDestination} untill {formatDate(returnDate)}
                </CAlert>
              <CAlert color="danger" dismissible visible={failureAlertVisible} onClose={() => setIsAcceptModalVisible(false)}>{failureText}</CAlert>
              <CModalHeader>
              <CModalTitle>Transfer</CModalTitle>
              </CModalHeader>
              <CModalBody>
                            <CInputGroup className="mb-2"  >
                            <CFormInput  style={{"width": "30%"}}     value={acceptAmmount} />
                            </CInputGroup>
              <CInputGroup>
                  To return on {formatDate(returnDate)}
              </CInputGroup>
              </CModalBody>
              <CModalFooter>
              <CButton color="success" onClick={handleTransfer}>
                Send
              </CButton>
              <CButton color="secondary" onClick={handleClose}>
                Close
              </CButton>
            </CModalFooter>
              </CModal>
        </CDropdown>
        <CHeaderNav>
          
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
        
      </CContainer>
      
      <CHeaderDivider />
      
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
      
    </CHeader>
  )
}

export default AppHeader
