import React, {useRef} from 'react';
import {historicDates} from '../../mocks/historic-dates';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './main-page.scss';
import {SliderBlock} from "../../components/SliderBlock";
import {RangeBlock} from "../../components/RangeBlock";
import {fadeIt, animateDatesRange} from '../../utils/historicDatesUtils';
import {SpinnerCircle} from "../../components/SpinnerCircle";
import {EventsNavigation} from "../../components/EventsNavigation";

const MainPage: React.FC = () => {

    const numberOfEvents = historicDates.length;
    const angleBetweenDots = 360 / numberOfEvents;
    const defaultTimeOfRotation = 300;

    const sliderRef = useRef<HTMLDivElement>(null);
    const mainCircleRef = useRef<HTMLDivElement>(null);
    const startDateRef = useRef<HTMLDivElement>(null);
    const endDateRef = useRef<HTMLDivElement>(null);
    const [angle, setAngle] = React.useState<number>(angleBetweenDots);
    const [currentEvent, setCurrentEvent] = React.useState<number>(0);
    const [timeOfRotation, setTimeOfRotation] = React.useState<number>(defaultTimeOfRotation);
    const [startDate, setStartDate] = React.useState<number>(Number(historicDates[0].events[0].date));
    const [endDate, setEndDate] = React.useState<number>(Number(historicDates[0].events[historicDates.length - 1].date));

    React.useEffect(() => {
        const timer = setTimeout(() => {
            sliderRef.current?.classList.add("slider_show");
            clearTimeout(timer);
        }, 300);
    }, [currentEvent]);

    function loadPrev(): void {
        loadThis(currentEvent - 1);
    }

    function loadNext(): void {
        loadThis(currentEvent + 1);
    }

    function loadThis(index: number): void {
        animateDatesRange(
            index,
            historicDates,
            startDateRef.current,
            endDateRef.current,
            startDate,
            endDate,
            timeOfRotation,
            setStartDate,
            setEndDate
        );

        mainCircleRef.current?.children[index].classList.add('spinner__shoulder_active');

        const angleOfRotation = angleBetweenDots - index * angleBetweenDots;
        setTimeOfRotation(Math.abs(currentEvent - index) * defaultTimeOfRotation);

        setTimeout(() => setAngle(angleOfRotation), 300);

        fadeIt(sliderRef.current, () => setCurrentEvent(index));
    }

    return (
        <main className='main'>
            <section className='historic-dates'>
                <h1 className='historic-dates__heading'>Исторические даты</h1>
                <RangeBlock startRef={startDateRef} endRef={endDateRef} start={startDate} end={endDate}/>
                <div className="historic-dates__spinner spinner">
                    <SpinnerCircle
                        refEl={mainCircleRef}
                        angle={angle}
                        timeOfRotation={timeOfRotation}
                        currentIndex={currentEvent}
                        items={historicDates}
                        onSelect={loadThis}
                    />
                </div>
                <EventsNavigation current={currentEvent} total={numberOfEvents} onPrev={loadPrev} onNext={loadNext}/>
                <div ref={sliderRef} className="historic-dates__slider slider">
                    <p className='slider__mobile-title'>{historicDates[currentEvent].title}</p>
                    <SliderBlock items={historicDates[currentEvent].events}/>
                </div>
                <div className='events__control-buttons'>
                    {
                        historicDates.map((item, index) => {
                            return <button
                                className={"events__button " + (currentEvent === index ? 'events__button_active' : '')}
                                key={index}
                                onClick={() => loadThis(index)}
                            ></button>
                        })
                    }
                </div>
            </section>
        </main>
    );
}

export default MainPage;
