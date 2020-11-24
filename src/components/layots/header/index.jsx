import React from "react"
import {Layout} from "antd";
import "./style.css"
const {Header} = Layout

const HeaderApp =()=>{
    return (
        <Header className="header">
            <div className="header-logo">
                <img src="https://www.sibers.com/images/logo.png" alt="logo"/>
            </div>
            <div className="header-title">
                Contacts
            </div>
        </Header>
    )
}
export default HeaderApp