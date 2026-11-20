// Hierarchy from Scott's Nov 10 framework: two audiences, not three.
// Industrial, property management and fleet live inside Commercial.
// Service descriptions are existing-site placeholders until Offer V1.
export type Offering = { slug: string; title: string; image: string; description: string; services: string[] };
export type SubVertical = {
  slug: string;
  title: string;
  /** Kept for older references. Care badges are not shown on commercial cards. */
  careName: string;
  description: string;
  image: string;
  film?: string;
  /** Set only when this group has an approved project example. */
  story?: number;
  /** When true, each type is a sub-link on the commercial card. */
  linked?: boolean;
  /** Specialty card also sends home visitors to Residential. */
  homeLink?: boolean;
  types: Offering[];
};
export type Vertical = {
  slug: string;
  title: string;
  label: string;
  headline: string;
  description: string;
  image: string;
  /** Local H2GO film for the hero. Sub-verticals may override it. */
  film: string;
  /** Index of the story shown first in the proof carousel. */
  story: number;
  cta: string;
  offerings: Offering[];
  subverticals: SubVertical[];
};

const type = (slug: string, title: string, image: string, description: string, services: string[]): Offering => ({
  slug, title, image: `/h2go/${image}`, description, services,
});

export const residentialCta = 'Plan my free home assessment';
export const commercialCta = 'Request a free site assessment';

