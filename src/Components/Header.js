import React, { useState } from "react";
import { ReactComponent as GitStatsLogo } from '../Images/logo.svg';
import DataProvider from "../Data-provider/index"
import Loader from '../Components/Extras/Loader'
import { DebounceInput } from 'react-debounce-input';
import { Link } from "react-router-dom";

function Header() {
    let [imageUrl, setImageUrl] = useState("img/sun.png");
    let [searchUsers, setSearchUsers] = useState();
    let body = document.querySelector("body");

    //Initial load theme set
    if(localStorage.getItem('theme') === 'light'){
        body.classList.remove('night-mode');
        imageUrl = "img/moon.png"
    }

    function changeTheme() {    
        if (localStorage.getItem('theme') === 'light') {
            localStorage.setItem('theme', 'dark');
            body.classList.add('night-mode');
            setImageUrl("/img/sun.png");
        } else {
            localStorage.setItem('theme', 'light');
            body.classList.remove('night-mode');
            setImageUrl("/img/moon.png");
        }
    };

    function openSearch() {
        let search = document.querySelector('.search-wrapper');
        if (search.classList.contains('open')) {
            search.classList.remove('open')
        }
        else {
            search.classList.add('open')
        }
    }

    function closeSearch(){
        let searchContainer = document.querySelector('.search-wrapper');
        searchContainer.classList.remove('open')
    }

    // To-Do
    // #3\ the weird sliding of search results when seach input goes out of focus // will be fixed by #1
    // #5\ make a landing page with search feature
    // #7\ add few more detailed graphs (active on x week day) (contribution to projects other then own) 
    // 8#\ simplify cacluation code. (I'll fix it.) 
    // 9#\ handle the case if our api server is down 404,500 errors 


    async function search(event) {
        let result = await DataProvider.getSearchUsers(event.target.value);
        let users = result && result.map(user =>
            <li key={user.login}><a href={`/${user.login}`}><img src={user.avatar_url} alt={user.login}/> {user.login}</a></li>
        );
        setSearchUsers(users);
    }

    return (
        <header>
            <div className="container">
                <nav className="navbar navbar-expand-lg">
                    <Link className="navbar-brand text-white logo" to="/">
                        <GitStatsLogo height={30} />
                        {/* <img src={process.env.PUBLIC_URL + "/cat-logo.png"} alt="" /> */}
                    </Link>
                    <div className="navbar-collapse" id="navbarNavDropdown">
                        <button onClick={openSearch} className="search_icon">{Loader.search_icon}</button>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active active nav-item position-relative search-wrapper">
                                <Link className="nav-link text-light-gray">
                                    <DebounceInput
                                        minLength={2}
                                        debounceTimeout={500}
                                        className="search"
                                        placeholder="Search..."
                                        onChange={search}
                                        onBlur={() => closeSearch()}
                                        id="search_bar"
                                    />
                                </Link>
                                {searchUsers && (
                                    <div className="Search-result">
                                        <ul className="search-result">
                                            {/*No Need to scroll to bottom  */}
                                            {/* best match is always at top */}
                                            {searchUsers.length > 0
                                                ? searchUsers
                                                : Loader.user_not_found}
                                        </ul>
                                    </div>
                                )}
                            </li>
                            <li className="mobile-theme">
                                <div className="change-theme mt-2 font-size-13">
                                    <button onClick={changeTheme}>
                                        <img
                                            className="mr-1"
                                            src={process.env.PUBLIC_URL + imageUrl}
                                            alt=""
                                        />
                                        <span className="d-none d-lg-inline-block d-sm-inline-block">{localStorage.getItem('theme') === 'light' ? "Night Mode" : "Day Mode"}</span>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;