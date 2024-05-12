export default interface CountryDataType {
    alpha3Code: string;
    borders: string[];
    capital: string;
    currencies: { name : string};
    flag: string;
    languages: { name : string};
    name: string;
    nativeName: string;
    population: number;
    region: string;
    subregion: string;
    topLevelDomain: string[];
}