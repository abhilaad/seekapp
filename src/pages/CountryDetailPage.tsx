import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import "./CountryDetailPage.css"
import { useTheme } from '../themes/themeContext';
import CountryDataType from '../entities/CountryData';
import { useEffect } from 'react';
import { BACK, BORDER_COUNTRIES, CAPITAL, CURRENCIES, LANGUAGES, NATIVE_NAME, POPULATION, REGION, SUB_REGION, TOP_LEVEL_DOMAIN } from '../constants/stringConstants';

const CountryDetailPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {theme} = useTheme()
  const mainData = localStorage.getItem("localData") as string
  const value = JSON.parse(mainData)
  const data = location.state.data
  useEffect(()=>{
    const bodyElement  = document.querySelector<HTMLElement>(".body")!
    if(theme === "dark" && bodyElement){
      bodyElement.style.backgroundColor = "#202C36"      
    }
    else{
      if(bodyElement)
      bodyElement.style.backgroundColor = "#FAFAFA"      
    }
  },[theme])  
  const languages = data.languages?.length > 0 ? data.languages.reduce((accumulator : string, currentValue: string) => {
    return accumulator + ", " + currentValue;
  }) : [];
  const topLevelDomain = data.topLevelDomain?.length > 0 ? data.topLevelDomain.reduce((accumulator : string, currentValue: string) => {
    return accumulator + ", " + currentValue;
  }) : [];
  const currencies = data.currencies?.length > 0 ? data.currencies.reduce((accumulator : string, currentValue: string) => {
    return accumulator + ", " + currentValue;
  }) : [];
  const borders = data.borders?.length > 0 ? data.borders.map((item : string)=>{
    let str = ""
    value.forEach((ele: CountryDataType)=>{
      if(ele.alpha3Code === item){
        str = ele.name
      }
    })
    return str
  }) : []

  useEffect(()=>{
    const divElement = document.querySelector<HTMLElement>("#rightLayout")!
    if(window.innerWidth <= 768 && divElement && borders.length === 0){      
      divElement.classList.add("rightSectionLayout")
    }
    if(window.innerWidth > 768 && divElement && borders.length === 0){
      divElement.classList.remove("rightSectionLayout")      
    }
  },[])

  const handleClick = (val:string)=>{
    const getCountryDetail = value.find((item:CountryDataType)=> item.name === val)
    navigate("/detail", {
      state : {data:getCountryDetail}
    })
  }

  
  return (
    <div className={theme === "dark" ? 'countryDetailWrapper darkCountryDetailWrapper' : 'countryDetailWrapper'}>
      <button className= {theme === "dark" ? "backButtonWrapper darkBorderTag" : "backButtonWrapper" } onClick={()=>{
        navigate("/")
      }}>
        <ArrowLeftOutlined />
        <span className='backButton'>{BACK}</span>
      </button>
      <div className='detailSection'>
        <div className='leftSection'>          
          <img src={data.flag} className='detailFlagImage' alt='country flag'></img>          
        </div>
        <div id={"rightLayout"} className='rightSection'>
          <div className='countryInfoWrapper'>
            <div className='countryTitle'>{data.name}</div>
            <div className='subDetailWrapper'>
              <div className='subDetail'>
                <div className='commonDiv'><span className='fontWeight600'>{NATIVE_NAME}</span><span>{data.nativeName}</span></div>
                <div className='commonDiv'><span className='fontWeight600'>{POPULATION}</span> <span>{data.population}</span></div>
                <div className='commonDiv'><span className='fontWeight600'>{REGION}</span> <span>{data.region}</span></div>
                <div className='commonDiv'><span className='fontWeight600'>{SUB_REGION}</span> <span>{data.subregion}</span></div>
                <div className='commonDiv'><span className='fontWeight600'>{CAPITAL}</span> <span>{data.capital}</span></div>
              </div>
              <div className='subDetail'>
                <div className='commonDiv'><span className='fontWeight600'>{TOP_LEVEL_DOMAIN}</span> <span>{topLevelDomain}</span></div>
                <div className='commonDiv'><span className='fontWeight600'>{CURRENCIES}</span> <span>{currencies}</span></div>
                <div className='commonDiv'><span className='fontWeight600'>{LANGUAGES}</span> <span>{languages}</span></div>
              </div>
            </div>
            
            {borders?.length > 0 && <div className='footerPart'>
              <div className='footerTitle fontWeight600'>{BORDER_COUNTRIES}</div>
              <div className="footerContent">{borders.map((item: string)=>{
                return (<button key={item} onClick={()=>{
                  handleClick(item)
                }} className={theme === "dark" ? "borderTag darkBorderTag" : "borderTag"} >{item}</button>)
              })}</div>
            </div>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryDetailPage