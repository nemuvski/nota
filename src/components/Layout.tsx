import React from 'react'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
      <footer>
        <small>© 2021 Nota</small>
      </footer>
    </div>
  )
}

export default Layout
