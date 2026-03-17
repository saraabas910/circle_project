import React from 'react'
import {
  Navbar as HerouiNavbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/authContext';




export default function navbar() {

  const navigate=useNavigate()
  const { setUserToken, userData } = useContext(AuthContext);



    function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userData"); 
  setUserToken(null);
  setUserData(null); 
  navigate("/signin");
}
  return (
      <HerouiNavbar>
      <NavbarBrand>
       <Link to={"/"}> <p className="font-bold text-inherit">CIRCLE</p></Link> 
      </NavbarBrand>


      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src= {userData?.photo}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2"
            onPress={()=>navigate("/profile")}>
            
              <p className="font-semibold">my profile</p>
              
            </DropdownItem>
            <DropdownItem key="changepassword" onPress={() => navigate("/change-password")}>
                      Settings
                    </DropdownItem>
     
            <DropdownItem  onClick={logout} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </HerouiNavbar>
  )
}
