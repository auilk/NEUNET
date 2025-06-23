import React, { createContext } from "react";

const NavbarContext = createContext(false);

function Navbar({ children, gap = "5px", padding = "1.25rem", borderWidth = "2px" })
{
    const leftElements = []
    const centerElements = []
    const rightElements = []

    React.Children.forEach(children, (child) =>
    {
        if (!React.isValidElement(child)) return;

        switch (child.props.position)
        {
            case "left":
                leftElements.push(child)
                break;
            case "center":
                centerElements.push(child);
                break;
            case "right":
                rightElements.push(child);
                break;
            default:
                centerElements.push(child);
                break;
        }
    });

    return(
        <NavbarContext.Provider value={true}>
            <nav className="flex">
                <div className="flex justify-center items-center flex-[5%]">{leftElements}</div>
                <div className="flex justify-center items-center flex-[95%]">{centerElements}</div>
                <div className="flex justify-center items-center flex-[5%]">{rightElements}</div>
            </nav>
        </NavbarContext.Provider>
    );
}

export { Navbar, NavbarContext };