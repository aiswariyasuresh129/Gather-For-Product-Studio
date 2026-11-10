import { ArrowRight } from 'lucide-react';
import { useEffect, useRef, type ReactNode } from 'react';
import { Link, Route, Routes, useLocation, useParams } from 'react-router';
import {
  ChoiceSummary, ExploreButton, Footer, Masthead, PlateIcon, PlateIllustration,
  RestaurantPhoto, SelectButton, Stat,
} from './components';
import { atomix, isTwinId, twins, type Twin, type TwinId } from './restaurants';

const availabilityNote = 'Availability checked Nov. 10, 2026 · Party of two · ET.';

function Page({ page, children, footer }: {
  page: 'atomix' | 'twins' | TwinId;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const title = page === 'atomix' ? 'Atomix' : page === 'twins' ? 'Restaurant Twins' : twins[page].name;
  useEffect(() => { document.title = `${title} · Gather`; }, [title]);

  return (
    <div className="frame">
      <Masthead page={page} />
      <main id="content" tabIndex={-1}>{children}</main>
      {footer}
    </div>
  );
}

function AtomixPage() {
  return (
    <Page page="atomix" footer={<Footer><ExploreButton /></Footer>}>
      <section className="hero">
        <div>
          <span className="eyebrow">Original restaurant</span>
          <h1>Atomix</h1>
          <p>Modern Korean fine dining</p>
        </div>
        <PlateIllustration />
      </section>
      <RestaurantPhoto photo={atomix.room} kind="hero-photo" />
      <div className="stats">
        <Stat label="Average meal price" value="~$396/person" detail="Average across listed experiences" />
        <Stat label="Dinner for two" value="No openings" detail="Nov. 10–Dec. 9 research window" />
      </div>
      <section className="section">
        <h2>Chef’s Counter menu</h2>
        <p className="lead">November menu highlights · Chef’s Counter from $424/person</p>
        <div className="items">
          {atomix.dishes.map((dish) => (
            <article className="item" key={dish.name}>
              <h3>{dish.name}</h3>
              {dish.description && <p>{dish.description}</p>}
            </article>
          ))}
        </div>
        <h3 className="archive-title">From a previous menu</h3>
        <RestaurantPhoto photo={atomix.archive} kind="dish-photo" />
      </section>
      <p className="footnote">Dinner availability checked Nov. 10, 2026 · Party of two · ET.</p>
    </Page>
  );
}

function OverviewPage() {
  return (
    <Page page="twins">
      <div className="intro">
        <span className="eyebrow">Alternatives to Atomix</span>
        <h1>Restaurant Twins</h1>
        <p>Compare the dinner menus, match estimates, and openings for two.</p>
      </div>
      <div className="cards">
        {Object.entries(twins).map(([id, twin], index) => (
          <Link className="card block" data-tone={twin.tone} to={`/${id}`} key={id}>
            <div className="card-top">
              <span className="card-icon"><PlateIcon /></span>
              <div>
                <span className="label">Twin {index + 1}</span>
                <h2>{twin.name}</h2>
              </div>
              <div className="match"><strong>{twin.match}%</strong><span>overall match</span></div>
            </div>
            <div className="card-info">
              <span><small>Tasting menu</small><strong>${twin.price}/person</strong></span>
              <span><small>Earliest opening observed</small><strong>{twin.opening}</strong></span>
            </div>
            <span className="card-more">View match details <ArrowRight aria-hidden="true" /></span>
          </Link>
        ))}
      </div>
      <ChoiceSummary allowReset />
      <p className="footnote">{availabilityNote}</p>
    </Page>
  );
}

function TwinPage({ id }: { id: TwinId }) {
  const twin: Twin = twins[id];

  return (
    <Page page={id} footer={<Footer note="Records your study choice only."><SelectButton id={id} /></Footer>}>
      <section className="hero" data-tone={twin.tone}>
        <div>
          <span className="eyebrow">Restaurant Twin</span>
          <h1>{twin.name}</h1>
          <p>{twin.area} · Korean</p>
        </div>
        <div className="match"><strong>{twin.match}%</strong><span>overall match to Atomix</span></div>
      </section>
      <RestaurantPhoto photo={twin.room} kind="hero-photo" />
      <div className="stats">
        <Stat label="Tasting menu" value={`$${twin.price}/person`} detail={twin.format} />
        <Stat label="Earliest opening" value={twin.opening} detail="Dinner for two · ET" />
      </div>
      <section className="section">
        <h2>How the dishes compare</h2>
        <p className="lead">{twin.note}</p>
        <div className="items">
          {twin.dishes.map((dish) => (
            <article className="item" key={dish.name}>
              <div className="dish-top">
                <h3>{dish.name}</h3>
                <span className="dish-score">{dish.score}% dish match</span>
              </div>
              <p className="compare">Atomix · {dish.reference}</p>
              <p>{dish.reason}</p>
              {dish.photo && <RestaurantPhoto photo={dish.photo} kind="dish-photo" />}
            </article>
          ))}
        </div>
      </section>
      <p className="footnote">Match percentages are Gather’s estimates. Availability checked Nov. 10, 2026.</p>
      <ChoiceSummary />
    </Page>
  );
}

function TwinRoute() {
  const { id } = useParams();
  return isTwinId(id) ? <TwinPage key={id} id={id} /> : <AtomixPage />;
}

export function App() {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    document.getElementById('content')?.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<AtomixPage />} />
      <Route path="/twins" caseSensitive element={<OverviewPage />} />
      <Route path="/:id" element={<TwinRoute />} />
      <Route path="*" element={<AtomixPage />} />
    </Routes>
  );
}
