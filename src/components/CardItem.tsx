import { useNavigate } from "react-router-dom"
import "./CardItem.css"
import CountryDataType from "../entities/CountryData"

const CardItem = ({data}: CountryDataType | any ) => {
    const navigate = useNavigate()
  return (
    <div onClick={(e)=>{
        navigate("/detail", {state: {data}})
        console.log("Abhi", e?.target)
    }} className='cardItemWrapper'>
        <div className="imageWrapper">
            <img src={data.flag} className='flagImage' alt="country flag"></img>
        </div>
        <div className='cardItemInfo'>
            <div className='countryName'>
                {data.name}
            </div>
            <div className='cardItemSubDetails'>
                <span className="fontWeight800">Population: </span><span>{data.population}</span>
            </div>
            <div className='cardItemSubDetails'>
                <span className="fontWeight800">Region: </span><span>{data.region}</span>
            </div>
            <div className='cardItemSubDetails'>
                <span className="fontWeight800">Capital: </span><span>{data.capital}</span>
            </div>
        </div>
    </div>
  )
}

export default CardItem