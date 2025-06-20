/**
 * Renders a navigation link with customizable label, font size, and font family.
 * Includes a hover animation for interactive visual feedback.
 *
 * @function Navlink
 * @param {Object} props - The properties object.
 * @param {string} props.to - The destination URL or path for the link.
 * @param {string} [props.label="Link"] - The text to display for the link.
 * @param {string} [props.fontSize="10rem"] - The CSS font size for the link text.
 * @param {string} [props.font="jetbrains-mono"] - The font family to apply to the link text.
 * @returns {JSX.Element} A styled navigation link with hover animation.
 */
function Navlink({to ,label = "Link", fontSize = "10rem", font = "jetbrains-mono"})
{
    return(
        <a
            className="relative cursor-pointer group"
            style={{
                fontFamily: font,
                fontSize: fontSize,
                width: `calc(${fontSize} * 3.1)` 
            }}
            href={to}
        >
            <div className="opacity-0">{label}</div>

            <div 
                className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center items-center gap-0 transition-[gap] w-10 group-hover:gap-[var(--hover-gap)] pointer-events-none"
                style={{
                    "--hover-gap": `calc(${fontSize} / 5)` 
                }}
            >
                {label.split('').map((letter, index) => (<span key={index}>{letter}</span>))}
            </div>
        </a>
    );
}

export default Navlink;