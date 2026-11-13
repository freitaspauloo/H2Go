// Hierarchy from Scott's Nov 10 framework: two audiences, not three.
// Industrial, property management and fleet live inside Commercial.
// Service descriptions are existing-site placeholders until Offer V1.
export type Offering = { slug: string; title: string; image: string; description: string; services: string[] };
export type SubVertical = { slug: string; title: string; careName: string; description: string; image: string; film?: string; story?: number; types: Offering[] };
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
    description: 'House, driveway, deck, windows, fence and pool. Choose what needs attention, then plan a free home assessment.',
    image: '/h2go/house.jpg',
    film: '/h2go/video/residential-wash.mp4',
    story: 0,
    cta: residentialCta,
    subverticals: [],
    offerings: [
      type('house-washing', 'House washing', 'house-wash.jpg', 'Refresh siding, brick and exterior surfaces with a wash suited to your home.', ['Home exterior wash']),
      type('driveways', 'Driveways', 'driveway.jpg', 'Lift built-up dirt from concrete, paved and interlocking driveways.', ['Driveway cleaning', 'Interlock cleaning']),
      type('deck-patio-power-washing', 'Deck and patio', 'deck.jpg', 'Bring outdoor gathering spaces back into use with surface-appropriate cleaning.', ['Deck cleaning', 'Patio cleaning']),
      type('window-cleaning', 'Windows', 'window.jpg', 'Clear away exterior dirt and residue for a cleaner view.', ['Window cleaning']),
      type('fence-power-washing', 'Fences', 'fence.jpg', 'Remove weathered buildup while choosing a method suited to the fence material.', ['Fence cleaning']),
      type('pool-power-washing', 'Pools', 'patio.jpg', 'Plan a clean for pool surfaces and the outdoor areas around them.', ['Pool cleaning']),
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
        title: 'Property management and condo',
        careName: 'Property Care',
        description: 'Facades, entrances and common areas for buildings with more than one household.',
        image: '/h2go/apartment.jpg',
        types: [
          type('apartments-condos', 'Apartments and condos', 'apartment.jpg', 'Coordinate cleaning for facades, entrances and common areas.', ['Building exterior wash', 'Entrance and common-area wash']),
          type('commercial-properties', 'Commercial properties', 'job-1.jpg', 'Care for offices and high-traffic exterior spaces.', ['Exterior property wash']),
        ],
      },
      {
        slug: 'retail-parking',
        title: 'Retail, restaurants and parking',
        careName: 'Facility Care',
        description: 'Storefronts, hospitality sites, parking areas and the grounds around them.',
        image: '/h2go/parking-garage.jpg',
        types: [
          type('parking-facilities', 'Parking facilities', 'parking-garage.jpg', 'Remove accumulated dirt from garages and parking areas.', ['Parking garage wash']),
          type('commercial-windows', 'Commercial windows', 'commercial-window.jpg', 'Schedule exterior window washing for your building.', ['Exterior window washing']),
          type('graffiti-removal', 'Graffiti removal', 'graffiti.png', 'Arrange targeted removal or recurring graffiti management.', ['Graffiti removal']),
        ],
      },
      {
        slug: 'industrial-construction',
        title: 'Industrial and construction',
        careName: 'Facility Care',
        description: 'Warehouses, plants, equipment and active construction sites.',
        image: '/h2go/social-3.jpg',
        types: [
          type('factory-maintenance', 'Factory maintenance', 'social-3.jpg', 'Plan cleaning for production areas, floors and facility exteriors.', ['Facility exterior wash', 'Floor cleaning']),
          type('equipment-cleaning', 'Equipment cleaning', 'job-4.jpg', 'Remove accumulated grease and dirt from working machinery.', ['Equipment wash']),
          type('spill-cleanup', 'Spill cleanup', 'social-1.jpg', 'Discuss the material, location and response requirements with the team.', ['Spill cleanup']),
        ],
      },
      {
        slug: 'municipal-institutional',
        title: 'Municipal and institutional',
        careName: 'District Care',
        description: 'Public buildings, healthcare and education sites.',
        image: '/h2go/hospital-project.jpg',
        types: [
          type('institutional-buildings', 'Institutional buildings', 'hospital-project.jpg', 'Exterior and grounds care for healthcare, education and civic buildings.', ['Building exterior wash', 'Grounds cleaning']),
        ],
      },
      {
        slug: 'fleet',
        title: 'Fleet',
        careName: 'Fleet Care',
        description: 'On-site vehicle washing for transportation, logistics and any business with a fleet.',
        image: '/h2go/fleet.jpg',
        film: '/h2go/video/fleet-wash.mp4',
        story: 2,
        types: [
          type('fleet-washing', 'Fleet washing', 'fleet.jpg', 'Keep work vehicles clean with an on-site wash schedule.', ['Fleet wash']),
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
