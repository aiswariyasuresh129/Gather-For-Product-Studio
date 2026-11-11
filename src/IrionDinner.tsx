import { Link, useParams, useSearchParams } from 'react-router';
import { Footer, Masthead, PlateIcon, PlateIllustration, Stat } from './components';

const factors = ['Dishes', 'Price', 'Location'] as const;
type Factor = typeof factors[number];

type Candidate = {
  name: string;
  area: string;
  source: string;
  korean?: boolean;
  atmosphere?: string;
  dishes?: string;
  crab?: boolean;
  nearby?: boolean;
  prices?: { appetizers: number[]; mains: number[] };
};

const irionMenu = 'https://www.ubereats.com/store/irion/A05MBUUDU8q4OT9TmORlAw';
const candidates: Candidate[] = [
  {
    name: 'Rice Thief', area: 'Long Island City', korean: true, crab: true,
    atmosphere: 'Both are sit-down Korean restaurants with seafood and dishes for sharing.',
    dishes: 'Soy-marinated raw blue crab and spicy raw crab, plus gamjatang and beef short rib soup.',
    prices: { appetizers: [13.75, 18, 19, 25.25], mains: [24, 25.75, 27.75, 28, 28, 28, 29.75, 29.75, 34, 35, 35, 35, 40, 44] },
    source: 'https://order.online/en-US/store/24612043',
  },
  {
    name: 'Haejang', area: 'Flushing', korean: true, crab: true,
    atmosphere: 'Both serve Korean comfort food and shareable seafood in a sit-down setting.',
    dishes: 'Soy-marinated raw crab and slow-cooked beef bone soup.',
    source: 'https://www.haejang.com/menu?menu=korean-delights',
  },
  {
    name: 'Hahm Ji Bach', area: 'Flushing', korean: true, crab: true,
    atmosphere: 'Both offer sit-down Korean meals with dishes to share. Hahm Ji Bach also offers tabletop barbecue.',
    dishes: 'Soy-marinated raw blue crab served as a set.',
    source: 'https://www.hahmjibach.com/product-category/hahm-ji-bach-special/page/2/',
  },
  {
    name: 'Kuku Korean Cuisine LIC', area: 'Long Island City', korean: true,
    atmosphere: 'Both offer full-service Korean dining with comfort food and shareable starters.',
    dishes: 'Fried pork dumplings and Korean stews served with rice.',
    prices: { appetizers: [17.99], mains: [20.99, 20.99, 20.99, 20.99, 32.99] },
    source: 'https://toast.app/r/kuku-chicken/order',
  },
  {
    name: 'Il Falco', area: '21-50 44th Drive, Long Island City', nearby: true,
    source: 'https://www.ilfalcolic.com/contact-us',
  },
  {
    name: 'Soothr LIC', area: '25-20 43rd Avenue, Long Island City', nearby: true,
    atmosphere: 'Both are sit-down restaurants serving shareable starters and comfort food.',
    prices: { appetizers: [14, 15], mains: [23, 23, 24, 26, 27, 30] },
    source: 'https://soothrlic.com/food-menu',
  },
  {
    name: 'Ramen Spot LIC', area: '45-12 23rd Street, Long Island City', nearby: true,
    source: 'https://ramenspotmadeinny.com/menu/',
  },
];

function median(prices: number[]) {
  const sorted = [...prices].sort((a, b) => a - b);
  return (sorted[Math.floor((sorted.length - 1) / 2)] + sorted[Math.floor(sorted.length / 2)]) / 2;
}

function dinnerPrice({ appetizers, mains }: NonNullable<Candidate['prices']>) {
  return Math.round((median(appetizers) / 2 + median(mains)) * 100) / 100;
}

const basePrices = { appetizers: [10, 10], mains: [23, 23, 28, 36] };
const baseline = dinnerPrice(basePrices);
const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const money = (price: number) => currency.format(price);

const highlights = [
  ['Raw marinated crab', 36, 'Marinated raw crab served with rice and banchan.'],
  ['Raw marinated shrimp', 28, 'Marinated raw shrimp served with rice and banchan.'],
  ['Gamjatang', 23, 'Korean pork bone stew served with rice and banchan.'],
  ['Beef bone soup', 23, 'Korean beef bone broth served with rice and banchan.'],
  ['Fried pork dumplings', 10, 'A crisp starter filled with pork.'],
] as const;

