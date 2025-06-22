import { useCallback, useEffect, useRef, useState } from "react";

const lerps = new Map();
let animReqRef = null;

/**
 * A custom React hook that tween-animates a numeric value over time using linear interpolation.
 * 
 * @function useTween
 * @param {number} initialValue - The starting value for the tween.
 * @returns {[number, (to: number, duration: number) => void]} A tuple:
 *  - "value": The current tweened value.
 *  - "tweenTo": A function to animate to a new target value over the specified duration (in milliseconds).
 */
function useTween(initialValue)
{
    const [value, setValue] = useState(initialValue);
    const valueRef = useRef(initialValue);
    const idRef = useRef(Symbol());

    const tweenTo = useCallback((to, duration) =>
    {
        const start = performance.now();
        lerps.set(idRef.current, { from: valueRef.current, to, duration, start, setValue });

        if (!animReqRef)
        {
            const Loop = (now) =>
            {
                const finished = [];

                lerps.forEach((lerp, key) =>
                {
                    const elapsed = now - start;
                    const time = Math.min(elapsed / lerp.duration, 1);
                    lerp.setValue(lerp.from + (lerp.to - lerp.from) * time);

                    if (time >= 1) finished.push(key);
                });

                finished.forEach((key) => lerps.delete(key));

                if (lerps.size > 0) animReqRef = requestAnimationFrame(Loop);
                else animReqRef = null;
            }

            animReqRef = requestAnimationFrame(Loop);
        }
    }, []);

    useEffect(() =>
    {
        valueRef.current = value;
    }, [value]);

    useEffect(() =>
    {
        return () =>
        {
            lerps.delete(idRef.current);
            if (lerps.size === 0 && animReqRef)
            {
                cancelAnimationFrame(animReqRef);
                animReqRef = null;
            }
        };
    }, []);

    return [value, tweenTo];
}

export default useTween;
