"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  Menu,
  X,
} from "lucide-react";
import Image from "next/image";
import {
  bridalParty,
  ceremony,
  gallery,
  photography,
  programme,
  wedding,
  zoom,
} from "@/lib/wedding-data";

const navItems = [
  "Invitation",
  "Details",
  "Ceremony",
  "Bridal party",
  "Photographs",
  "Zoom",
  "RSVP",
];

function Countdown() {
  const target = new Date("2026-11-05T13:00:00+01:00").getTime();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  const values = useMemo(() => {
    const diff = Math.max(0, target - now);
    return [
      Math.floor(diff / 86400000),
      Math.floor(diff / 3600000) % 24,
      Math.floor(diff / 60000) % 60,
      Math.floor(diff / 1000) % 60,
    ];
  }, [now]);
  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      <div>
        <strong>{String(values[0]).padStart(2, "0")}</strong>
        <span>Days</span>
      </div>
      <div>
        <strong>{String(values[1]).padStart(2, "0")}</strong>
        <span>Hours</span>
      </div>
      <div>
        <strong>{String(values[2]).padStart(2, "0")}</strong>
        <span>Minutes</span>
      </div>
      <div>
        <strong>{String(values[3]).padStart(2, "0")}</strong>
        <span>Seconds</span>
      </div>
    </div>
  );
}

function Entry({ onEnter }: { onEnter: () => void }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % wedding.heroImages.length),
      6000,
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="hero" id="top">
      <div className="hero-image">
        <Image
          src="/images/image-one.jpg"
          alt="A moment from Seun and Benjamin's wedding"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">Countdown to a beautiful beginning</p>
        <p className="eyebrow">Circle the date in your calendar</p>
        <p className="eyebrow">#benspleasantness</p>
        <h1>
          Seun <i>&</i>
          <br />
          Benjamin
        </h1>
        <p className="hero-date">November 5th · Lagos, Nigeria</p>
        <Countdown />
        <button className="text-button" onClick={onEnter}>
          Enter invitation <ArrowRight size={15} />
        </button>
      </div>
      {/* <div className="hero-footer">
        <span>Scroll to explore</span>
        <ArrowDown size={16} />
        <div className="slider-controls">
          <button
            aria-label="Previous photo"
            onClick={() =>
              setIndex(
                (i) =>
                  (i + wedding.heroImages.length - 1) %
                  wedding.heroImages.length,
              )
            }
          >
            ←
          </button>
          <span>
            0{index + 1} <b>/ 0{wedding.heroImages.length}</b>
          </span>
          <button
            aria-label="Next photo"
            onClick={() => setIndex((i) => (i + 1) % wedding.heroImages.length)}
          >
            →
          </button>
        </div>
      </div> */}
    </section>
  );
}

// function Entry({ onEnter }: { onEnter: () => void }) {
//   return (
//     <main className="entry-screen">
//       <div className="entry-copy">
//         <p className="eyebrow">A wedding invitation</p>
//         <h1>
//           Seun <i>&</i> Benjamin
//         </h1>
//         <p className="entry-date">05.11.26 · Lagos, Nigeria</p>
//         <button className="text-button" onClick={onEnter}>
//           Enter invitation <ArrowRight size={15} />
//         </button>
//       </div>
//       <div className="entry-image">
//         <Image
//           src='/images/image-one.jpg'
//           alt="A romantic wedding portrait"
//           fill
//           priority
//           sizes="50vw"
//         />
//       </div>
//     </main>
//   );
// }

