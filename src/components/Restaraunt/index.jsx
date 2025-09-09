// import { createContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.css'

function Restaraunt(props) {
  const {eachRestarauntInfo,resId}=props
  const {imgUrl,name,cuisine,userRating}=eachRestarauntInfo
  const {rating,totalReviews}=userRating

  const navigate=useNavigate();
  function renderRestarauntDetails(){
    navigate(`/restaurant/${resId}`)
  }
  
  return (

    <button className="restaraunt-card-button" onClick={renderRestarauntDetails}>
      <div className="card-container">
          <div>
            <img src={imgUrl} className="restaraunt-img"/>
          </div>

          <div className='names-container'>
            <h1 className='restaraunt-name'>{name}</h1>
            <p className="res-type">{cuisine}</p>
            
            <div className="ratings-container">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFCC00" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="star-icon">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                <h3 className="rating">{rating}</h3>
                <p className="total-ratings"><span className="total-reviews">{totalReviews}</span> (ratings)</p>
            </div>
          </div>
      </div>
    </button> 
  )
}

export default Restaraunt
