import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CImage,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CNavItem,
  CNavGroup,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilNotes } from '@coreui/icons'

import { AppSidebarNav } from './AppSidebarNav'

import { logoNegative } from 'src/assets/brand/logo-negative'
import { sygnet } from 'src/assets/brand/sygnet'

import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { getUserProfile } from '../axios_requests'

// sidebar nav config
//import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const [navigation, setNavigation] = useState([
    {
      component: CNavItem,
      name: 'LevCoin',
      to: '/levCoin',
    },
    {
      component: CNavItem,
      name: 'Profile',
      to: '/profile',
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
        {
          component: CNavItem,
          name: 'Ask',
          to: '/actions/ask',
        },
      ],
    },
  ])

  const adminNav = [
    {
      component: CNavItem,
      name: 'Users',
      to: '/users',
    },

    {
      component: CNavItem,
      name: 'Transactions',
      to: '/transactions',
    },

    {
      component: CNavItem,
      name: 'Chat',
      to: '/chat',
    },
  ]

  const userNav = [
    {
      component: CNavItem,
      name: 'ManagerChat',
      to: '/managerChat',
    },
  ]

  const getNavForUser = async () => {
    let profile = await (await getUserProfile()).data
    if (profile.position == 'manager') {
      let newNav = navigation.concat(adminNav)
      setNavigation(newNav)
    } else {
      let newNav = navigation.concat(userNav)
      setNavigation(newNav)
    }
  }

  useEffect(() => {
    getNavForUser();
  }, [])

  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CImage
          className="sidebar-brand-full"
          src={require('../assets/images/logo.jpeg')}
          height={35}
        />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-md-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      />
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
