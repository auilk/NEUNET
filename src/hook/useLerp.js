import { useEffect, useRef, useState } from "react";

const lerps = new Map();
let animReqRef = null;

function useLerp(from, to, duration)
{
    const [value, setValue] = useState(from);
    const idRef = useRef(Symbol());

    useEffect(() =>
    {
        const start = performance.now();

        lerps.set(idRef.current, { from, to, duration, setValue, start });

        const loop = (now) =>
        {
            const finished = [];

            lerps.forEach((lerp, key) =>
            {
                const elapsed = now - lerp.start;
                const time = Math.min(elapsed / lerp.duration, 1);
                const value = Math.max(lerp.from, lerp.from + (lerp.to - lerp.from) * time);

                lerp.setValue(value);

                if (time >= 1)
                {
                    finished.push(key);
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
    }, [from, to, duration]);

    return value;
}

export default useLerp;
