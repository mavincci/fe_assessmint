import React from 'react'

const Button = ({icon,label, bg, text}) => {
  return (
  
      <button className={`text-${text} bg-${bg} p-2 px-3 rounded-xl flex gap-2 mx-auto h-10   items-center  border border-gray-400`}>{icon} {label}</button>
   
  )
}

export default Button
