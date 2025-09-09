import { useEffect, useState } from "react";
import Navbar from "../Navbar"
import Cookies from "js-cookie";
import SimpleSlider from "../../ReactSlick"
import Restaraunt from "../Restaraunt"
import './index.css'
import { FaSpinner } from "react-icons/fa";
import Footer from "../../Footer";
function Home(props){
  const {sortByOptions,restarauntIdFunction}=props
  const {displayText,value}=sortByOptions

  const [offers,setOffers]=useState([]) 
  const [restarauntDetails,SetRestarauntDetails]=useState([])
  const [activePage,setActivePage]=useState(1)
  const [isLoading,setIsLoading]=useState(true)
  const [selectedSortBy, setSelectedSortBy] = useState("Lowest");
  
  let LIMIT=9;
  
  function handleRightButton(){
    if (activePage<4){
      setActivePage(prev=>prev+1)
    }
  }
  function handleLeftButton(){
    if (activePage>1){
      setActivePage(prev=>prev-1)
    }
  }
  

  function fn(){
    async function fetchOffers(){
      const jwtToken=Cookies.get('jwt_token');
        const url='https://apis.ccbp.in/restaurants-list/offers'
        const options={
          headers:{
            Authorization:`Bearer ${jwtToken}`
          },
          method:'GET',
        }
        const response=await fetch(url,options);
        const data=await response.json()
        const formattedData=data.offers.map(each=>({
          imgUrl:each.image_url
        }))
      setOffers(formattedData)
  }
  fetchOffers();
}
useEffect(fn,[])


function fetchRestarauntsList(){
  const offset=(activePage-1)*LIMIT
  async function fn(){
     setIsLoading(true);
    const jwtToken=Cookies.get('jwt_token')
    const url=`https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${LIMIT}&sort_by_rating=${selectedSortBy}`

    const options={
      method:'GET',
      headers:{
      Authorization: `Bearer ${jwtToken}`
    }
  }

   const response=await fetch(url,options);
   const data=await response.json();
   const formattedData = data.restaurants.map(each => ({
        name: each.name,
        opensAt: each.opens_at,
        userRating: {
          rating: each.user_rating.rating,
          ratingColor: each.user_rating.rating_color,
          ratingText: each.user_rating.rating_text,
          totalReviews: each.user_rating.total_reviews
        },
        costForTwo: each.cost_for_two,
        cuisine: each.cuisine,
        groupByTime: each.group_by_time,
        hasOnline: each.has_online_delivery,
        hasTable: each.has_table_booking,
        id: each.id,
        imgUrl: each.image_url,
        delivering: each.is_delivering_now,
        location: each.location,
        menuType: each.menu_type
      }));
      
      SetRestarauntDetails(formattedData)
      setIsLoading(false)
  }
  fn();
}

useEffect(fetchRestarauntsList, [activePage, selectedSortBy])

return(
  <>
    <Navbar/>
        <div className="width-container">
          <SimpleSlider offers={offers}/>
          
          <h1 className="popular-main-heading">Popular Restaraunts</h1>
          <div className="flex-container-dropdown">
              <p className="para-heading">Select you Favourite restaraunt special dish and make your day happy...</p>
              <div className="drop-down-container">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>
              <select
                    className="select-options"
                    value={selectedSortBy}
                    onChange={(e) => setSelectedSortBy(e.target.value)}
                  >
                <option value="Lowest">Sort By Lowest</option>
                <option value="Highest">Sort by Highest</option>
            </select>

              </div>
          </div>
          <hr className="line"/>

          <div className="restaraunts-container">
              {isLoading?(
              <div className="loader-wrapper"><FaSpinner className="rotating-icon" size={50} color="#ff4500"/></div>):(restarauntDetails.map(each=>{
                return (
                  <div key={each.id}>
                    <Restaraunt resId={each.id} eachRestarauntInfo={each}/>
                  </div>
                )
              }))}
          </div>

          <div className="pagination-container">

            <button className="arrow-button" testid="pagination-left-button" onClick={handleLeftButton}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="left-arrow">
                <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
              </svg>
            </button>
            
            <h1 className="pagenumber"><span testid="active-page-number">{activePage}</span> of 20</h1>

            <button className="arrow-button" testid="pagination-right-button" onClick={handleRightButton}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="left-arrow">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
              </svg>
            </button>

          </div>
        </div>
        <Footer/>
  </>
)
}
export default Home