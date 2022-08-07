import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">
          LevBlockchain
        </a>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="#" target="_blank" rel="noopener noreferrer">
        Daniel Grunberger  &amp; Joss Lalou
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
