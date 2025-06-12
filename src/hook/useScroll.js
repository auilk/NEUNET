import { useEffect, useState } from "react";

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