const signatureDishes: Record<string, string[]> = {
  'rice-thief': ['Soy-marinated raw blue crab', 'Gamjatang', 'Galbitang'],
  haejang: ['Beef bone hangover soup', 'Gamjatang', 'Soy-marinated raw crab'],
  'hahm-ji-bach': ['Ganjang gejang baekban', 'LA galbi with doenjang jjigae', 'Gamja jeongol'],
  'kuku-korean-cuisine-lic': ['Korean fried chicken', 'Beef bulgogi platter', 'Pork and kimchi soon dubu'],
  'il-falco': ['Wild porcini mushroom ravioli', 'Salt-baked branzino', 'Veal chops'],
  'soothr-lic': ['Karee pu noodles', 'Chicken khao soi', 'Jeeb dumplings'],
  'ramen-spot-lic': ['Ramen', 'Gyoza', 'Steamed buns'],
};

const dishMatches: Record<string, [string, number, string][]> = {
  'rice-thief': [
    ['Soy-marinated raw blue crab', 100, 'Same core dish: raw crab marinated Korean-style.'],
    ['Raw marinated white shrimp', 100, 'Same core dish: marinated raw shrimp.'],
    ['Gamjatang', 100, 'Both serve Korean pork bone stew.'],
    ['Galbitang', 75, 'A close beef-broth counterpart built around short ribs.'],
    ['Fried kimchi mandoo', 75, 'Both are fried Korean dumplings with different fillings.'],
  ],
  haejang: [
    ['Soy-marinated raw crab', 100, 'Same core dish, with a soy marinade.'],
    ['', 0, 'No comparable raw marinated shrimp identified.'],
    ['Gamjatang', 100, 'Both serve Korean pork bone stew.'],
    ['Beef bone hangover soup', 75, 'Both use beef bone broth, with different seasoning and toppings.'],
  ],
  'hahm-ji-bach': [
    ['Ganjang gejang baekban', 100, 'A soy-marinated raw blue crab set.'],
    ['', 0, 'No comparable raw marinated shrimp identified.'],
    ['Gamja jeongol', 75, 'A related pork bone and potato stew served as a shared hot pot.'],
  ],
  'kuku-korean-cuisine-lic': [
    ['', 0, 'No raw marinated crab identified.'],
    ['', 0, 'No raw marinated shrimp identified.'],
    ['Pork and kimchi soon dubu', 50, 'Both are Korean pork stews. Kuku uses silken tofu and kimchi.'],
    ['', 0, 'No comparable beef bone soup identified.'],
    ['Crispy pork potstickers', 100, 'Both are fried dumplings with pork filling.'],
  ],
};

function comparisons(candidate: Candidate) {
  return highlights.map((_, index) => dishMatches[slug(candidate.name)]?.[index] ??
    ['', 0, 'No comparable dish identified in the reviewed menu.'] as const);
}

function dishScore(candidate: Candidate) {
  const scores = comparisons(candidate).map((dish) => dish[1]);
  return Math.round((scores.reduce((sum, score) => sum + score, 0) + scores[0]) / 6);
}

function scoreFactors(candidate: Candidate, selected: readonly Factor[]) {
  return selected.map((name) => {
    if (name === 'Dishes') return { name, score: dishScore(candidate) };
    if (name === 'Price' && candidate.prices) {
      const gap = Math.abs(dinnerPrice(candidate.prices) - baseline);
      return { name, score: Math.max(0, Math.round(100 - gap * 5)) };
    }
    return { name, score: name === 'Location' && candidate.nearby ? 100 : 0 };
  });
}

