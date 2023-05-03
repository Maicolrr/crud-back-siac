import React from 'react'

import { ImgUI } from '../../UI/ImgUI/ImgUI'
import iconWhite from '../../../Images/whiteIcon.png'
import iconPlate from '../../../Images/plate.png'

export const Main = () => {
  return (
    <main>
        <div className='containerWhite'>
            <ImgUI style='iconWhite' routeImg={iconWhite} />
        </div>
        
        <div className='containerPlate'>
            <ImgUI style='iconPlate' routeImg={iconPlate} />
        </div>
        
    </main>
  )
}
