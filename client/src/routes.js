import React from 'react'


const Users = React.lazy(() => import('./components/Users'))
const Transactions = React.lazy(() => import('./components/Transactions'))
const Profile = React.lazy(() => import('./components/Profile'))
const LevCoin = React.lazy(() => import('./components/LevCoin'))
const Transfer = React.lazy(() => import('./components/Transfer'))
const Borrow = React.lazy(() => import('./components/Borrow'))
const Ask = React.lazy(() => import('./components/Ask'))
const ManagerChat = React.lazy(() => import('./components/ManagerChat'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/levCoin', exact: true, name: 'LevCoin', element: LevCoin },
  { path: 'actions/transfer', exact: true, name: 'Transfer', element: Transfer },
  { path: 'actions/borrow', exact: true, name: 'Borrow', element: Borrow },
  { path: 'actions/ask', exact: true, name: 'Ask', element: Ask },
  { path: '/users', exact: true, name: 'Users', element: Users },
  { path: '/managerChat', exact: true, name: 'ManagerChat', element: ManagerChat },
  { path: '/profile', exact: true, name: 'Profile', element: Profile },
  { path: '/transactions', exact: true, name: 'Users', element: Transactions },
]

export default routes
