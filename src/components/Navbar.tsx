import { MoonOutlined, MoonFilled } from '@ant-design/icons';
import { useTheme } from '../themes/themeContext';
import "./Navbar.css"
import { DARK_MODE, LIGHT_MODE, NAV_TITLE } from '../constants/stringConstants';
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={theme === "dark" ? "navWrapper navDarkMode" : "navWrapper"}>
        <div className='navTitle'>{NAV_TITLE}</div>
        {theme === "dark" ? <div className='modeSelector' onClick={toggleTheme}>
        <MoonFilled className='themeIcon' />
          {DARK_MODE}</div>
          : 
          <div className='modeSelector' onClick={toggleTheme}>
        <MoonOutlined className='themeIcon' />
          {LIGHT_MODE}</div>}
    </div>
  )
}

export default Navbar