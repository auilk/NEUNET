import { useLayoutEffect, useRef, useState } from "react";

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
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    
    const elementRef = useRef(null);

    useLayoutEffect(() =>
    {
        setHeight(elementRef.current.offsetHeight);
        setWidth(elementRef.current.offsetWidth);
    }, []);

    return(
        <a href={to} className="w-fit h-fit overflow-hidden">
            <div 
                className="flex justify-center items-center relative before:content-[''] before:w-10 before:h-full before:absolute before:top-0 before:left-0 before:bg-black before:z-0 after:content-[''] after:w-10 after:h-full after:absolute after:top-0 after:right-0 after:bg-black after:z-0"
                style={{
                    width: width + 30,
                    height: height + 30
                }}
            >
                <div 
                    className="bg-white relative z-1"
                    style={{
                        width: width,
                        height: height
                    }}
                >
                    <span
                        ref={elementRef}
                        className="font-black absolute top-1/2 left-1/2 -translate-1/2 z-2"
                        style={{
                            fontSize: fontSize,
                            fontFamily: font
                        }}
                    >
                        {label}
                    </span>
                </div>

            </div>
        </a>
    );
}

export default Navlink;