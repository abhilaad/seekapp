import { ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import "./CountryDetailPage.css"
import { useTheme } from '../themes/themeContext';
import CountryDataType from '../entities/CountryData';
import { useEffect } from 'react';

const CountryDetailPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {theme} = useTheme()
  const mainData = localStorage.getItem("localData") as string
  const value = JSON.parse(mainData)
  const data = location.state.data
  useEffect(()=>{
    const bodyElement  = document.querySelector<HTMLElement>(".body")!
    if(theme === "dark"){
      bodyElement.style.backgroundColor = "#202C36"      
    }
    else{
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

  
  return (
    <div className={theme === "dark" ? 'countryDetailWrapper darkCountryDetailWrapper' : 'countryDetailWrapper'}>
      <button className='backButtonWrapper darkBorderTag' onClick={()=>{
        navigate("/")
      }}>
        <ArrowLeftOutlined />
        <span className='backButton'>Back</span>
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
                <div className='commonDiv'><span className='fontWeight600'>Native name: </span><span>{data.nativeName}</span></div>
                <div className='commonDiv'><span className='fontWeight600'>Population: </span> <span>{data.population}</span></div>
                <div className='commonDiv'><span className='fontWeight600'>Region: </span> <span>{data.region}</span></div>
                <div className='commonDiv'><span className='fontWeight600'>Sub Region: </span> <span>{data.subregion}</span></div>
                <div className='commonDiv'><span className='fontWeight600'>Capital: </span> <span>{data.capital}</span></div>
              </div>
              <div className='subDetail'>
                <div className='commonDiv'><span className='fontWeight600'>Top Level Domain: </span> <span>{topLevelDomain}</span></div>
                <div className='commonDiv'><span className='fontWeight600'>Currencies: </span> <span>{currencies}</span></div>
                <div className='commonDiv'><span className='fontWeight600'>Languages:</span> <span>{languages}</span></div>
              </div>
            </div>
            
            {borders?.length > 0 && <div className='footerPart'>
              <div className='footerTitle'>Border Countries:</div>
              <div className="footerContent">{borders.map((item: string)=>{
                return (<button className={theme === "dark" ? "borderTag darkBorderTag" : "borderTag"} >{item}</button>)
              })}</div>
            </div>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default CountryDetailPage