import React from 'react'
import {Navbar} from "./Navbar";

export const Home = () => {
    return (
        <>
            <div className="head-nav full-width dark-bg">
                <div className="nav-logo fa-override">
                    <i className='fa fa-laptop' style={{"fontSize":"2rem", "color":"white"}}/>
                    <i className='fa fa-mobile' style={{"fontSize":"2rem", "color":"white"}}/>
                    <i className='fa fa-desktop' style={{"fontSize":"2rem", "color":"white"}}/>
                    <i className='fa fa-tablet' style={{"fontSize":"2rem", "color":"white"}}/>
                    <i className='fa fa-book' style={{"fontSize":"2rem", "color":"white"}}/>
                    <i className="fa  fa-apple" style={{"fontSize":"2rem", "color":"white"}}></i>
                    <i className="fa  fa-android" style={{"fontSize":"2rem", "color":"green"}}></i>
                    <i className="fa  fa-windows" style={{"fontSize":"2rem", "color":"blue"}}></i>

                    <h2 className={'navbar-title'}>Eea-zy Mart</h2>

                </div>

            </div>

            <Navbar></Navbar>

        </>
    )
}
