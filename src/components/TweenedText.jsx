import { useEffect } from "react";
import useTween from "../hook/useTween";

/**
 * Renders animated text that tween-moves from a start position to a target position.
 *
 * @function TweenedText
 * @param {Object} props - Component props.
 * @param {string} props.text - The text to display.
 * @param {number} [props.startX=0] - The initial horizontal position (in pixels).
 * @param {number} [props.startY=0] - The initial vertical position (in pixels).
 * @param {number|null} [props.targetX=null] - The target horizontal position to tween to (in pixels). If null, no horizontal animation occurs.
 * @param {number|null} [props.targetY=null] - The target vertical position to tween to (in pixels). If null, no vertical animation occurs.
 * @param {number} [props.duration=1000] - Duration of the tween animation in milliseconds.
 * @returns {JSX.Element} The animated text element positioned and moved according to tweened values.
 */
function TweenedText({ text, startX = 0, startY = 0, targetX = null, targetY = null , duration = 1000})
{
    const [xVal, xMoveTo] = useTween(startX);
    const [yVal, yMoveTo] = useTween(startY);

    useEffect(() =>
    {
        if (targetX !== null)
        {
            xMoveTo(targetX, duration);
        }
        if (targetY !== null)
        {
            yMoveTo(targetY, duration);
        }
    }, [targetX, targetY, duration]);

    return (
        <span 
            style={{
                position: "relative", 
                top: yVal, 
                left: xVal
            }}
        >
            {text}
        </span>
    );
}

export default TweenedText;