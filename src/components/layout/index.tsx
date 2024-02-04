import { useState } from "react";
import TopBarComponent from "../top-bar";
import { Outlet, useLocation } from "react-router-dom";
import {useMediaQuery } from "@mui/material";
import SidebarComponent from "../sidebar";
import { RootContainer, MainSectionContainer } from "./styles";

const LayoutComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const isNonMobile = useMediaQuery('(min-width:600px)');

    return (
        location.pathname === '/login' || location.pathname === '/register' ? (
            <>
                <Outlet />
            </>
        ) : (
            <>
                <RootContainer>
                    <SidebarComponent isNonMobile={isNonMobile} drawerWidth='250px' isOpen={isOpen} setIsOpen={setIsOpen} />
                    <MainSectionContainer>
                        <TopBarComponent isOpen={isOpen} setIsOpen={setIsOpen} />
                        <Outlet />
                    </MainSectionContainer>
                </RootContainer>
            </>
        )
    );
};

export default LayoutComponent;
