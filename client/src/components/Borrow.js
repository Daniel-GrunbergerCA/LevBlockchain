import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CAvatar,
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CAlert,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CSpinner,
  CFormSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilPeople
} from '@coreui/icons'
import { getAllUsers, deleteUser, getUserProfile, getCoinValueInUSD, getCoinValueInNIS , borrowMoney} from '../axios_requests'
import Avatar from '@material-ui/core/Avatar'
import { cilLockLocked, cilUser } from '@coreui/icons'
import  EditForm  from './EditForm'
import { BsFillChatLeftTextFill , BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import UserChat from './UserChat'
import UserChatHeader from './UserChatHeader'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const currencies = {
    LevCoin: "LevCoin",
    USD: "USD",
    NIS: "NIS",
}
export default function Borrow() {


  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState('');
  const [currency, setCurrency] = useState(currencies.LevCoin);
  const [ammount, setAmmount] = useState(0);
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [failureAlertVisible, setFailureAlertVisible] = useState(false);
  const [failureText, setFailureText] = useState('');
  const [date, setDate] = useState(new Date());


  const [users, setUsers] = useState([]);


  const getUsersData = async () => {
        try {
            const data = await getAllUsers();
            const users = data.data;
           
            setUsers(users);
        } catch (e) {
            console.log(e);
        }
    };

    const isVisible = (currUsername) => {
      return visible && currUsername === username;
    }

    const handleClose = async () => {
      setVisible(false)
      setFailureAlertVisible(false);
      setSuccessAlertVisible(false);
      setUsername('');
      await getUsersData();
    };

    const handleBorrowModal = async (user) => {
        setUsername(user);
        setVisible(true);
    };

    const handleBorrow = async () => {
        if (ammount <= 0) {
            setFailureAlertVisible(true);
            setFailureText("Please select an positive ammount");
            return;
        }

        setSuccessAlertVisible(false)
        setFailureAlertVisible(false)
        console.log(date)
        let resp = await borrowMoney(username, ammount, currency, date);
        console.log(resp.data)
        if (resp.status == 200) {
        if (resp.data.error === undefined) {
          setSuccessAlertVisible(true);
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


    const handleAmmountChange = async (e) => {
      setAmmount(e.target.value);
    };

    useEffect(() => { 
      getUsersData();
    }, []);



  return (
    <div>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell className="text-center">
              <CIcon icon={cilPeople} />
            </CTableHeaderCell>
            <CTableHeaderCell className="text-center">FirstName</CTableHeaderCell>
            <CTableHeaderCell className="text-center">LastName</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Username</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Address</CTableHeaderCell>
            <CTableHeaderCell className="text-center"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
              <img  src={`data:image/svg+xml;base64,${item.image}`} />
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.firstName}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.lastName}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.username}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.email}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.address}</div>
              </CTableDataCell>
              <CButton color="info"  shape="rounded-pill" onClick={() => {handleBorrowModal(item.username)}}>Borrow</CButton>
        
              <CModal  visible={isVisible(item.username)}>
              <CAlert color="success" dismissible visible={successAlertVisible} onClose={() => setSuccessAlertVisible(false)}>
                Succesfully Borrowed {ammount} {currency} to {item}
                </CAlert>
              <CAlert color="danger" dismissible visible={failureAlertVisible} onClose={() => setFailureAlertVisible(false)}>{failureText}</CAlert>
              <CModalHeader>
              <CModalTitle>Borrow</CModalTitle>
              </CModalHeader>
              <CModalBody>
                            <CInputGroup className="mb-2"  >
                            <CFormInput  style={{"width": "30%"}}   onChange={(e) => {handleAmmountChange(e)}}  value={ammount} />
                            <CFormSelect  onChange={((e) => {setCurrency(e.target.value)})} value={currency}>
                            <option value="LevCoin">LevCoin</option>
                            <option value="USD">USD</option>
                            <option value="NIS">NIS</option>
                            </CFormSelect>
                            </CInputGroup>
                            <CInputGroupText>Choose the date for return</CInputGroupText>
                            <CInputGroup>
                            <Calendar onChange={setDate} value={date}  minDate={new Date()} />
                            </CInputGroup>
              </CModalBody>
              <CModalFooter>
              <CButton color="success" onClick={handleBorrow}>
                Send
              </CButton>
              <CButton color="secondary" onClick={handleClose}>
                Close
              </CButton>
            </CModalFooter>
              </CModal>

            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}
