import { useContext, useLayoutEffect, useRef, useState } from "react";
import { NavbarContext } from "./Navbar"
import TweenedText from "./TweenedText";

/**
 * Renders a navigation link with customizable label, font size, and font family.
 * Includes a hover animation for interactive visual feedback.
 *
 * @function Navlink
 * @param {Object} props - The properties object.
 * @param {"left" | "center" | "right"} [props.position="center"] - Alignment of the link inside the Navbar component.
 * @param {string} props.to - The destination URL or path for the link.
 * @param {string} [props.label="Link"] - The text to display for the link.
 * @param {string} [props.fontSize="10rem"] - The CSS font size for the link text.
 * @param {string} [props.font="jetbrains-mono"] - The font family to apply to the link text.
 * @param {boolean} [props.hide=false] - Whether to hide the label (used for animation control).
 * @param {number} [props.duration=1000] - Duration of the animation in milliseconds.
 * @returns {JSX.Element} A styled navigation link with hover animation.
 */
function Navlink({ position = "center", to ,label = "Link", fontSize = "1rem", font = "jetbrains-mono", hide = false, duration = 1000 })
{
    const context = useContext(NavbarContext);
    if (!context) throw new Error("<Navlink> can only be used within <NavBar>.");

    const [height, setHeight] = useState(null);
    const [width, setWidth] = useState(null);
    
    const elementRef = useRef(null);

    useLayoutEffect(() =>
    {
        setHeight(elementRef.current.offsetHeight);
        setWidth(elementRef.current.children[0].offsetWidth);
    }, []);

    return(
        <a
            ref={elementRef}
            className="font-black overflow-hidden relative cursor-pointer group block"
            style={{
                width: `calc(${width}px + ${fontSize} / 5 * ${label.length})`,
                fontFamily: font,
                fontSize: fontSize,
            }}
            href={to}
        >
            <span
                className="opacity-0"
            >
                {label}
            </span>

            <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center items-center gap-0 transition-[gap] w-10 group-hover:gap-[var(--hover-gap)] pointer-events-none"
                style={{
                    "--hover-gap": `calc(${fontSize} / 5)` 
                }}
            >
                {height && label.split('').map((letter, index) =>
                (
                    <TweenedText
                        key={index} 
                        text={letter} 
                        startY={hide ? index % 2 === 0 ? height : -height : 0}
                        targetY={hide ? index % 2 === 0 ? height : -height : 0}
                        duration={duration}
                    ></TweenedText>
                ))}
            </div>
        </a>
    );
}

export default Navlink;