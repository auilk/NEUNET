import React, { createContext, useEffect, useRef, useState } from "react";
import useTween from "../hook/useTween";

const NavbarContext = createContext(false);

function Navbar({ children, gap = "5px" , reveal = false, duration = 1000})
{
    const elementRef = useRef(null);

    const [s, sTweenTo] = useTween(0);

    useEffect(() =>
    {
        if (reveal) sTweenTo(1, duration);
    }, [reveal]);

    const leftElements = [];
    const centerElements = [];
    const rightElements = [];

    React.Children.forEach(children, (child) =>
    {
        if (!React.isValidElement(child)) return;

        switch (child.props.position)
        {
            case "left":
                leftElements.push(child);
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
            <nav
                ref={elementRef}
                className="p-5 flex relative after:content-[''] after:w-full after:h-[3px] after:scale-x-[var(--bt-scale)] after:absolute after:bottom-0 after:left-0 after:bg-black"
                style={{
                    "--bt-scale": s
                }}
            >
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