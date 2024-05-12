
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { useTheme } from '../themes/themeContext';
import { ConfigProvider, theme } from "antd";
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store';
import { setCountryData } from '../countrySlice';
import "./FilterBar.css"
import CountryDataType from '../entities/CountryData';

const FilterBar = () =>{
  const dispatch = useAppDispatch()
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const {theme: themeVal} = useTheme()
  const [filterVal, setFilterVal] = useState("")
  useEffect(()=>{
    if(filterVal?.length){
      const data = localStorage.getItem("localData") as string
      const value = JSON.parse(data)
      const arr = value?.filter((item: CountryDataType)=> item?.region.toLowerCase() === filterVal.toLowerCase())

      dispatch(setCountryData(arr))
    }
  },[filterVal])
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if(key === "1"){
      setFilterVal("Africa")
    }
    else if(key === "2"){
      setFilterVal("Americas")
    }
    else if(key === "2"){
      setFilterVal("Asia")
    }
    else if(key === "2"){
      setFilterVal("Europe")
    }
    else{
      setFilterVal("Oceania")
    }    
  };
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span>Africa</span>
      ),
    },
    {
      key: '2',
      label: (
        <span>America</span>
      ),    
    },
    {
      key: '3',
      label: (
        <span>Asia</span>
      )
    },
    {
      key: '4',
      label: (
        <span>Europe</span>
      )
    },
    {
      key: '5',
      label: (
        <span>Oceania</span>
      )
    }   
  ];

  return (
    <ConfigProvider theme={{
  algorithm: themeVal === "dark" ? darkAlgorithm : defaultAlgorithm,
 }} >
    <Dropdown trigger={['click']} className={themeVal === "dark" ? 'filterContainer darkFilterContainer ' : 'filterContainer'} menu={{ items, onClick }}>
      <div className='filterTitle'>
        <div>Filter by Region</div>      
        <DownOutlined />
      </div>           
    </Dropdown>
    </ConfigProvider>
  );
} 

export default FilterBar;