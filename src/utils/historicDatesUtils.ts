export const fadeIt = (
    sliderEl: HTMLDivElement | null,
    callback: () => void
): void => {
    sliderEl?.classList.remove('slider_show');
    setTimeout(callback, 300);
};

export const animateDatesRange = (
    index: number,
    data: typeof import('../mocks/historic-dates').historicDates,
    startRef: HTMLDivElement | null,
    endRef: HTMLDivElement | null,
    currentStart: number,
    currentEnd: number,
    duration: number,
    setStart: (val: number) => void,
    setEnd: (val: number) => void
): void => {
    const newStart = Number(data[index].events[0].date);
    const newEnd = Number(data[index].events[data.length - 1].date);
    const animTime = (duration + 300) / 1000;

    import('gsap').then(({ default: gsap }) => {
        gsap.to(startRef, {
            duration: animTime,
            textContent: `+=${newStart - currentStart}`,
            roundProps: 'textContent',
            ease: 'none',
            onUpdate: () => setStart(newStart),
        });

        gsap.to(endRef, {
            duration: animTime,
            textContent: `+=${newEnd - currentEnd}`,
            roundProps: 'textContent',
            ease: 'none',
            onUpdate: () => setEnd(newEnd),
        });
    });
};
