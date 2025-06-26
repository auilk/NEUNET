import React, { createContext } from "react";

const NavbarContext = createContext(false);

function Navbar({ children, gap = "5px" })
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
            <nav className="mx-10 py-5 flex border-b-3">
                <div 
                    className="flex justify-start items-center flex-[5%]"
                    style={{
                        gap: gap
                    }}
                >
                    {leftElements}
                </div>

                <div 
                    className="flex justify-center items-center flex-[95%]"
                    style={{
                        gap: gap
                    }}
                >
                    {centerElements}
                </div>

                <div
                    className="flex justify-end items-center flex-[5%]"
                    style={{
                        gap: gap
                    }}
                >
                    {rightElements}
                </div>
            </nav>
        </NavbarContext.Provider>
    );
}

export { Navbar, NavbarContext };