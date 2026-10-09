"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Heart,
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
    <div
      className="mt-10 flex justify-center gap-1.5 md:gap-2"
      aria-label="Countdown to the wedding"
    >
      {[
        [values[0], "Days"],
        [values[1], "Hours"],
        [values[2], "Minutes"],
        [values[3], "Seconds"],
      ].map(([value, label]) => (
        <div
          key={String(label)}
          className="grid min-w-[4.4rem] rounded-[0.55rem] border border-cream/28 bg-ink/25 px-1.5 py-2.5 backdrop-blur-[5px] md:min-w-[5.8rem] md:px-2.5 md:py-3.5"
        >
          <strong className="font-serif text-[1.55rem] font-normal md:text-[2rem]">
            {String(value).padStart(2, "0")}
          </strong>
          <span className="text-[0.47rem] uppercase tracking-[0.1em] text-[#decfc9] md:text-[0.58rem] md:tracking-[0.18em]">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function CurvedHashtag() {
  return (
    <svg
      viewBox="0 0 520 96"
      className="mx-auto mb-1 h-auto w-[min(92vw,30rem)] overflow-visible"
      role="img"
      aria-label="#benspleasantness"
    >
      <defs>
        <path
          id="hashtag-curve"
          d="M 24 78 C 150 6, 370 6, 496 78"
          fill="none"
        />
      </defs>
      <text
        fill="#eee0d9"
        fontSize="15"
        letterSpacing="5"
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          textTransform: "uppercase",
        }}
      >
        <textPath href="#hashtag-curve" startOffset="50%" textAnchor="middle">
          #benspleasantness
        </textPath>
      </text>
    </svg>
  );
}

function Entry({ onEnter }: { onEnter: () => void }) {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#282026] text-cream">
      <div className="absolute inset-0">
        <Image
          src="/images/image-one.jpg"
          alt="A moment from Seun and Benjamin's wedding"
          fill
          priority
          sizes="100vw"
          className="object-contain object-center saturate-[0.72]"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-[#230c13]/28 via-[#230c13]/18 to-[#230c13]/78" />
      <div className="relative z-1 px-6 py-16 text-center md:px-10">
        <p className="mb-3 text-[0.68rem] uppercase tracking-[0.28em] text-[#eee0d9]">
          Countdown to a beautiful beginning
        </p>
        <p className="mb-2 text-[0.68rem] uppercase tracking-[0.28em] text-[#eee0d9]">
          Circle the date in your calendar
        </p>
        <CurvedHashtag />
        <h1 className="mb-6 font-serif text-[5rem] leading-[0.76] font-normal tracking-[-0.04em] md:text-[clamp(5rem,13vw,13rem)]">
          Seun <i className="text-accent not-italic">&</i>
          <br />
          Benjamin
        </h1>
        <p className="text-[0.72rem] uppercase tracking-[0.24em]">
          November 5th · Lagos, Nigeria
        </p>
        <Countdown />
        <button
          className="mt-12 inline-flex items-center gap-2.5 border-0 border-b border-current bg-transparent py-3 text-[0.74rem] uppercase tracking-[0.12em] text-cream"
          onClick={onEnter}
        >
          Enter invitation <ArrowRight size={15} />
        </button>
      </div>
    </section>
  );
}

function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="fixed z-10 flex w-full items-center justify-between px-[6vw] py-5 text-cream mix-blend-difference md:px-[4vw] md:py-6">
      <a href="#top" className="font-serif text-[1.8rem] tracking-[-0.1em]">
        S<span className="mx-[0.08em] text-accent">&</span>B
      </a>
      <nav className="hidden gap-6 md:flex">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="text-[0.62rem] uppercase tracking-[0.13em] no-underline"
          >
            {item}
          </a>
        ))}
      </nav>
      <button
        aria-label="Open menu"
        className="border-0 bg-transparent text-inherit md:hidden"
        onClick={onMenu}
      >
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
    <section
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#282026] text-cream"
      id="top"
    >
      <div className="absolute inset-0">
        {wedding.heroImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="A moment from Seun and Benjamin's wedding"
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-contain object-center saturate-[0.72] transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-linear-to-b from-[#230c13]/28 via-[#230c13]/18 to-[#230c13]/78" />
      <div className="relative z-1 px-6 py-24 text-center md:px-10">
        <p className="mb-6 text-[0.68rem] uppercase tracking-[0.28em] text-[#eee0d9]">
          A sacred union
        </p>
        <h1 className="mb-6 font-serif text-[5rem] leading-[0.76] font-normal tracking-[-0.04em] md:text-[clamp(5rem,13vw,13rem)]">
          You&apos;re
          <br />
          <i className="font-normal text-accent">invited.</i>
        </h1>
        <p className="mx-auto mb-5 max-w-md text-[0.95rem] leading-7 text-[#eee0d9]">
          Join our families as we begin this beautiful chapter of love and faith
          before Jehovah.
        </p>
        <p className="text-[0.72rem] uppercase tracking-[0.24em]">
          Thursday · 1:00 PM prompt
        </p>
        <p className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-[#decfc9]">
          Kingdom Hall of Jehovah&apos;s Witnesses
        </p>
      </div>
      <div className="absolute right-[4vw] bottom-8 left-[4vw] flex items-center justify-between text-[0.62rem] uppercase tracking-[0.14em]">
        <span className="hidden items-center gap-2 md:inline-flex">
          Scroll to explore
        </span>
        <ArrowDown size={16} className="hidden md:block" />
        <div className="ml-auto flex items-center gap-5">
          <button
            aria-label="Previous photo"
            className="grid size-8 place-items-center rounded-full border border-[#bcb4aa] bg-transparent text-inherit"
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
            0{index + 1}{" "}
            <b className="font-normal">/ 0{wedding.heroImages.length}</b>
          </span>
          <button
            aria-label="Next photo"
            className="grid size-8 place-items-center rounded-full border border-[#bcb4aa] bg-transparent text-inherit"
            onClick={() => setIndex((i) => (i + 1) % wedding.heroImages.length)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

function GalleryArea() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % wedding.heroImages.length),
      6000,
    );
    return () => clearInterval(timer);
  }, []);
  return (
    <section
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-[#282026] text-cream"
      id="top"
    >
      <div className="absolute inset-0">
        {wedding.galleryImages.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="A moment from Seun and Benjamin's wedding"
            fill
            priority={i === 0}
            sizes="100vw"
            className={`object-contain object-center saturate-[0.72] transition-opacity duration-500 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>
      {/* <div className="absolute inset-0 bg-linear-to-b from-[#230c13]/28 via-[#230c13]/18 to-[#230c13]/78" /> */}
      {/* <div className="relative z-1 px-6 py-24 text-center md:px-10">
        <p className="mb-6 text-[0.68rem] uppercase tracking-[0.28em] text-[#eee0d9]">
          A sacred union
        </p>
        <h1 className="mb-6 font-serif text-[5rem] leading-[0.76] font-normal tracking-[-0.04em] md:text-[clamp(5rem,13vw,13rem)]">
          You&apos;re
          <br />
          <i className="font-normal text-accent">invited.</i>
        </h1>
        <p className="mx-auto mb-5 max-w-md text-[0.95rem] leading-7 text-[#eee0d9]">
          Join our families as we begin this beautiful chapter of love and faith
          before Jehovah.
        </p>
        <p className="text-[0.72rem] uppercase tracking-[0.24em]">
          Thursday · 1:00 PM prompt
        </p>
        <p className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-[#decfc9]">
          Kingdom Hall of Jehovah&apos;s Witnesses
        </p>
      </div> */}
      <div className="absolute right-[4vw] bottom-8 left-[4vw] flex items-center justify-between text-[0.62rem] uppercase tracking-[0.14em]">
        <span className="hidden items-center gap-2 md:inline-flex">
          Scroll to explore
        </span>
        <ArrowDown size={16} className="hidden md:block" />
        <div className="ml-auto flex items-center gap-5">
          <button
            aria-label="Previous photo"
            className="grid size-8 place-items-center rounded-full border border-[#bcb4aa] bg-transparent text-inherit"
            onClick={() =>
              setIndex(
                (i) =>
                  (i + wedding.galleryImages.length - 1) %
                  wedding.galleryImages.length,
              )
            }
          >
            ←
          </button>
          <span>
            0{index + 1}{" "}
            <b className="font-normal">/ 0{wedding.galleryImages.length}</b>
          </span>
          <button
            aria-label="Next photo"
            className="grid size-8 place-items-center rounded-full border border-[#bcb4aa] bg-transparent text-inherit"
            onClick={() => setIndex((i) => (i + 1) % wedding.galleryImages.length)}
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
    <section
      className="grid min-h-0 items-center gap-16 px-[8vw] py-[24vw] md:min-h-[85vh] md:grid-cols-2 md:gap-[8vw] md:px-[10vw] md:py-[12vw]"
      id="invitation"
    >
      <div>
        <p className="mb-6 text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
          An invitation
        </p>
        <h2 className="font-serif text-[clamp(3.3rem,7vw,6.8rem)] leading-[0.86] font-normal tracking-[-0.04em]">
          <span className="whitespace-nowrap">DEAR FAMILY</span>
          <br />
          &
          <br />
          <i className="font-normal text-accent">FRIENDS.</i>
        </h2>
      </div>
      <div className="max-w-[470px]">
        <p className="font-serif text-[clamp(2rem,3vw,3.2rem)] leading-[1.05]">
          Some moments become more beautiful when shared with the people who
          matter most
        </p>
        <p className="text-[0.9rem] leading-[1.7] text-muted-foreground">
          We , together with our families warmly invite you to share in the joy
          of our wedding and witness the beginning of this beautiful chapter of
          our lives.
        </p>
        <div className="my-10 flex items-center gap-4 text-accent">
          — <Heart size={16} /> —
        </div>
        <p className="font-serif text-2xl text-muted-foreground italic">
          Thank you for being part of our story.
        </p>
      </div>
    </section>
  );
}

function Details() {
  return (
    <section
      className="bg-[#eee4db] px-[8vw] py-[20vw] md:px-[10vw] md:py-[11vw]"
      id="details"
    >
      <div className="max-w-[650px]">
        <p className="mb-6 text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
          The wedding details
        </p>
        <h2 className="mb-5 font-serif text-[clamp(3.3rem,7vw,6.8rem)] leading-[0.86] font-normal tracking-[-0.04em]">
          A day set aside
          <br />
          <i className="font-normal text-accent">for love & faith.</i>
        </h2>
        <p className="text-[0.9rem] leading-[1.7] text-muted-foreground">
          We are delighted to welcome you to our wedding ceremony holding in
          Lagos, Nigeria.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-[850px] md:mt-20">
        {[
          ["Date", wedding.date],
          ["Time", wedding.time],
          ["Venue", wedding.venue],
          ["Address", wedding.address],
        ].map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[90px_1fr] gap-4 border-t border-[#d2c3b9] py-6 md:grid-cols-[180px_1fr] md:gap-8 md:py-6.5"
          >
            <span className="text-[0.68rem] uppercase tracking-[0.22em] text-wine">
              {label}
            </span>
            <strong className="font-serif text-[1.25rem] leading-[1.3] font-normal md:text-[1.4rem]">
              {value}
            </strong>
          </div>
        ))}
      </div>
      <a
        className="mt-2 inline-flex items-center gap-3 rounded-full border border-wine px-6.5 py-4 text-[0.7rem] uppercase tracking-[0.16em] no-underline"
        href={wedding.mapsUrl}
        target="_blank"
        rel="noreferrer"
      >
        Get directions <ArrowRight size={15} />
      </a>
      <a
        href={wedding.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-8 block overflow-hidden rounded-[1.25rem] border border-[#d2c3b9] bg-white shadow-[0_20px_60px_rgba(50,29,37,.08)] md:mt-10"
      >
        <Image
          src="/map.png"
          alt="Google Maps location of Kingdom Hall of Jehovah’s Witnesses"
          width={3360}
          height={1364}
          className="h-auto w-full"
          sizes="(max-width: 768px) 84vw, 80vw"
        />
      </a>
    </section>
  );
}

function Ceremony() {
  return (
    <section
      className="bg-[#f2e9df] px-[8vw] py-[20vw] md:px-[10vw] md:py-[11vw]"
      id="ceremony"
    >
      <div className="max-w-[650px]">
        <p className="mb-6 text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
          Order of ceremony
        </p>
        <h2 className="mb-5 font-serif text-[clamp(3.3rem,7vw,6.8rem)] leading-[0.86] font-normal tracking-[-0.04em]">
          A sacred union
          <br />
          <i className="font-normal text-accent">before Jehovah.</i>
        </h2>
        <p className="text-[0.9rem] leading-[1.7] text-muted-foreground">
          A thoughtful order for the moments that matter most.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-[850px] md:mt-20">
        {ceremony.map(([number, title, detail]) => (
          <div
            className="grid grid-cols-[55px_1fr] gap-4 border-t border-[#d6c9be] py-7 md:grid-cols-[100px_1fr] md:gap-8"
            key={number}
          >
            <span className="font-serif text-2xl text-accent italic">
              {number}
            </span>
            <div>
              <h3 className="mb-1 font-serif text-[1.55rem] font-normal tracking-[-0.04em]">
                {title}
              </h3>
              <p className="m-0 text-[0.9rem] leading-[1.5] text-muted-foreground">
                {detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BridalParty() {
  return (
    <section
      className="px-[8vw] py-[20vw] text-center md:px-[10vw] md:py-[11vw]"
      id="bridal-party"
    >
      <div className="mx-auto max-w-[650px]">
        <p className="mb-6 text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
          The bridal party
        </p>
        <h2 className="mb-5 font-serif text-[clamp(3.3rem,7vw,6.8rem)] leading-[0.86] font-normal tracking-[-0.04em]">
          Standing with us
          <br />
          <i className="font-normal text-accent">in love.</i>
        </h2>
        <p className="text-[0.9rem] leading-[1.7] text-muted-foreground">
          We are grateful for the beautiful souls standing with us on this
          special day.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-[1000px] grid-cols-2 gap-x-4 gap-y-10 md:mt-20 md:grid-cols-4 md:gap-8">
        {bridalParty.map((person) => (
          <div className="text-center" key={person.role}>
            <div className="mx-auto mb-6 grid size-28 place-items-center rounded-full bg-wine font-serif text-[2rem] text-cream md:size-36 md:text-[2.5rem]">
              {person.name === "Still to be announced"
                ? "—"
                : person.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
            </div>
            <h3 className="mb-1.5 font-serif text-[1.4rem] font-normal tracking-[-0.04em]">
              {person.name}
            </h3>
            <p className="text-[0.68rem] uppercase tracking-[0.19em] text-muted-foreground">
              {person.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Programme() {
  return (
    <section className="bg-[#e5d9d0] px-[8vw] py-[20vw] md:px-[10vw] md:py-[11vw]">
      <div className="max-w-[650px]">
        <p className="mb-6 text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
          The day
        </p>
        <h2 className="font-serif text-[clamp(3.3rem,7vw,6.8rem)] leading-[0.86] font-normal tracking-[-0.04em]">
          A little <i className="font-normal text-accent">timeline.</i>
        </h2>
      </div>
      <div className="mx-auto mt-12 max-w-[850px] md:mt-20">
        {programme.map(([time, title, place]) => (
          <div
            className="grid grid-cols-[88px_1fr_20px] items-center gap-4 border-t border-[#cfc0b6] py-6 md:grid-cols-[100px_1fr_20px] md:gap-8"
            key={time}
          >
            <span className="text-[0.7rem] tracking-[0.12em] text-accent">
              {time}
            </span>
            <div>
              <h3 className="mb-1 font-serif text-[1.55rem] font-normal tracking-[-0.04em]">
                {title}
              </h3>
              <p className="m-0 text-[0.9rem] leading-[1.5] text-muted-foreground">
                {place}
              </p>
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
      className="bg-background px-8 py-24 text-center text-ink md:px-[10vw] md:py-32"
      id="zoom"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-6 text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
          Unable to be there in person?
        </p>
        <h2 className="mb-5 font-serif text-5xl leading-[0.9] font-normal tracking-[-0.04em] md:text-7xl">
          Join us <i className="font-normal text-accent">online.</i>
        </h2>
        <p className="mb-12 text-base leading-8 text-muted-foreground md:text-lg">
          We would love to have you celebrate with us virtually. Join us on Zoom
          as we say “I do” from wherever you are.
        </p>
        <div className="mx-auto max-w-2xl rounded-[1.25rem] border border-border bg-white/70 px-6 py-10 shadow-[0_20px_60px_rgba(50,29,37,.06)] md:px-12">
          <p className="mb-3 text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Wedding Zoom Meeting
          </p>
          <p className="mb-10 text-lg text-accent">{zoom.date}</p>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-[#eee4db] px-5 py-7">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Meeting ID
              </p>
              <p className="mb-5 font-mono text-xl tracking-[0.16em]">
                {zoom.meetingId}
              </p>
              <button
                className="rounded-full bg-[#d39aaa] px-6 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-[#b9788a]"
                onClick={() => copy(zoom.meetingId)}
              >
                Copy
              </button>
            </div>
            <div className="rounded-xl border border-[#eee4db] px-5 py-7">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Passcode
              </p>
              <p className="mb-5 font-mono text-xl tracking-[0.16em]">
                {zoom.passcode}
              </p>
              <button
                className="rounded-full bg-[#d39aaa] px-6 py-2 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-[#b9788a]"
                onClick={() => copy(zoom.passcode)}
              >
                Copy
              </button>
            </div>
          </div>
          <a
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-xs uppercase tracking-[0.16em] text-white no-underline transition hover:bg-wine"
            href={zoom.link}
            target="_blank"
            rel="noreferrer"
          >
            Join Zoom <ArrowRight size={15} />
          </a>
        </div>
        <p className="mt-10 font-serif text-lg leading-8 text-muted-foreground italic">
          Please join a few minutes early. The ceremony will begin promptly at
          1:00 PM.
        </p>
      </div>
    </section>
  );
}

function Photography() {
  return (
    <section
      className="bg-wine px-[8vw] py-[20vw] text-cream md:px-[10vw] md:py-[11vw]"
      id="photographs"
    >
      <div className="max-w-[650px]">
        <p className="mb-6 text-[0.68rem] uppercase tracking-[0.28em] text-[#d5bfc1]">
          Order of photography
        </p>
        <h2 className="mb-5 font-serif text-[clamp(3.3rem,7vw,6.8rem)] leading-[0.86] font-normal tracking-[-0.04em]">
          Frames to
          <br />
          <i className="font-normal text-accent">remember.</i>
        </h2>
        <p className="text-[0.9rem] leading-[1.7] text-[#d5bfc1]">
          After the ceremony, we will gather for these joyful portraits.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-[950px] grid-cols-1 gap-4 md:mt-20 md:grid-cols-2">
        {photography.map((item, index) => (
          <div
            className="flex items-center gap-6 border border-cream/25 p-7"
            key={item}
          >
            <span className="font-serif text-[1.3rem] text-[#d7a7b1] italic">
              0{index + 1}
            </span>
            <h3 className="m-0 font-serif text-2xl font-normal tracking-[-0.04em]">
              {item}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function UnableToJoin() {
  return (
    <section className="grid items-stretch md:grid-cols-2">
      <div className="relative order-2 min-h-[105vw] bg-[#282026] md:order-none md:min-h-[600px]">
        <Image
          src={wedding.heroImages[2]}
          alt="Seun and Benjamin"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain object-center saturate-[0.75]"
        />
      </div>
      <div className="order-1 flex flex-col justify-center px-[8vw] pt-[20vw] pb-0 md:order-none md:p-[10vw]">
        <p className="mb-6 text-[0.68rem] uppercase tracking-[0.28em] text-muted-foreground">
          Join us online
        </p>
        <h2 className="mb-5 font-serif text-[clamp(3.3rem,7vw,6.8rem)] leading-[0.86] font-normal tracking-[-0.04em]">
          Unable to be
          <br />
          <i className="font-normal text-accent">there in person?</i>
        </h2>
        <p className="mb-8 max-w-[450px] text-base leading-[1.8] text-muted-foreground">
          We would love to have you celebrate with us virtually. Join us online
          as we say “I do” and share in this special moment from wherever you
          are.
        </p>
        <a
          className="inline-flex w-fit items-center justify-center gap-2.5 bg-ink px-5.5 py-4 text-[0.68rem] uppercase tracking-[0.14em] text-cream no-underline"
          href="#rsvp"
        >
          View joining details <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}

function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section
      className="bg-[#282026] px-[8vw] py-[20vw] text-cream md:px-[4vw] md:py-[11vw]"
      id="gallery"
    >
      <div className="md:ml-[6vw]">
        <p className="mb-6 text-[0.68rem] uppercase tracking-[0.28em] text-[#c7b4b2]">
          A few frames
        </p>
        <h2 className="font-serif text-[clamp(3.3rem,7vw,6.8rem)] leading-[0.86] font-normal tracking-[-0.04em]">
          In good <i className="font-normal text-accent">company.</i>
        </h2>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-1.5 md:mt-16 md:grid-cols-4 md:gap-2.5">
        {gallery.map((image, i) => (
          <button
            className={`relative aspect-3/4 overflow-hidden border-0 bg-[#333] p-0 ${
              i % 2 === 1 ? "mt-8 md:mt-16" : ""
            }`}
            key={image.src}
            onClick={() => setSelected(i)}
          >
            <Image
              src={image.src}
              alt={image.label}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-contain object-center transition-transform duration-500 hover:scale-105"
            />
          </button>
        ))}
      </div>
      {selected !== null && (
        <div
          className="fixed inset-0 z-30 grid place-items-center bg-[#191613]/92 p-[5vw]"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelected(null)}
        >
          <button
            className="absolute top-8 right-8 border-0 bg-transparent text-cream"
            aria-label="Close gallery"
          >
            <X />
          </button>
          <Image
            src={gallery[selected].src}
            alt={gallery[selected].label}
            width={1400}
            height={2100}
            className="h-auto max-h-[85vh] w-auto object-contain"
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
    <section
      className="bg-accent px-[8vw] py-[24vw] text-cream md:px-[10vw] md:py-[12vw]"
      id="rsvp"
    >
      {sent ? (
        <div className="mx-auto max-w-[650px] text-center">
          <Check size={28} className="mx-auto mb-8" />
          <p className="mb-6 text-[0.68rem] uppercase tracking-[0.28em] text-[#f0dfe0]">
            Thank you, {name || "friend"}
          </p>
          <h2 className="mb-5 font-serif text-[clamp(4rem,7vw,7rem)] leading-[0.86] font-normal tracking-[-0.04em]">
            We will hold
            <br />
            <i className="font-normal">you in our hearts.</i>
          </h2>
          <p>
            Your response has been noted. We cannot wait to celebrate together.
          </p>
        </div>
      ) : (
        <div className="mx-auto grid max-w-[1100px] gap-16 md:grid-cols-2 md:gap-[8vw]">
          <div>
            <p className="mb-6 text-[0.68rem] uppercase tracking-[0.28em] text-[#f0dfe0]">
              Unable to join?
            </p>
            <h2 className="mb-5 font-serif text-[clamp(4rem,7vw,7rem)] leading-[0.86] font-normal tracking-[-0.04em]">
              Let us
              <br />
              <i className="font-normal">know.</i>
            </h2>
            <p className="text-[0.9rem] leading-[1.7] text-[#f0dfe0]">
              Whether you will be with us in person or in spirit, your response
              means so much.
            </p>
          </div>
          <form
            className="grid gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              if (name.trim()) setSent(true);
            }}
          >
            <label className="grid gap-2 text-[0.68rem] uppercase tracking-[0.1em] text-[#f5e5e1]">
              Your name
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-none border-0 border-b border-[#d8aab1] bg-transparent py-2.5 text-[0.9rem] text-cream outline-none placeholder:text-[#f0cdd1]"
              />
            </label>
            <label className="grid gap-2 text-[0.68rem] uppercase tracking-[0.1em] text-[#f5e5e1]">
              Your response
              <select
                defaultValue="yes"
                className="w-full rounded-none border-0 border-b border-[#d8aab1] bg-transparent py-2.5 text-[0.9rem] text-cream outline-none"
              >
                <option value="yes" className="text-ink">
                  Joyfully accepts
                </option>
                <option value="no" className="text-ink">
                  Regretfully declines
                </option>
              </select>
            </label>
            <label className="grid gap-2 text-[0.68rem] uppercase tracking-[0.1em] text-[#f5e5e1]">
              Anything we should know?
              <textarea
                rows={3}
                placeholder="A note for the couple..."
                className="w-full rounded-none border-0 border-b border-[#d8aab1] bg-transparent py-2.5 text-[0.9rem] text-cream outline-none placeholder:text-[#f0cdd1]"
              />
            </label>
            <button
              className="inline-flex w-fit items-center justify-center gap-2.5 border-0 bg-ink px-5.5 py-4 text-[0.68rem] uppercase tracking-[0.14em] text-cream"
              type="submit"
            >
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
    <div className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-7 bg-ink text-cream">
      <button
        aria-label="Close menu"
        onClick={close}
        className="absolute top-6 right-[4vw] border-0 bg-transparent text-inherit"
      >
        <X />
      </button>
      {navItems.map((item) => (
        <a
          key={item}
          onClick={close}
          href={`#${item.toLowerCase().replace(" ", "-")}`}
          className="font-serif text-[2.8rem] no-underline"
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
        {/* <Hero /> */}
        <Invitation />
        <GalleryArea />
        <Details />
        <Ceremony />
        <BridalParty />
        <Programme />
        <Photography />
        <ZoomMeeting />
        <UnableToJoin />
        <Gallery />
        <RSVP />
        <footer className="flex items-center justify-between bg-ink px-[6vw] py-6 text-[0.7rem] text-cream md:px-[4vw] md:py-8">
          <Heart size={17} fill="currentColor" />
          <p className="hidden m-0 md:block">With love, Seun & Benjamin</p>
          <a
            href="#top"
            className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.1em] no-underline"
          >
            Back to top <ChevronDown size={15} />
          </a>
        </footer>
      </main>
    </>
  );
}
