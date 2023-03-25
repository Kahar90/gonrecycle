import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const NavigationBar = () => {
    const handleLogout = () => {
        // alert("logout");
        const auth = getAuth();
        auth.signOut().then(() => {
          // Router.push("/login");
        });
      };
        
    return (
        <div className="navbar bg-base-100" style={{ height:'80px' }}>
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about"> About </Link></li>
                    <li><Link href="/maps"> Recycle </Link></li>
                    <li><Link href="/tracker"> Tracker</Link></li>
                    <li><Link href="/chatbot"> Chatbot </Link></li>
                    <li><Link href="/news&articles"> News & articles </Link></li>
                </ul>
                </div>
            </div>

            <div className="navbar-center">
                <Link href="/">
                    <Image src={"/img/logo.png"} width={200} height={50}/>
                </Link>
            </div>

            <div className="navbar-end">
                <button className="btn btn-ghost btn-circle">
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        <span className="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button>
            </div> 

            <button onClick={handleLogout} className="btn btn-ghost hover:bg-gray-100 float-right">
                <div className="flex flex-row items-center gap-0.5">
                <Image src="/img/svgs/logout.svg" width={20} height={20} />
                </div>
            </button>
        </div>
    ); 
};

export default NavigationBar;
