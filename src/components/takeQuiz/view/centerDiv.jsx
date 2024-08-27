import React from 'react'

const CenterColDiv = ({children}) => {
  return (

        <div className='center_div flex flex-col gap-16 items-center justify-center h-full w-full p-4 md:p-20'>
            {children}
        </div>
  )
}

export default CenterColDiv