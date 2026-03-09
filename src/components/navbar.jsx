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
  const { setUserToken } = useContext(AuthContext);


     function logOut(){

    localStorage.removeItem("token"); 
    setUserToken(null);

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
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <Link to={"/profile"}>
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
              </Link>
            </DropdownItem>
   
            <DropdownItem  onClick={logOut} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </HerouiNavbar>
  )
}
