import React from 'react'
import '../Styles/About.css'
import painting from '../Assets/painting.png'
import { Link } from 'react-router-dom'
import About from './About'
import Explore from './Explore'
import Contacts from './Contacts'
import Header from './Header'

function Home() {
    return (
        <>

            <Header />
            <About />
            <Contacts />



        </>
    )
}

export default Home