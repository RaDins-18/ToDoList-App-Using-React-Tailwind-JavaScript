import { useState } from 'react'
import React from 'react'
import Navbar from '../components/Navbar'
import Themes from '../components/Themes';
import './Home.css';
import './Common.css';

const Home = () => {
  let activeTheme =  localStorage.getItem("theme");

  const [theme, setTheme] = useState(activeTheme ? activeTheme : 0)

  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div className={`h-screen w-full bg-gradient-to-r from-[${Themes[theme].fromGradient}] to-[${Themes[theme].toGradient}] flex flex-col justify-center items-center text-black pt-8 lg:pt-0 `}>
        <div className='box'>
          <div className='wave -one'> </div>
          <div className='wave -two'></div>
        </div>
        <div className={`home-heading text-[${Themes[theme].color1}] text-5xl sm:text-[90px] lg:text-9xl font-My-Font home-typewriter leading-non mb-6`}>
          Change your life!
        </div>
      </div>
    </>
  )
}

export default Home