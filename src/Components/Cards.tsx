import React from 'react'
import '../Styles/Cards.css'

function Cards() {
  return (
    <>
      <h1 style={{ display: 'flex', marginLeft: '9%', fontSize: '42px'}}>Diaries App</h1>
      <div className="cards-list">
      <div className="card 1">
      <div className="card_image" style={{background: 'linear-gradient(326deg, rgba(158,148,233,1) 22%, rgba(121,183,218,1) 39%, rgba(193,177,194,1) 68%, rgba(238,128,191,1) 94%)'}}></div>
        <div className="card_title title-white">
        <p>Private Diary</p>
        </div>
      </div>
        <div className="card 1">
          <div className="card_image"> <img src="https://i.redd.it/b3esnz5ra34y.jpg" alt="pic" /> </div>
          <div className="card_title title-white">
            <p>Markdown Support</p>
          </div>
        </div>
      <div className="card 1">
        <div className="card_image" style={{background: 'linear-gradient(312deg, rgba(125,219,221,1) 0%, rgba(250,218,150,1) 100%)'}}>  </div>
        <div className="card_title title-white">
          <p>Public Diary</p>
        </div>
      </div>
      </div>
    </>
  )
}

export default Cards
