import { useEffect, useRef, useState } from "react";
import CardItem from "../components/CardItem"
import Toolbar from "../components/Toolbar"
import { useTheme } from "../themes/themeContext"
import { getCountryData } from "../services/apiCall";
import { RootState,useAppDispatch } from "../store";
import { setCountryData } from "../countrySlice";
import { useSelector } from "react-redux";
import './HomePage.css'
import CountryDataType from "../entities/CountryData";

const HomePage = () => {
    const { theme } = useTheme();
    const [lastElement,setLastElement] = useState()
    const [renderCardData, setRenderCardData] = useState<CountryDataType[]>([])
    // implementing local pagination using intersection observer
    const [page, setPage] = useState(1)
    const dispatch = useAppDispatch()
    const value: CountryDataType[] = useSelector((state: RootState) => state.country.value)
    const observer = useRef(new IntersectionObserver ((entries)=>{
      const first = entries[0];
      if(first.isIntersecting){        
        setPage((prev)=> prev+1)
      }
    }))
    useEffect(()=>{
      const currentElement = lastElement
      const currentObserver = observer.current
      if(currentElement){
        currentObserver.observe(currentElement)
      }
      return ()=>{
        if(currentElement)
        currentObserver.unobserve(currentElement)
      }
    },[lastElement])
    useEffect(()=>{
        getCountryData().then((res)=>{
          dispatch(setCountryData(res))            
        }).catch((err)=>{
            console.log("Data error", err)
        })
    },[])
    useEffect(()=>{
      if(value.length > 0){
        const data = value.slice(0,12*page) as CountryDataType[]        
        setRenderCardData(data)
      }
    },[value,page])
  return (
    <div className={theme === "dark" ? "homePage homeDarkMode" : "homePage"}>    
     <Toolbar />
    <div className={theme === "dark" ? "cardWrapper darkCardWrapper" : "cardWrapper"}>
      {renderCardData?.length > 0 && renderCardData?.map((item,ind)=>{
        if(ind === renderCardData.length - 1){
          return (<div key={item?.name} ref={setLastElement as any}>
          <CardItem  data={item}  />
          </div>)
        }
        return (<CardItem key={item?.name} data={item}  />)
      })}
    </div>   
    </div>
  )
}

export default HomePage