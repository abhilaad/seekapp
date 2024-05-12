import { useNavigate } from "react-router-dom"
import "./CardItem.css"
import CountryDataType from "../entities/CountryData"
import { CAPITAL, POPULATION, REGION } from "../constants/stringConstants";

interface PropTypes {
    key?: string;
    data?: CountryDataType;
  };

const CardItem = ({data}: PropTypes  ) => {
    const navigate = useNavigate()
  return (
    <div onClick={()=>{
        navigate("/detail", {state: {data}})
    }} className='cardItemWrapper'>
        <div className="imageWrapper">
            <img src={data?.flag} className='flagImage' alt="country flag"></img>
        </div>
        <div className='cardItemInfo'>
            <div className='countryName'>
                {data?.name}
            </div>
            <div className='cardItemSubDetails'>
                <span className="fontWeight800">{POPULATION}</span><span>{data?.population}</span>
            </div>
            <div className='cardItemSubDetails'>
                <span className="fontWeight800">{REGION}</span><span>{data?.region}</span>
            </div>
            <div className='cardItemSubDetails'>
                <span className="fontWeight800">{CAPITAL}</span><span>{data?.capital}</span>
            </div>
        </div>
    </div>
  )
}

export default CardItem