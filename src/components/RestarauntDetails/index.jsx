import Cookies from "js-cookie";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import Navbar from "../Navbar"
import FoodItem from "../FoodItem";
import './index.css'
import { useContext } from "react";
import { cartContainer } from "../../context/ContextProvider";
import Footer from "../../Footer";


function RestarauntDetails(){
    const [restaurantDetailsData,setRestaurantDetailsData]=useState(null)
   const {resId}=useParams();

   const {showFoodItems}=useContext(cartContainer)

    function fetchRestarauntDetails(){
        const jwtToken=Cookies.get('jwt_token')
          async function fn(){
          const url=`https://apis.ccbp.in/restaurants-list/${resId}`
          const options={
            method:'GET',
            headers:{
            Authorization:`Bearer ${jwtToken}`
            }
          }
          const response=await fetch(url,options);
          const data=await response.json();
          const formattedData={
                imgUrl:data.image_url,
                name:data.name,
                location:data.location,
                cuisine:data.cuisine,
                rating:data.rating,
                reviewsCount:data.reviews_count,
                costForTwo:data.cost_for_two,
                foodItems:data.food_items.map(each=>
                    ({
                        foodItemCost:each.cost,
                        foodType:each.food_type,
                        foodItemId:each.id,
                        foodItemImg:each.image_url,
                        foodItemRating:each.rating,
                        foodItemName:each.name,
                        foodItemQuantity:0
                    }))
          }
          setRestaurantDetailsData(formattedData)
        }
      fn();
     }
    useEffect(fetchRestarauntDetails,[])

    if (restaurantDetailsData===null){
        return(
            <div className="loader">
                <ClipLoader
                color="#f7931e"
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            </div>
        )
    }
    
    const foodItemsData=restaurantDetailsData.foodItems
    return(
        <>
        <Navbar/>
            {
                <div>
                    <div className="banner-container">
                        <div className="restaurant-container">
                            <div className="restaurant-banner-img">
                                <img src={restaurantDetailsData.imgUrl} className="res-img"/>
                            </div>
                            <div className="details-container">

                                <div className="name-type-loc-container">
                                    <h1 className="res-name">{restaurantDetailsData.name}</h1>
                                    <p className="res-cuisine">{restaurantDetailsData.cuisine}</p>
                                    <p className="res-location">{restaurantDetailsData.location}</p> 
                                </div>

                                <div className="info-container">
                                    <div className="info-icon-container">
                                        <div className="rating">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="star-icon">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                            </svg>
                                            <p className="res-details-rating">{restaurantDetailsData.rating}</p>
                                        </div>
                                        <p><span>{restaurantDetailsData.reviewsCount}</span>+Ratings</p>
                                    </div>
                                    <hr className="line"/>
                                    <div className="info-cost-container">
                                        <p className="res-cost"><span>{restaurantDetailsData.costForTwo}</span></p>
                                        <p>Cost For Two</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="all-food-items-container">
                        {foodItemsData.map(eachFoodItem=>{
                            return(<FoodItem foodItemsData={eachFoodItem} key={eachFoodItem.foodItemId}/>)
                        })}
                    </div>  
                </div>
            }
        <Footer/>
        </>
    )
}

export default RestarauntDetails



