import { FC, useEffect, useState } from "react";
import TopBarComponent from "../top-bar";
import { Outlet, useLocation } from "react-router-dom";
import {useMediaQuery } from "@mui/material";
import SidebarComponent from "../sidebar";
import { RootContainer, MainSectionContainer } from "./styles";
import { useAppDispatch } from "../../utils/hook";
import { getPublicUser } from "../../store/thunks/auth";

const LayoutComponent: FC = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(true);
    const dispatch = useAppDispatch()
    const location = useLocation();
    const isNonMobile = useMediaQuery('(min-width:760px)');

    useEffect(() => {
        dispatch(getPublicUser())
    }, [dispatch])

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
                        <TopBarComponent isOpen={isOpen} setIsOpen={setIsOpen} isNonMobile={isNonMobile} />
                        <Outlet />
                    </MainSectionContainer>
                </RootContainer>
            </>
        )
    );
};

export default LayoutComponent;
