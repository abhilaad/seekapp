import db from "./data.json"

export const getCountryData = async()=>{
   return new Promise((resolve, reject) => {
    if(db.length === 0){
        reject([])
    }
    let arr: {}[] = []
    db?.map((item)=>{
        let obj = {
            alpha3Code: item.alpha3Code,
            borders: item.borders || [],
            capital: item.capital,
            currencies: item.currencies?.map((ele)=>{
                return ele.name
            }),
            flag: item.flag,
            languages: item.languages?.map((ele)=>{
                return ele.name
            }),
            name: item.name,
            nativeName: item.nativeName,
            population: item.population,
            region: item.region,
            subregion: item.subregion,
            topLevelDomain: item.topLevelDomain,
        }
        arr.push(obj)
    })
    localStorage.setItem("localData", JSON.stringify(arr))
    resolve(arr)      
    })   
}