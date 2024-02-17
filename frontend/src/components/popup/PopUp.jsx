import React from 'react'
import './popup.css'
const PopUp = () => {
  return (
    <>
<div className="popUpContainer">
    <div className="box">
        <p>Are You Sure?</p>
        <div className="Buttuns">
            <button className='cancelBtn'>
                Cancel
            </button>
            <button className='yesBtn'>
                Yes
            </button>
        </div>
    </div>
</div>

    </>
  )
}

export default PopUp