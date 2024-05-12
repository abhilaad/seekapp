import { MoonOutlined, MoonFilled } from '@ant-design/icons';
import { useTheme } from '../themes/themeContext';
import "./Navbar.css"
const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className={theme === "dark" ? "navWrapper navDarkMode" : "navWrapper"}>
        <div className='navTitle'>Where in the world?</div>
        {theme === "dark" ? <div className='modeSelector' onClick={toggleTheme}>
        <MoonFilled className='themeIcon' />
          Dark Mode</div>
          : 
          <div className='modeSelector' onClick={toggleTheme}>
        <MoonOutlined className='themeIcon' />
          Light Mode</div>}
    </div>
  )
}

export default Navbar