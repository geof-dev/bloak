import { Button, DarkThemeToggle, Navbar, useThemeMode } from "flowbite-react";
import { useWeb3ModalTheme } from '@web3modal/ethers/react'


const ExampleNavbar = function () {
  const { computedMode, setMode, toggleMode } = useThemeMode();
  const { setThemeMode } = useWeb3ModalTheme();
  setThemeMode(computedMode);

  return (
    <Navbar className="fixed z-30 w-full bg-white py-0 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="/">
              <img alt="" src="/images/bloak-logo.png" className="mr-3 h-6 sm:h-8" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
                Bloak
              </span>
            </Navbar.Brand>
          </div>
            <div className="flex items-center gap-3">
                <DarkThemeToggle/>
                <w3m-button/>
            </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;