function matchPercent(candidate: Candidate, selected: readonly Factor[]) {
  return Math.round(scoreFactors(candidate, selected).reduce((sum, factor) => sum + factor.score, 0) / selected.length);
}
export function IrionDinner() {
  const [params, setParams] = useSearchParams();
  const active = factors.filter((factor) => params.getAll('match').includes(factor));
  const selected: readonly Factor[] = active.length ? active : ['Dishes'];
  const dishes = selected.includes('Dishes');
  const price = selected.includes('Price');
  const location = selected.includes('Location');
  const matches = candidates.map((candidate) => ({
    ...candidate,
    estimate: candidate.prices ? dinnerPrice(candidate.prices) : undefined,
  })).filter((candidate) =>
    (!dishes || Boolean(candidate.dishes && candidate.atmosphere)) &&
    (!price || Boolean(candidate.atmosphere && candidate.estimate !== undefined &&
      Math.abs(Math.round((candidate.estimate - baseline) * 100)) <= 1000)) &&
    (!location || candidate.nearby)
  ).sort((a, b) =>
    (dishes ? Number(Boolean(b.crab)) - Number(Boolean(a.crab)) || dishScore(b) - dishScore(a) : 0) ||
    (price ? Number(Boolean(b.korean)) - Number(Boolean(a.korean)) ||
      Number(Boolean(b.nearby)) - Number(Boolean(a.nearby)) : 0)
  ).slice(0, 3);

  return (
    <div className="frame">
      <Masthead step="Dinner twins" back="/" backLabel="IRION" />
      <main id="content" tabIndex={-1}>
        <div className="intro"><span className="eyebrow">Alternatives to IRION</span><h1>Explore Restaurant Twins</h1><p>Compare dinner by dishes, price and walking distance.</p></div>
        <fieldset className="irion-filters">
          <legend>Match on</legend>
          {factors.map((factor) => (
            <button key={factor} type="button" aria-pressed={selected.includes(factor)}
              onClick={() => {
                const next = selected.includes(factor)
                  ? selected.filter((item) => item !== factor)
                  : [...selected, factor];
                if (next.length) setParams({ match: next }, { replace: true });
              }}>
              {factor}
            </button>
          ))}
        </fieldset>
        {price && <aside className="irion-note">
          <strong>IRION dinner estimate · {money(baseline)} per person</strong>
          <p>One median-priced appetizer and two median-priced mains, divided by two, before drinks, tax, and tip.
            Using the published prices we could confirm, IRION’s estimate is ({money(median(basePrices.appetizers))} + 2 × {money(median(basePrices.mains))}) ÷ 2.
            Matches must be within {money(baseline - 10)}–{money(baseline + 10)} and have a similar atmosphere.</p>
          <a href={irionMenu}>IRION ordering menu</a>
        </aside>}
        <p role="status">{matches.length} of 3 twins for {selected.join(' + ')}</p>
        {matches.length < 3 && <p>Fewer than three restaurants meet these filters with the available dinner information. Turn off a filter to see more options.</p>}
        <div className="cards">
          {matches.map((match, index) => {
            const target = { pathname: '/irion/twins/' + slug(match.name), search: params.toString() };
            const total = matchPercent(match, selected);
            return <article className="card" data-tone={['rose', 'sage', 'honey'][index]} key={match.name}>
              <Link className="card-top" to={target}>
                <span className="card-icon"><PlateIcon /></span>
                <div><span className="label">Twin {index + 1}</span><h2>{match.name}</h2></div>
                <div className="match"><strong>{total}%</strong><span>dinner match</span></div>
              </Link>
              <ProfilePhoto id={slug(match.name)} kind={photos[slug(match.name)]?.room ? 'room' : 'food'} />
              <div className="card-info">
                <span><small>Estimated per person</small><strong>{match.prices ? money(dinnerPrice(match.prices)) : 'Unavailable'}</strong></span>
                <span><small>Location</small><strong>{match.area}</strong></span>
              </div>
              <details className="card-breakdown"><summary>Why this {total}% match?</summary><IrionMatchVisual candidate={match} selected={selected} /></details>
              <Link className="card-more" to={target}>View match details →</Link>
            </article>;
          })}
        </div>
      </main>
    </div>
  );
}

function slug(name: string) {
  return name.toLowerCase().replaceAll(' ', '-');
}

