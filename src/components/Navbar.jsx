import React from 'react';
import './Navbar.css';
import { useEffect } from 'react';
import logo from "../assets/radins-logo.png";
import Themes from './Themes';

const Navbar = ({theme, setTheme}) => {

    const saveToLS = () => {
        localStorage.setItem("theme", theme);
    };

    useEffect(() => {
        saveToLS()
    }, [theme])

    const changeTheme = (e, t) => {
        e.stopPropagation();
        setTheme(t)
    }
    
    return (
        <nav className='navbar w-full flex flex-col sm:flex-row h-20 justify-between items-end sm:items-center sm:gap-4 absolute'>
            <div className="start h-20 w-[20%]">
                <a href="https://github.com/RaDins-18" target='_blank' className="github-corner">
                    <svg width="80" height="80" viewBox="0 0 250 250" id="github" className="pointer">
                        <path fill={Themes[theme].bg} d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                        <path fill={Themes[theme].color1} d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" id="octo-tail"></path>
                        <path fill={Themes[theme].color1} d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" id="octo-body"></path>
                    </svg>
                </a>
            </div>

            <div className="middle h-20 w-[90%] sm:w-[100%] lg:w-[80%] flex justify-between items-center px-8 sm:px-0 lg:px-10">
                <div className={`before-logo h-10 w-[60px] bg-[${Themes[theme].bg}] mr-[-30px] rounded-s-2xl`}></div>
                <div className="logo h-12 w-[80px] rounded-full flex items-center overflow-hidden mx-[7px] z-10">
                    <a href="https://radins-portfolio.vercel.app/" target="_blank">
                        <img src={logo} alt="logo" />
                    </a>
                </div>
                <div className={`after-logo h-10 w-[100%] bg-[${Themes[theme].bg}] text-[${Themes[theme].color1}] ml-[-30px] rounded-e-2xl flex justify-end items-center pr-6 font-medium`}>
                    <ul className='flex gap-6'>
                        <li>
                            <a href="/">HOME</a>
                        </li>
                        <li>
                            <a href="/tasks">TASKS</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="end h-20 w-[100%] sm:w-[20%] lg:w-[20%] flex mt-5 mb-[-40px] sm:mt-0 sm:mb-0 justify-end items-center gap-4 pr-8 sm:pr-0 lg:pr-10 mr-3">
                <button id="theme-1" className={`theme bg-gradient-to-r from-[${Themes[0].fromGradient}] to-[${Themes[0].toGradient}] w-9 h-9 rounded-full border border-[#d1dae3] hover:shadow-[white_0_0_8px] transition-all animate-pulse hover:animate-none`} onClick={(e) => changeTheme(e, 0)}></button>
                <button id="theme-2" className={`theme bg-gradient-to-r from-[${Themes[1].fromGradient}] to-[${Themes[1].toGradient}] w-9 h-9 rounded-full border border-[#d1dae3] hover:shadow-[white_0_0_8px] transition-all animate-pulse hover:animate-none`} onClick={(e) => changeTheme(e, 1)}></button>
                <button id="theme-3" className={`theme bg-gradient-to-r from-[${Themes[2].fromGradient}] to-[${Themes[2].toGradient}] w-9 h-9 rounded-full border border-[#d1dae3] hover:shadow-[white_0_0_8px] transition-all animate-pulse hover:animate-none`} onClick={(e) => changeTheme(e, 2)}></button>
            </div>
        </nav>
    )
}

export default Navbar
