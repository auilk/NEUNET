import { useEffect, useRef, useState } from "react";

const lerps = new Map();
let animReqRef = null;

/**
 * Custom hook that performs a linear interpolation (lerp) from a starting value to an ending value
 * over a specified duration, optionally delayed by a set time.
 *
 * @function useLerp
 * @param {number} from - The starting value of the interpolation.
 * @param {number} to - The ending value of the interpolation.
 * @param {number} duration - The total duration (in milliseconds) over which the interpolation occurs.
 * @param {number} [delay=0] - Optional delay (in milliseconds) before the interpolation starts.
 * @returns {number} - The current interpolated value, updated over time.
 */
function useLerp(from, to, duration, delay = 0)
{
    const [value, setValue] = useState(from);
    const idRef = useRef(Symbol());

    useEffect(() =>
    {
        const start = performance.now();

        lerps.set(idRef.current, { from, to, duration, setValue, start , delay});

        const loop = (now) =>
        {
            const finished = [];

            lerps.forEach((lerp, key) =>
            {
                let elapsed = now - lerp.start;
                if (elapsed > lerp.delay)
                {
                    elapsed = now - lerp.start - lerp.delay;
                    const time = Math.max(0, Math.min((elapsed / lerp.duration), 1));
                    const value = Math.max(lerp.from, lerp.from + (lerp.to - lerp.from) * time);

                    lerp.setValue(value);
    
                    if (time >= 1)
                    {
                        finished.push(key);
                    }
                }

            });

            finished.forEach((key) => lerps.delete(key));

            if (lerps.size > 0)
            {
                animReqRef = requestAnimationFrame(loop);
            }
            else
            {
                animReqRef = null;
            }
        };

        if (!animReqRef)
        {
            animReqRef = requestAnimationFrame(loop);
        }

        return () =>
        {
            lerps.delete(idRef.current);
            if (lerps.size === 0 && animReqRef)
            {
                cancelAnimationFrame(animReqRef);
                animReqRef = null;
            }
        };
    }, [from, to, duration, delay]);

    return value;
}

export default useLerp;
