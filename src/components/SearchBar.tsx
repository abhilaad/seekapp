import React, { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { useTheme } from '../themes/themeContext';
import { useAppDispatch } from '../store';
import { setCountryData } from '../countrySlice';
import "./SearchBar.css"
import CountryDataType from '../entities/CountryData';

const SearchBar = () => {  
    const [searchVal, setSearchVal] = useState<string>("")
    const dispatch = useAppDispatch()    
    const {theme} = useTheme()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
      const data = localStorage.getItem("localData") as string
      const value = JSON.parse(data)
        const arr = value?.filter((item:CountryDataType )=> item.name.toLowerCase().includes(event.target.value))
        debugger
        // if(arr?.length){
          dispatch(setCountryData(arr))
        // }        
        setSearchVal(event?.target?.value)        
    }
  return (
    <div className={theme === "dark" ? 'searchContainer darkSearchContainer' : 'searchContainer'}>
        <SearchOutlined className='searchInput' />
        <input placeholder='Search for a country...' className={theme === "dark" ? 'searchInput darkSearchInput' : 'searchInput'} value={searchVal} onChange={handleChange}type='text'></input>
    </div>
  )
}

export default SearchBar