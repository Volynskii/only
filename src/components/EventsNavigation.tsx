import getTotal from "../utils/format";

interface Props {
    current: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
}

export const EventsNavigation: React.FC<Props> = ({ current, total, onPrev, onNext }) => (
    <div className='historic-dates__navigation navigation'>
        <p className='navigation__total'>{getTotal(total, current)}</p>
        <div className='navigation__buttons control-buttons'>
            <button className='control-buttons__default control-buttons__prev' onClick={onPrev} disabled={current === 0} />
            <button className='control-buttons__default control-buttons__next' onClick={onNext} disabled={current === total - 1} />
        </div>
    </div>
);
