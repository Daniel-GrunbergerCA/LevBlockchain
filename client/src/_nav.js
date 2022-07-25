import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Users',
    to: '/users',
  },
  {
    component: CNavItem,
    name: 'LevCoin',
    to: '/levCoin',
  },
  {
    component: CNavItem,
    name: 'Transactions',
    to: '/transactions',
  },
  {
    component: CNavItem,
    name: 'Profile',
    to: '/profile',
  },
  {
    component: CNavItem,
    name: 'Chat',
    to: '/chat',
  },
  {
    component: CNavGroup,
    name: 'Actions',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Borrow',
        to: '/actions/borrow',
      },
      {
        component: CNavItem,
        name: 'Transfer',
        to: '/actions/transfer',
      },
    ],
  },
]

export default _nav
