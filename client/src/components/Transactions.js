import React from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'


const tableExample = [
    {
        sender: 'daniel',
        receiver: 'hamoui',
        ammount: 'Brasilio Machado 47',
        status: 'active',
        type: 'lend',
  },
]

export default function Users() {
  return (
    <div>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="light">
          <CTableRow>
            <CTableHeaderCell className="text-center">Type</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Sender</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Receiver</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Ammount</CTableHeaderCell>
            <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {tableExample.map((item, index) => (
            <CTableRow v-for="item in tableItems" key={index}>
              <CTableDataCell className="text-center">
                <div>{item.type}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.sender}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.receiver}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.ammount}</div>
              </CTableDataCell>
              <CTableDataCell className="text-center">
                <div>{item.status}</div>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}
