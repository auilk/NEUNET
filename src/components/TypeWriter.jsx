/**
 * Renders a typewriter-style text animation, revealing characters one by one.
 * Useful for simulating typing effects in UI components.
 *
 * @function TypeWriter
 * @param {Object} props - The props for the TypeWriter component.
 * @param {string} props.text - The full text to display with the typewriter effect.
 * @param {string} [props.fontSize="1rem"] - The font size of the text (e.g., "1rem", "16px").
 * @param {number} [props.width=100] - Percentage (0–100) of the text to display, relative to the full character count.
 * @return {JSX.Element} A JSX element that animates the given text as if typed.
 */
function TypeWriter({text, fontSize = "1rem", width = 100})
{
    const length = text.length;

    return(
        <div className="w-fit h-fit relative">
            <p className="font-jetbrains-mono"
                style={{
                    width: `${Math.floor(length * width / 100)}ch`,
                    fontSize: fontSize,
                    overflow: "hidden",
                    textWrap: "nowrap"
                }}
            >{text}</p>

            <div 
                className="absolute top-0 h-full bg-black animate-cursor-blink"
                style={{
                    width: `${parseFloat(fontSize) / 15}rem`,
                    right: `-${parseFloat(fontSize) / 15}rem`
                }}
            ></div>
        </div>
    );
}

export default TypeWriter;