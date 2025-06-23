import { useContext, useEffect, useRef, useState } from "react";
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
    if (!context) throw new Error("<NavLink> can only be used within <NavBar>.");

    const elementRef = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() =>
    {
        setHeight(elementRef.current.offsetHeight);
    }, []);

    return(
        <a
            ref={elementRef}
            className="font-black overflow-hidden relative cursor-pointer group block"
            style={{
                width: `calc(${fontSize} * 3.1)`,
                fontFamily: font,
                fontSize: fontSize,
            }}
            href={to}
        >
            <div
                className="opacity-0"
            >
                {label}
            </div>

            <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center items-center gap-0 transition-[gap] w-10 group-hover:gap-[var(--hover-gap)] pointer-events-none"
                style={{
                    "--hover-gap": `calc(${fontSize} / 5)` 
                }}
            >
                {label.split('').map((letter, index) =>
                (
                    <TweenedText
                        key={index} 
                        text={letter} 
                        startY={hide ? 0 : index % 2 === 0 ? height : -height} 
                        targetY={hide ? index % 2 === 0 ? height : -height : 0} 
                        duration={duration}
                    ></TweenedText>
                ))}
            </div>
        </a>
    );
}

export default Navlink;