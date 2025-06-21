import { useEffect, useState } from "react";

/**
 * A React hook that returns the scroll progress of a referenced element,
 * normalized between a start and end percentage.
 * Useful for triggering animations or effects based on scroll position.
 *
 * @function useScroll
 * @param {React.RefObject<HTMLElement>} ref - The ref of the DOM element to track scroll on.
 * @param {number} [start=0] - The start threshold (in percent, 0–100) where the animation begins.
 * @param {number} [end=100] - The end threshold (in percent, 0–100) where the animation completes.
 * @return {number} the current progress percentage of the scroll (in percent, 0-100).
 */
function useScroll(ref, start = 0, end = 100)
{
    const [progress, setProgress] = useState(0);

    useEffect(() =>
    {
        const handleScroll = () =>
        {
            const rect = ref.current.getBoundingClientRect();

            const elementTop = rect.top + window.scrollY;
            const begin = elementTop + (rect.height / 2) * start / 100;
            const finish = elementTop + (rect.height / 2) * end / 100;
            const scroll = window.scrollY - begin;

            const clamped = Math.max(Math.min((scroll / (finish - begin)), 1), 0);

            setProgress(clamped * 100);
        }

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () =>
        {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return progress;
}

export default useScroll;