function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="site-header">
      <a href="#top" className="brand">
        N<span>&</span>B
      </a>
      <nav>
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`}>
            {item}
          </a>
        ))}
      </nav>
      <button aria-label="Open menu" className="menu-button" onClick={onMenu}>
        <Menu size={22} />
      </button>
    </header>
  );
}

function Hero() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % wedding.heroImages.length),
      6000,
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <section className="hero" id="top">
      <div className="hero-image">
        <Image
          src={wedding.heroImages[index]}
          alt="A moment from Seun and Benjamin's wedding"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">Together with their families</p>
        <h1>
          Seun <i>&</i>
          <br />
          Benjamin
        </h1>
        <p className="hero-date">November 5th · Lagos, Nigeria</p>
        <Countdown />
      </div>
      <div className="hero-footer">
        <span>Scroll to explore</span>
        <ArrowDown size={16} />
        <div className="slider-controls">
          <button
            aria-label="Previous photo"
            onClick={() =>
              setIndex(
                (i) =>
                  (i + wedding.heroImages.length - 1) %
                  wedding.heroImages.length,
              )
            }
          >
            ←
          </button>
          <span>
            0{index + 1} <b>/ 0{wedding.heroImages.length}</b>
          </span>
          <button
            aria-label="Next photo"
            onClick={() => setIndex((i) => (i + 1) % wedding.heroImages.length)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

function Invitation() {
  return (
    <section className="section invitation" id="invitation">
      <div className="section-intro">
        <p className="eyebrow">An invitation</p>
        <h2>
          Together with
          <br />
          <i>our families.</i>
        </h2>
      </div>
      <div className="invitation-copy">
        <p className="lead">
          We joyfully invite you to share in the celebration of our love as we
          begin forever together.
        </p>
        <p>
          What started as a simple moment has blossomed into a story of
          friendship, faith, and love. We are so honored to have you be part of
          it.
        </p>
        <div className="ornament">
          — <Heart size={16} /> —
        </div>
        <p className="script-note">
          Your presence means the world to us — and that, above all, is what we
          cherish most.
        </p>
      </div>
    </section>
  );
}

function Details() {
  return (
    <section className="details-section" id="details">
      <div className="section-heading">
        <p className="eyebrow">The wedding details</p>
        <h2>
          A day set aside
          <br />
          <i>for love & faith.</i>
        </h2>
        <p>
          We are delighted to welcome you to our wedding ceremony holding in
          Lagos, Nigeria.
        </p>
      </div>
      <div className="details-list">
        <div>
          <span>Date</span>
          <strong>{wedding.date}</strong>
        </div>
        <div>
          <span>Time</span>
          <strong>{wedding.time}</strong>
        </div>
        <div>
          <span>Venue</span>
          <strong>{wedding.venue}</strong>
        </div>
        <div>
          <span>Address</span>
          <strong>{wedding.address}</strong>
        </div>
      </div>
      <a
        className="outline-button"
        href="https://maps.google.com/?q=4/6+Akinyemi+Avenue+Lagos"
        target="_blank"
        rel="noreferrer"
      >
        Get directions <ArrowRight size={15} />
      </a>
    </section>
  );
}

function Ceremony() {
  return (
    <section className="ceremony-section" id="ceremony">
      <div className="section-heading">
        <p className="eyebrow">Order of ceremony</p>
        <h2>
          A sacred union
          <br />
          <i>before Jehovah.</i>
        </h2>
        <p>A thoughtful order for the moments that matter most.</p>
      </div>
      <div className="ceremony-list">
        {ceremony.map(([number, title, detail]) => (
          <div className="ceremony-row" key={number}>
            <span>{number}</span>
            <div>
              <h3>{title}</h3>
              <p>{detail}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BridalParty() {
  return (
    <section className="party-section" id="bridal-party">
      <div className="section-heading">
        <p className="eyebrow">The bridal party</p>
        <h2>
          Standing with us
          <br />
          <i>in love.</i>
        </h2>
        <p>
          We are grateful for the beautiful souls standing with us on this
          special day.
        </p>
      </div>
      <div className="party-grid">
        {bridalParty.map((person) => (
          <div className="party-card" key={person.role}>
            <div className="initials">
              {person.name === "Still to be announced"
                ? "—"
                : person.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
            </div>
            <h3>{person.name}</h3>
            <p>{person.role}</p>
          </div>
        ))}
      </div>
      {/* <p className="party-note">
        No bridesmaids or groomsmen — just the people we love most.
      </p> */}
    </section>
  );
}

function Programme() {
  return (
    <section className="programme-section">
      <div className="section-heading">
        <p className="eyebrow">The day</p>
        <h2>
          A little <i>timeline.</i>
        </h2>
      </div>
      <div className="timeline">
        {programme.map(([time, title, place]) => (
          <div className="timeline-row" key={time}>
            <span className="time">{time}</span>
            <div>
              <h3>{title}</h3>
              <p>{place}</p>
            </div>
            <Clock3 size={17} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ZoomMeeting() {
  const copy = async (value: string) => {
    await navigator.clipboard?.writeText(value);
  };

  return (
    <section
      className="bg-[#f8f5f0] px-8 py-24 text-center text-[#321d25] md:px-[10vw] md:py-32"
      id="zoom"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-6 text-[.68rem] uppercase tracking-[.28em] text-[#756d6a]">
          Unable to be there in person?
        </p>
        <h2 className="mb-5 text-5xl leading-[.9] md:text-7xl">
          Join us <i>online.</i>
        </h2>
        <p className="mb-12 text-base leading-8 text-[#756d6a] md:text-lg">
          We would love to have you celebrate with us virtually. Join us on Zoom
          as we say “I do” from wherever you are.
        </p>
        <div className="mx-auto max-w-2xl rounded-[1.25rem] border border-[#ddd2ca] bg-white/70 px-6 py-10 shadow-[0_20px_60px_rgba(50,29,37,.06)] md:px-12">
          <p className="mb-3 text-sm uppercase tracking-[.22em] text-[#756d6a]">
            Wedding Zoom Meeting
          </p>
          <p className="mb-10 text-lg text-[#9e6474]">{zoom.date}</p>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-[#eee4db] px-5 py-7">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-[#756d6a]">
                Meeting ID
              </p>
              <p className="mb-5 font-mono text-xl tracking-[.16em]">
                {zoom.meetingId}
              </p>
              <button
                className="rounded-full bg-[#d39aaa] px-6 py-2 text-xs uppercase tracking-[.18em] text-white transition hover:bg-[#b9788a]"
                onClick={() => copy(zoom.meetingId)}
              >
                Copy
              </button>
            </div>
            <div className="rounded-xl border border-[#eee4db] px-5 py-7">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-[#756d6a]">
                Passcode
              </p>
              <p className="mb-5 font-mono text-xl tracking-[.16em]">
                {zoom.passcode}
              </p>
              <button
                className="rounded-full bg-[#d39aaa] text-white px-6 py-2 text-xs uppercase tracking-[.18em] transition hover:bg-[#b9788a]"
                onClick={() => copy(zoom.passcode)}
              >
                Copy
              </button>
            </div>
          </div>
          <a
            className="mt-10 inline-flex items-center gap-2 rounded-full bg- px-7 py-3 text-xs uppercase tracking-[.16em] text-white transition hover:bg-[#601d31] hover:text-white!"
            href={zoom.link}
            target="_blank"
            rel="noreferrer"
          >
            Join Zoom <ArrowRight size={15} />
          </a>
        </div>
        <p className="mt-10 font-serif text-lg italic leading-8 text-[#756d6a]">
          Please join a few minutes early. The ceremony will begin promptly at
          1:00 PM.
        </p>
      </div>
    </section>
  );
}

function Photography() {
  return (
    <section className="photography-section" id="photographs">
      <div className="section-heading">
        <p className="eyebrow">Order of photography</p>
        <h2>
          Frames to
          <br />
          <i>remember.</i>
        </h2>
        <p>After the ceremony, we will gather for these joyful portraits.</p>
      </div>
      <div className="photo-grid">
        {photography.map((item, index) => (
          <div className="photo-card" key={item}>
            <span>0{index + 1}</span>
            <h3>{item}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function UnableToJoin() {
  return (
    <section className="online-section">
      <div className="online-image">
        <Image
          src={wedding.heroImages[2]}
          alt="Lagos city skyline"
          fill
          sizes="50vw"
        />
      </div>
      <div className="online-copy">
        <p className="eyebrow">Join us online</p>
        <h2>
          Unable to be
          <br />
          <i>there in person?</i>
        </h2>
        <p>
          We would love to have you celebrate with us virtually. Join us online
          as we say “I do” and share in this special moment from wherever you
          are.
        </p>
        <a className="dark-button" href="#rsvp">
          View joining details <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}

function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section className="gallery-section" id="gallery">
      <div className="section-heading">
        <p className="eyebrow">A few frames</p>
        <h2>
          In good <i>company.</i>
        </h2>
      </div>
      <div className="gallery-grid">
        {gallery.map((image, i) => (
          <button
            className="gallery-item"
            key={image.src}
            onClick={() => setSelected(i)}
          >
            <Image
              src={image.src}
              alt={image.label}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </button>
        ))}
      </div>
      {selected !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <button className="close-button" aria-label="Close gallery">
            <X />
          </button>
          <Image
            src={gallery[selected].src}
            alt={gallery[selected].label}
            width={1400}
            height={1000}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

function RSVP() {
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  return (
    <section className="rsvp-section" id="rsvp">
      {sent ? (
        <div className="success">
          <Check size={28} />
          <p className="eyebrow">Thank you, {name || "friend"}</p>
          <h2>
            We will hold
            <br />
            <i>you in our hearts.</i>
          </h2>
          <p>
            Your response has been noted. We cannot wait to celebrate together.
          </p>
        </div>
      ) : (
        <div className="rsvp-inner">
          <div>
            <p className="eyebrow">Unable to join?</p>
            <h2>
              Let us
              <br />
              <i>know.</i>
            </h2>
            <p className="muted">
              Whether you will be with us in person or in spirit, your response
              means so much.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (name.trim()) setSent(true);
            }}
          >
            <label>
              Your name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </label>
            <label>
              Your response
              <select defaultValue="yes">
                <option value="yes">Joyfully accepts</option>
                <option value="no">Regretfully declines</option>
              </select>
            </label>
            <label>
              Anything we should know?
              <textarea rows={3} placeholder="A note for the couple..." />
            </label>
            <button className="dark-button" type="submit">
              Send response <ArrowRight size={16} />
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

function MobileMenu({ close }: { close: () => void }) {
  return (
    <div className="mobile-menu">
      <button aria-label="Close menu" onClick={close}>
        <X />
      </button>
      {navItems.map((item) => (
        <a
          key={item}
          onClick={close}
          href={`#${item.toLowerCase().replace(" ", "-")}`}
        >
          {item}
        </a>
      ))}
    </div>
  );
}

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [menu, setMenu] = useState(false);
  if (!entered) return <Entry onEnter={() => setEntered(true)} />;
  return (
    <>
      <Header onMenu={() => setMenu(true)} />
      {menu && <MobileMenu close={() => setMenu(false)} />}
      <main>
        <Hero />
        <Invitation />
        <Details />
        <Ceremony />
        <BridalParty />
        <Programme />
        <Photography />
        <ZoomMeeting />
        <UnableToJoin />
        <Gallery />
        <RSVP />
        <footer>
          <Heart size={17} fill="currentColor" />
          <p>With love, Seun & Benjamin</p>
          <a href="#top">
            Back to top <ChevronDown size={15} />
          </a>
        </footer>
      </main>
    </>
  );
}
