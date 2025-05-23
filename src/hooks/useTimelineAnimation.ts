import gsap from "gsap";

export const useTimelineAnimation = (
    startRef: React.RefObject<HTMLDivElement | null>,
    endRef: React.RefObject<HTMLDivElement | null>,
    setStart: (d: number) => void,
    setEnd: (d: number) => void
) => {
    const animate = (
        index: number,
        start: number,
        end: number,
        data: any[],
        duration: number
    ) => {
        if (!startRef.current || !endRef.current) return;

        const newStart = Number(data[index].events[0].date);
        const newEnd = Number(data[index].events[data.length - 1].date);
        const animTime = (duration + 300) / 1000;

        gsap.to(startRef.current, {
            duration: animTime,
            textContent: `+=${newStart - start}`,
            roundProps: "textContent",
            ease: "none",
            onUpdate: () => setStart(newStart),
        });

        gsap.to(endRef.current, {
            duration: animTime,
            textContent: `+=${newEnd - end}`,
            roundProps: "textContent",
            ease: "none",
            onUpdate: () => setEnd(newEnd),
        });
    };

    return { animate };
};
