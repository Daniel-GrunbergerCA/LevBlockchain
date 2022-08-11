import React, { useState, useEffect } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { getAllTransactions } from '../axios_requests'
import { MdCheckCircle, MdDangerous } from 'react-icons/md'
import { CChart } from '@coreui/react-chartjs'
import { colors } from '@material-ui/core'

export default function Transactions() {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const [transactions, setTransactions] = useState([])
  const [sorting, setSorting] = useState({ key: 'sender', ascending: true })

  const applySorting = (key, ascending) => {
    setSorting({ key: key, ascending: ascending })
  }

  const getUsersNames = () => {
    let usersWithTransactions = []

    let index = 0
    for (var i = 0; i < transactions.length; i++) {
      if (!usersWithTransactions.includes(transactions[i].sender)) {
        usersWithTransactions[index++] = transactions[i].sender
      }
    }
    return usersWithTransactions
  }

  const getUsersColors = () => {
    let colors = []
    let usersWithTransactions = getUsersNames()
    for (let i = 0; i < usersWithTransactions.length; i++) {
      colors.push('#' + Math.floor(Math.random() * 16777215).toString(16))
    }
    return colors
  }

  const getTransactionsPerMonth = () => {
    let mapTransactionsToMonth = new Map()
    transactions.forEach((transaction, i) => {
      let d = new Date(transaction.timestamp)
      mapTransactionsToMonth.set(d.getMonth(), 0)
    })
    transactions.forEach((transaction, i) => {
      let d = new Date(transaction.timestamp)
      let currTransaction = mapTransactionsToMonth.get(d.getMonth()) + 1
      mapTransactionsToMonth.set(d.getMonth(), currTransaction)
    })

    let transactionsToReturn = []
    for (var i = 0; i < transactions.length; i++) {
      if (mapTransactionsToMonth.has(i)) {
        transactionsToReturn[i] = mapTransactionsToMonth.get(i)
      } else {
        transactionsToReturn[i] = 0
      }
    }

    return transactionsToReturn
  }

  const getTransactionsPerUser = () => {
    let usersWithTransactions = getUsersNames();
    let mapTransactionsToUser = [];
    for (var i = 0; i < usersWithTransactions.length; i++) {
      mapTransactionsToUser[i] = 0
    }

    for (var i = 0; i < usersWithTransactions.length; i++) {
      transactions.map((t, idx) => {
        if (t.sender == usersWithTransactions[i]) {
          mapTransactionsToUser[i] += 1
        }
      })
    }
    return mapTransactionsToUser
  }

  const getTransactions = async () => {
    let transactions = await getAllTransactions()
    console.log(transactions)
    setTransactions(transactions)
  }

  useEffect(() => {
    getTransactions()
  }, [])

  useEffect(() => {
    const currentTransactionsCopy = [...transactions]

    const sortedcurrentTransactions = currentTransactionsCopy.sort((a, b) => {
      let result = 0
      try {
        result = a[sorting.key].localeCompare(b[sorting.key])
        return result
      } catch (e) {
        if (Number(a[sorting.key]) < Number(b[sorting.key])) {
          result = 1
        } else if (Number(a[sorting.key]) > Number(b[sorting.key])) {
          result = -1
        }
        return result
      }
    })

    setTransactions(
      sorting.ascending ? sortedcurrentTransactions : sortedcurrentTransactions.reverse(),
    )
  }, [sorting])

  return (
    <div>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell
              className="text-center"
              onClick={() => applySorting('type', !sorting.ascending)}
            >
              Type
            </CTableHeaderCell>
            <CTableHeaderCell
              className="text-center"
              onClick={() => applySorting('sender', !sorting.ascending)}
            >
              Sender
            </CTableHeaderCell>
            <CTableHeaderCell
              className="text-center"
              onClick={() => applySorting('receiver', !sorting.ascending)}
            >
              Receiver
            </CTableHeaderCell>
            <CTableHeaderCell
              className="text-center"
              onClick={() => applySorting('ammount', !sorting.ascending)}
            >
              Ammount
            </CTableHeaderCell>
            <CTableHeaderCell
              className="text-center"
              onClick={() => applySorting('status', !sorting.ascending)}
            >
              Status
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {transactions.map((item, index) => (
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
                {item.status == 'approved' ? (
                  <MdCheckCircle color="green" />
                ) : (
                  <MdDangerous color="red" />
                )}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      <CChart
        style={{ width: '100%' }}
        type="bar"
        data={{
          labels: ['Jan', 'Feb', 'Marh', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
          datasets: [
            {
              label: 'Transactions',
              backgroundColor: '#f87979',
              data: getTransactionsPerMonth(),
            },
          ],
        }}
        labels="months"
      ></CChart>
      Transactions per sender
      <CChart
        style={{ width: '85%' }}
        type="doughnut"
        data={{
          labels: getUsersNames(),
          datasets: [
            {
              backgroundColor: getUsersColors(),
              data: getTransactionsPerUser(),
            },
          ],
        }}
      />
    </div>
  )
}