const photos: Record<string, { room?: string; food?: string; caption: string; source: string }> = {
  irion: {
    food: 'https://res.cloudinary.com/the-infatuation/image/upload/c_fill,w_900,ar_4:3,g_center,f_webp/images/PR_IMG_4090_gskjq4',
    caption: 'Dinner at IRION', source: 'https://www.theinfatuation.com/new-york/reviews/irion',
  },
  'rice-thief': {
    room: 'https://coverage-a1933870fdc99036cfa0818041d3e0b8.web.ordersave.com/pluto-images/49c06134-bca3-4c79-acd7-a777ce78b411?fit=cover&w=900',
    food: 'https://coverage-a1933870fdc99036cfa0818041d3e0b8.web.ordersave.com/pluto-images/0f229408-933d-42d5-af31-fe9cfe08394b?fit=cover&w=900',
    caption: 'Raw marinated crab platter', source: 'https://coverage-a1933870fdc99036cfa0818041d3e0b8.web.ordersave.com/',
  },
  haejang: {
    food: 'https://static.wixstatic.com/media/14b2bd_688869b1a3624bad957f1f5d2cc11588~mv2.png/v1/fit/w_900,h_900/14b2bd_688869b1a3624bad957f1f5d2cc11588~mv2.png',
    caption: 'Gamjatang at Haejang', source: 'https://www.haejang.com/menu?menu=korean-delights',
  },
  'hahm-ji-bach': {
    food: 'https://www.hahmjibach.com/wp-content/uploads/2022/12/hahmjibach_S11_%EA%B0%84%EC%9E%A5%EA%B2%8C%EC%9E%A5%EB%B0%B1%EB%B0%98_ganjang_gejang_baekban.jpg',
    caption: 'Soy-marinated raw crab set', source: 'https://www.hahmjibach.com/menu/',
  },
  'kuku-korean-cuisine-lic': {
    food: 'https://tb-static.uber.com/prod/image-proc/processed_images/0aa0f3226d8af1e80991914ccf9b1739/5143f1e218c67c20fe5a4cd33d90b07b.jpeg',
    caption: 'Korean fried chicken at Kuku LIC', source: 'https://postmates.com/store/kuku-korean-cuisine-lic/gfPJXHNVRVWYIEJii0miUw',
  },
  'ramen-spot-lic': {
    room: 'https://pub-ba1a74be17d7442a9f2541946eb9510e.r2.dev/shops/1dfae7c6-432c-48bb-aff7-d1a19038a30f/4.jpg',
    caption: 'Ramen Spot LIC', source: 'https://joe.coffee/locations/ny/long-island-city/ramen-spot-made-in-ny-lic-long-island-city/',
  },
  'il-falco': {
    room: 'https://static.wixstatic.com/media/ff82e9_dd740567bfe440aaaaa69d4f91781a7d~mv2.jpg/v1/fit/w_900,h_900/IMG_6292.jpg',
    caption: 'Dinner at Il Falco', source: 'https://www.ilfalcolic.com/',
  },
  'soothr-lic': {
    food: 'https://static.spotapps.co/spots/f8/22b4c68fd247338c8bb4925e6ac346/w926',
    caption: 'Jeeb dumplings at Soothr LIC', source: 'https://soothrlic.com/food-menu',
  },
};

function ProfilePhoto({ id, kind }: { id: string; kind: 'room' | 'food' }) {
  const photo = photos[id];
  const url = photo?.[kind];
  if (!url) return null;
  return <figure className={`photo irion-photo ${kind === 'room' ? 'hero-photo' : 'dish-photo'}`}>
    <img src={url} alt={kind === 'room' ? 'Dining room' : photo.caption} onError={(event) => { event.currentTarget.hidden = true; }} />
    <figcaption><a href={photo.source}>{kind === 'room' ? 'Dining room photo' : photo.caption} · source</a></figcaption>
  </figure>;
}

function IrionMatchVisual({ candidate, selected }: { candidate: Candidate; selected: readonly Factor[] }) {
  const parts = scoreFactors(candidate, selected);
  return <figure className="match-visual">
    <figcaption className="match-equation"><span>Selected factors</span><strong>{matchPercent(candidate, selected)}% match</strong></figcaption>
    <div className="match-stack" aria-hidden="true">
      {parts.map(({ name, score }) => <span key={name} className={`match-segment factor-${name === 'Location' ? 'atmosphere' : name.toLowerCase()}`} style={{ width: `${score / parts.length}%` }} />)}
    </div>
    <div className="match-factors">{parts.map(({ name, score }) =>
      <div className="factor-label" key={name}><span>{name}</span><strong>{score}%</strong></div>)}</div>
    <p className="footnote">The overall score averages the selected factors. Crab counts twice in the dish score. Price starts at 100% and loses five points per dollar of difference. Location earns 100% when the restaurant meets the walking criterion.</p>
  </figure>;
}

