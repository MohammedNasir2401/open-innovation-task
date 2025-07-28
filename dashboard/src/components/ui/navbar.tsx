
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem, Navbar, NavbarBrand } from "flowbite-react";
import profilePicture from '@/assets/profile-picture.jpg';

export function AppNavBar() {
    return (
        <div className="border-b border-gray-200 bg-white py-2 dark:border-gray-700 dark:bg-gray-800 ">
            <div className='container mx-auto px-4'>
                <Navbar fluid rounded>
                    <NavbarBrand>
                        <img src="/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
                    </NavbarBrand>
                    <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline
                            label={
                                <Avatar alt="User settings" img={profilePicture} rounded />
                            }>
                            <DropdownHeader>
                                <span className="block text-sm">Admin</span>
                                <span className="block truncate text-sm font-medium">admin@mail.com</span>
                            </DropdownHeader>
                            <DropdownDivider />
                            <DropdownItem>Sign out</DropdownItem>
                        </Dropdown>
                    </div>
                </Navbar >
            </div >
        </div >
    );
}
