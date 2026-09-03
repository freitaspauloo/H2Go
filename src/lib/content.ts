export const h2go = {
  name: "H2GO Mobile Wash",
  short: "H2GO",
  phone: "1.888.990.4246",
  phoneHref: "tel:+18889904246",
  email: "info@h2gomobilewash.com",
  address: "16 Kemp Road West, Grimsby, ON L3M 4E7",
  tagline: "The power washing solution.",
  description:
    "Mobile hot-water and steam power washing for residential, commercial and industrial properties across Ontario. Available 24/7/365, using only eco-friendly detergents.",
};

export type Service = {
  title: string;
  blurb: string;
  image: string;
  tag: string;
};

export const services: Service[] = [
  {
    title: "Residential",
    tag: "Homes & outdoor spaces",
    blurb:
      "House exteriors, driveways, decks, patios, fences, interlock, pools and windows. One detailed visit, no ladders for you.",
    image: "/h2go/house.jpg",
  },
  {
    title: "Commercial",
    tag: "Buildings, fleets & sites",
    blurb:
      "Storefronts, high-rise façades, parking garages, fleets of vehicles and construction equipment—scheduled around your hours.",
    image: "/h2go/apartment.jpg",
  },
  {
    title: "Industrial",
    tag: "Facilities & equipment",
    blurb:
      "Manufacturing facilities, heavy equipment, spill response and sanitization with high-flow hot water and steam.",
    image: "/h2go/social-1.jpg",
  },
];

export const detailServices = [
  { title: "Home exterior wash", image: "/h2go/house-wash.jpg" },
  { title: "Driveway & concrete", image: "/h2go/driveway.jpg" },
  { title: "Deck & patio", image: "/h2go/deck.jpg" },
  { title: "Fence restoration", image: "/h2go/fence.jpg" },
  { title: "Interlock cleaning", image: "/h2go/interlock.jpg" },
  { title: "Window cleaning", image: "/h2go/window.jpg" },
  { title: "Fleet & truck washing", image: "/h2go/fleet.jpg" },
  { title: "Building façades", image: "/h2go/stucco.jpg" },
  { title: "Parking garages", image: "/h2go/parking-garage.jpg" },
];

export const stats = [
  { value: 24, suffix: "/7", label: "Always on", detail: "Emergency clean-up and scheduled service, 365 days a year." },
  { value: 5000, suffix: "+", label: "Properties served", detail: "Homes, high-rises, fleets and facilities across Ontario." },
  { value: 98, suffix: "%", label: "On-time arrival", detail: "Scheduled appointments met, tracked job by job." },
  { value: 12, suffix: "+", label: "Years of service", detail: "Hot water, steam and eco-friendly detergents since day one." },
];

export const testimonial = {
  quote:
    "H2GO washed my entire ten-acre property on well water—twelve hours of work with hydrogen vans and eco-friendly detergents. They brought the place back to life.",
  name: "Mike Holmes",
  role: "Contractor & TV host, Holmes on Homes",
  avatar: "/h2go/mike-holmes.jpg",
};

export const trustedBy = [
  "Holmes Group",
  "McMaster University",
  "Niagara Region",
  "Skyline Living",
  "Hamilton Fleet Co.",
  "Grimsby Wineries",
];

/**
 * Videos published by H2GO. YouTube ids are used for the background embeds.
 * Drop an MP4 at the `mp4` path (public/h2go/video/…) and it takes precedence
 * over the embed automatically.
 */
export const videos = {
  fleet: {
    title: "H2GO Mobile Wash — Fleet Wash Service",
    youtubeId: "5u_iE_hFCF4",
    mp4: "/h2go/video/fleet-wash.mp4",
    start: 2,
  },
  monument: {
    title: "H2GO Mobile Wash — Monument Restoration",
    youtubeId: "TeDnoR-ewlI",
    mp4: "/h2go/video/monument-restoration.mp4",
    start: 3,
  },
  tower: {
    title: "Apartment Building Wash — 12 Story Building Wash",
    youtubeId: "L95M-ExvsrM",
    mp4: "/h2go/video/tower-wash.mp4",
    start: 1,
  },
  /** Vimeo sources on the site (not embeddable as silent backgrounds without a Vimeo Plus plan). */
  vimeo: {
    hospital: { title: "H2Go Mobile Wash — General Hospital, Hamilton", id: "237971079" },
    residential: { title: "H2Go Residential Services", id: "358208698" },
  },
};

export const faqs = [
  {
    q: "What is the HomeCare Club?",
    a: "Ontario's first exterior maintenance membership. Seasonal washes, priority scheduling and member pricing—set it once and your property stays spotless all year.",
  },
  {
    q: "Do you really operate 24/7?",
    a: "Yes. Our mobile wash units run 24/7/365 for scheduled work, recurring contracts and emergency clean-ups such as spills and graffiti.",
  },
  {
    q: "Are your products safe for plants and pets?",
    a: "We use only high-quality, eco-friendly, biodegradable detergents and rinse landscaping before and after every wash.",
  },
];
