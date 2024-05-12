
import SearchBar from './SearchBar'
import FilterBar from './FilterBar'
import "./Toolbar.css"

const Toolbar = () => {
  return (
    <div className='toolbar'>
        <SearchBar />
        <FilterBar />
    </div>
  )
}

export default Toolbar