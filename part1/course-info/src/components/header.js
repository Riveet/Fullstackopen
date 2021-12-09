import React from 'react'

const Header = ({ course }) => {
  const { name } = course
  return <h1>{name}</h1>
}

export default Header