export const verticals: Vertical[] = [
  {
    slug: 'residential',
    title: 'Residential',
    label: 'For the place you call home',
    headline: 'A fresh start. Right outside your door.',
    description: 'House, driveway, deck, windows and fence. Choose what needs attention, then plan a free home assessment.',
    image: '/h2go/house.jpg',
    film: '/h2go/video/residential-wash.mp4',
    story: 0,
    cta: residentialCta,
    subverticals: [],
    offerings: [
      type('house-washing', 'House washing', 'house-wash.jpg', 'Refresh siding, brick and exterior surfaces with a wash suited to your home.', ['Home exterior wash']),
      type('driveways', 'Driveways', 'driveway.jpg', 'Lift built-up dirt from concrete, paved and interlocking driveways.', ['Driveway cleaning', 'Interlock cleaning', 'Interlock sanding and sealing', 'Interlock lift and re-lay', 'Asphalt sealing']),
      type('deck-patio-power-washing', 'Deck and patio', 'deck.jpg', 'Bring outdoor gathering spaces back into use with surface-appropriate cleaning.', ['Deck cleaning', 'Patio cleaning']),
      type('window-cleaning', 'Windows', 'window.jpg', 'Clear away exterior dirt and residue for a cleaner view.', ['Window cleaning']),
      type('fence-power-washing', 'Fences', 'fence.jpg', 'Remove weathered buildup while choosing a method suited to the fence material.', ['Fence cleaning']),
      type('solar-panel-cleaning', 'Solar panels', 'house.jpg', 'Clean solar panels so the surface can do its job.', ['Solar panel cleaning']),
    ],
  },
  {
    slug: 'commercial',
    title: 'Commercial',
    label: 'For properties, fleets and facilities',
    headline: 'Your property. A better first impression.',
    description: 'Mobile washing for buildings, sites and fleets. Choose your kind of property, then request a free site assessment.',
    image: '/h2go/apartment.jpg',
    film: '/h2go/video/tower-wash.mp4',
    story: 1,
    cta: commercialCta,
    offerings: [],
    subverticals: [
      {
        slug: 'property-management',
        title: 'Property Management & Condos',
        careName: 'Care Club',
        description: 'Condos, apartments, commercial buildings and property portfolios.',
        image: '/h2go/apartment.jpg',
        types: [
          type('property-wash', 'Property wash', 'apartment.jpg', 'Facades, entrances and common areas for buildings with more than one household.', ['Building exterior wash', 'Entrance and common-area wash']),
        ],
      },
      {
        slug: 'parking-garages',
        title: 'Parking Garages & Lots',
        careName: 'Care Club',
        description: 'Parking garages, surface lots and managed parking facilities.',
        image: '/h2go/parking-garage.jpg',
        types: [
          type('parking-wash', 'Parking wash', 'parking-garage.jpg', 'Garages, surface lots and the areas around them.', ['Parking garage wash', 'Parking lot sweeping', 'Asphalt sealing']),
        ],
      },
      {
        slug: 'retail-restaurants-automotive',
        title: 'Retail, Restaurants & Automotive',
        careName: 'Care Club',
        description: 'Restaurants, shops and malls, gas stations, car dealerships and service shops.',
        image: '/h2go/job-1.jpg',
        linked: true,
        types: [
          type('restaurants-shops', 'Restaurants & Shops', 'job-1.jpg', 'Storefronts, restaurants and retail sites.', ['Storefront wash', 'Exterior window washing']),
          type('gas-stations', 'Gas Stations', 'social-1.jpg', 'Fuel sites and the paved areas around them.', ['Forecourt wash']),
          type('dealerships-service-shops', 'Dealerships & Service Shops', 'job-4.jpg', 'Dealership lots and service-shop exteriors.', ['Lot wash', 'Exterior wash']),
        ],
      },
      {
        slug: 'hospitality-recreation',
        title: 'Hospitality & Recreation',
        careName: 'Care Club',
        description: 'Hotels, golf courses, marinas, campgrounds, wineries and event venues.',
        image: '/h2go/deck.jpg',
        types: [
          type('hospitality-wash', 'Hospitality wash', 'deck.jpg', 'Exterior cleaning for hospitality and recreation sites.', ['Building exterior wash', 'Grounds cleaning']),
        ],
      },
      {
        slug: 'industrial-food',
        title: 'Industrial & Food Processing',
        careName: 'Care Club',
        description: 'Warehouses, manufacturing plants and food and beverage facilities.',
        image: '/h2go/social-3.jpg',
        linked: true,
        types: [
          type('warehouses-manufacturing', 'Warehouses & Manufacturing', 'social-3.jpg', 'Warehouses, plants and working equipment.', ['Facility exterior wash', 'Equipment wash', 'Power flushing']),
          type('food-beverage', 'Food & Beverage Facilities', 'job-4.jpg', 'Food and beverage production sites.', ['Facility exterior wash', 'Floor cleaning']),
        ],
      },
      {
        slug: 'construction-development',
        title: 'Construction & Development',
        careName: 'Care Club',
        description: 'Builders and contractors. Exterior cleaning only.',
        image: '/h2go/social-1.jpg',
        types: [
          type('construction-exterior', 'Exterior site wash', 'social-1.jpg', 'Exterior cleaning for active construction sites.', ['Exterior construction-site wash']),
        ],
      },
      {
        slug: 'municipal-institutional',
        title: 'Municipal & Institutional',
        careName: 'Care Club',
        description: 'Cities, BIAs, hospitals, long-term care, schools, campuses and utilities.',
        image: '/h2go/hospital-project.jpg',
        story: 1,
        linked: true,
        types: [
          type('municipalities-bias', 'Municipalities & BIAs', 'hospital-project.jpg', 'Civic buildings and business-improvement areas.', ['Building exterior wash', 'Grounds cleaning']),
          type('healthcare-long-term-care', 'Healthcare & Long-Term Care', 'hospital-project.jpg', 'Hospitals and long-term care sites.', ['Building exterior wash']),
          type('education', 'Education', 'job-1.jpg', 'Schools and campuses.', ['Building exterior wash', 'Grounds cleaning']),
          type('utilities', 'Utilities', 'social-3.jpg', 'Utility sites and the grounds around them.', ['Site wash']),
        ],
      },
      {
        slug: 'fleet-logistics',
        title: 'Fleet & Logistics',
        careName: 'Care Club',
        description: 'Vehicle fleets, terminals, yards, loading areas and wash bays.',
        image: '/h2go/fleet.jpg',
        film: '/h2go/video/fleet-wash.mp4',
        story: 2,
        types: [
          type('fleet-washing', 'Fleet wash', 'fleet.jpg', 'On-site washing for vehicles, yards and wash bays.', ['Fleet wash']),
        ],
      },
      {
        slug: 'farms-agriculture',
        title: 'Farms & Agriculture',
        careName: 'Care Club',
        description: 'Farm buildings, barns, equipment, greenhouses and nurseries.',
        image: '/h2go/house-wash.jpg',
        types: [
          type('agricultural-wash', 'Agricultural wash', 'house-wash.jpg', 'Farm buildings, barns, equipment, greenhouses and nurseries.', ['Agricultural wash']),
        ],
      },
      {
        slug: 'specialty',
        title: 'Specialty',
        careName: 'Care Club',
        description: 'Unusual or one-off jobs outside the other groups. You say it, we spray it. Assessed case by case.',
        image: '/h2go/graffiti.png',
        homeLink: true,
        types: [
          type('specialty-wash', 'Specialty wash', 'graffiti.png', 'Tell us about the job. H2GO assesses it case by case.', ['Specialty wash']),
        ],
      },
    ],
  },
];

export const findVertical = (slug: string) => verticals.find(v => v.slug === slug);
export const findSubvertical = (vertical: Vertical, slug: string) => vertical.subverticals.find(s => s.slug === slug);
export const serviceHref = (v: Vertical, o?: Offering, sub?: SubVertical) => {
  if (sub && o) return `/services/${v.slug}/${sub.slug}/${o.slug}`;
  if (sub) return `/services/${v.slug}/${sub.slug}`;
  if (o) return `/services/${v.slug}/${o.slug}`;
  return `/services/${v.slug}`;
};

export function isCommercialService(label: string) {
  return assessmentOptions('commercial').some(option => option.value === label);
}

export function assessmentOptions(slug?: string) {
  const source = slug ? verticals.filter(v => v.slug === slug) : verticals;
  const types = source.flatMap(v => v.subverticals.length ? v.subverticals.flatMap(s => s.types) : v.offerings);
  const seen = new Set<string>();
  const options = types.flatMap(t => [t.title, ...t.services]).filter(label => {
    if (seen.has(label)) return false;
    seen.add(label);
    return true;
  }).map(label => ({ value: label, label }));
  if (!slug || slug === 'residential') options.push({ value: 'Home Care Club', label: 'Home Care Club' });
  return options;
}
