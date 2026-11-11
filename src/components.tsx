import { ArrowLeft, Asterisk, Check } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router';
import { availabilityDate, restaurant, twins, type Booking, type MealId, type Photo, type TwinId } from './restaurants';
import { useStudyChoice } from './study-choice';

export function PlateIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="6" />
      <path d="M10 13c3 0 4-2 4-4m-4 7c1-2 3-4 5-4" />
    </svg>
  );
}

export function PlateIllustration() {
  return (
    <svg className="art" viewBox="0 0 112 112" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="55" cy="57" r="38" />
      <circle cx="55" cy="57" r="29" />
      <path d="M40 68c10 0 20-5 25-16M54 60c-5-1-9-6-10-11 6 0 12 4 13 9M58 57c1-7 6-13 13-14-1 8-6 13-12 15M88 15l17 16m-13-22 17 17M18 81l-8 15m15-11-8 15M13 31v11m-5-5h10m78 42v10m-5-5h10" />
    </svg>
  );
}

export function Masthead({ step, back }: { step: string; back?: string }) {
  return (
    <header className="mast">
      {back ? (
        <Link className="back" to={back}>
          <ArrowLeft aria-hidden="true" />
          {back.startsWith('/twins') ? 'All twins' : restaurant.name}
        </Link>
      ) : <span />}
      <div className="brand"><Asterisk aria-hidden="true" />Gather</div>
      <span className="step">{step}</span>
    </header>
  );
}

export function Stat({ label, value, detail }: { label: string; value: ReactNode; detail: string }) {
  return (
    <div className="stat">
      <span className="label">{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </div>
  );
}

export function BookingStat({ booking }: { booking: Booking }) {
  return (
    <Stat
      label={booking.opening ? 'Table for two observed' : 'Reservations'}
      value={<a href={booking.url} target="_blank" rel="noopener noreferrer">
        {booking.opening ?? (booking.platform === 'Softbite' ? 'Contact Softbite' : `Check ${booking.platform}`)}
      </a>}
      detail={booking.opening ? `Checked ${availabilityDate} · ${booking.platform}` : 'See the venue for availability'}
    />
  );
}

export function RestaurantPhoto({ photo, kind }: { photo: Photo; kind: 'hero-photo' | 'dish-photo' }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`photo ${kind}`}>
      <img src={photo.url} alt={photo.caption} loading={kind === 'dish-photo' ? 'lazy' : 'eager'} decoding="async" referrerPolicy="no-referrer" hidden={failed} onError={() => setFailed(true)} />
      <figcaption>
        {photo.caption} · <a href={photo.source} target="_blank" rel="noopener noreferrer">{photo.credit}</a>
        {failed && <a className="photo-fallback" href={photo.originalUrl ?? photo.url} target="_blank" rel="noopener noreferrer">Open photo</a>}
      </figcaption>
    </figure>
  );
}

export function ChoiceSummary({ meal, allowReset = false }: { meal: MealId; allowReset?: boolean }) {
  const { choices, clear } = useStudyChoice();
  const choice = choices[meal];

  function clearChoice() {
    clear(meal);
    document.getElementById('content')?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }

  return (
    <div className="result" id="study-choice" role="status" hidden={!choice}>
      {choice && (
        <span>
          <strong>Selected {twins[choice.id].name}</strong>
          <span>Study choice recorded.</span>
        </span>
      )}
      {allowReset && <button type="button" onClick={clearChoice}>Clear choice</button>}
    </div>
  );
}

export function Footer({ children, note }: { children: ReactNode; note?: string }) {
  return <footer className="next">{children}{note && <p>{note}</p>}</footer>;
}

export function SelectButton({ id }: { id: TwinId }) {
  const { choices, select } = useStudyChoice();
  const choice = choices[twins[id].meal];
  const shouldScroll = useRef(false);

  useEffect(() => {
    if (!shouldScroll.current) return;
    shouldScroll.current = false;
    document.getElementById('study-choice')?.scrollIntoView({ block: 'nearest' });
  }, [choice]);

  return (
    <button className="primary" type="button" onClick={() => {
      shouldScroll.current = true;
      select(id);
    }}>
      {choice?.id === id ? 'Selected' : 'Select'} {twins[id].name} <Check aria-hidden="true" />
    </button>
  );
}
