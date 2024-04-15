import { UserRole } from "../auth";

export interface ISidebarProps {
    isNonMobile: boolean
    drawerWidth: string
    user: any;
    isOpen: boolean
    setIsOpen: (value: boolean) => void
}