export function IrionProfile() {
  return <div className="frame">
    <Masthead step="Restaurant" />
    <main id="content" tabIndex={-1}>
      <section className="hero"><div><span className="eyebrow">Original restaurant</span><h1>IRION</h1><p>Long Island City · 21-59 44th Drive</p></div><PlateIllustration /></section>
      <p className="profile-description">Contemporary Korean sit-down dining with marinated seafood, comforting soups and plates to share.</p>
      <ProfilePhoto id="irion" kind="room" />
      {!photos.irion.room && <ProfilePhoto id="irion" kind="food" />}
      <div className="stats">
        <Stat label="Estimated per person" value={money(baseline)} detail="Published ordering prices · dinner 5–10 p.m." />
        <Stat label="Reservations" value={<a href="https://resy.com/cities/new-york-ny/venues/irion">Check Resy</a>} detail="See the venue for availability" />
      </div>
      <section className="section">
        <h2>Dinner highlights</h2>
        <div className="items">{highlights.map(([name, price, description], index) =>
          <article className="item" key={name}><div className="dish-top"><h3>{name}</h3><span className="dish-score">{money(price)}</span></div>
            {index === 0 && <span className="label">Featured for this comparison</span>}
            <p>{description}</p>
          </article>)}</div>
        <p className="footnote"><a href={irionMenu}>View IRION’s ordering menu</a></p>
      </section>
    </main>
    <Footer><Link className="primary" to="/irion/twins">Explore Restaurant Twins →</Link></Footer>
  </div>;
}

export function IrionTwinProfile() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const match = candidates.find((candidate) => slug(candidate.name) === id);
  const back = '/irion/twins' + (params.size ? '?' + params.toString() : '');
  if (!match) return <div className="frame"><Masthead step="Dinner twins" back={back} backLabel="All twins" /><main id="content"><p>Restaurant profile unavailable.</p></main></div>;
  const active = factors.filter((factor) => params.getAll('match').includes(factor));
  const selected: readonly Factor[] = active.length ? active : ['Dishes'];
  const dishes = !selected.length || selected.includes('Dishes');
  const price = selected.includes('Price');
  const location = selected.includes('Location');
  return <div className="frame">
    <Masthead step="Twin profile" back={back} backLabel="All twins" />
    <main id="content" tabIndex={-1}>
      <section className="hero twin-hero" data-tone="sage">
        <div><span className="eyebrow">Dinner Twin</span><h1>{match.name}</h1><p>{match.area}</p></div>
        <div className="match"><strong>{matchPercent(match, selected)}%</strong><span>match to IRION</span></div>
      </section>
      <ProfilePhoto id={slug(match.name)} kind="room" />
      <section className="section">
        <h2>How the match adds up</h2>
        <IrionMatchVisual candidate={match} selected={selected} />
              {dishes && <p><strong>Dishes.</strong> {match.dishes}</p>}
              {(dishes || price) && <p><strong>Atmosphere.</strong> {match.atmosphere}</p>}
              {price && match.prices && <p><strong>Price.</strong> About {money(dinnerPrice(match.prices))} per person versus {money(baseline)} at IRION.
                Based on published menu prices: ({money(median(match.prices.appetizers))} + 2 × {money(median(match.prices.mains))}) ÷ 2.</p>}
              {location && <p><strong>Location.</strong> Near IRION in Court Square, within the 20-minute walking area based on the published addresses.
                {' '}<a href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent('IRION, 21-59 44th Drive, Queens, NY')}&destination=${encodeURIComponent(match.name + ', ' + match.area)}&travelmode=walking`}>Walking directions</a></p>}
      </section>
            {dishes && <section className="section">
        <h2>How the dishes compare</h2>
        <div className="items">{comparisons(match).map(([name, score, reason], index) =>
          <article className="item" key={highlights[index][0]}>
            <div className="dish-top"><h3>{name || 'No comparable dish found'}</h3><span className="dish-score">{score}% dish match</span></div>
            <p className="compare">IRION · {highlights[index][0]}</p><p>{reason}</p>
          </article>)}</div>
        <details className="score-guide"><summary>What do the dish percentages mean?</summary><p>100% is the same core dish, 75% is a close preparation, 50% is a partial match, and 0% means no comparable dish was identified.</p></details>
      </section>}
      <section className="section">
        <h2>{dishes ? 'Dinner and atmosphere' : 'Signature dishes'}</h2>
        {dishes ? <>
          {match.atmosphere && <p>{match.atmosphere}</p>}
          {match.dishes && <p>{match.dishes}</p>}
        </> : <div className="items">
          {signatureDishes[slug(match.name)]?.map((name) => (
            <article className="item" key={name}><div className="dish-top"><h3>{name}</h3></div></article>
          ))}
        </div>}
        <ProfilePhoto id={slug(match.name)} kind="food" />
        <a href={match.source}>Restaurant details and menu</a>
      </section>
    </main>
  </div>;
}
