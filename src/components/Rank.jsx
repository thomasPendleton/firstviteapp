import React from 'react'

const Rank = ({ userName, userEntries, user }) => {
  console.log(user)
  console.log(userName, userEntries)
  return (
    <div className="tc">
      <div className="white f3">{userName}, your current entries count is...</div>
      <div className="white f1">{userEntries}</div>
    </div>
  )
}

export default Rank