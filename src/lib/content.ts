// Static content for Radiant Company Limited Corporate Portal

import {
  Ship,
  Boxes,
  Anchor,
  ShoppingCart,
  Package,
  GraduationCap,
  Clock,
  Star,
  Handshake,
  Shield,
  DollarSign,
  Globe,
  Scale,
  Trophy,
  Lock,
  HardHat,
  Lightbulb,
  Rocket,
  Users,
} from "lucide-react";

export const COMPANY = {
  name: "RADIANT COMPANY LIMITED",
  tagline: "Radiant services, limitless solutions",
  email: "info@radianttz.co.tz",
  website: "www.radianttz.co.tz",
  phones: ["+255 717 089 557", "+255 621 269 428"],
  logoAsset: "/assets/SAVE_20260711_203949.png",
};

export const ABOUT = {
  body: [
    "Radiant Company Limited is a premier maritime, logistics, and construction support firm headquartered in Zanzibar, Tanzania. Established to serve the growing demands of East Africa's blue economy, we combine deep regional expertise with international standards to deliver seamless, end-to-end solutions across shipping, cargo handling, chandling, and building materials supply.",
    "Our operations span the East African coastline, with a particular focus on Zanzibar and mainland Tanzania. We are fully registered with the Zanzibar Maritime Authority (ZMA), ensuring that every shipping agency and maritime service we provide meets the highest regulatory and safety benchmarks in the region.",
    "From managing port calls and clearances to supplying quality building materials and providing comprehensive ship chandling services, Radiant Company Limited is the trusted partner that regional and international clients rely on when they need reliable, cost-effective, and professional service delivered on time.",
  ],
};

export const SERVICES = [
  {
    slug: "freight",
    title: "Sea & Coastal Freight Water Transport",
    icon: Ship,
    short:
      "Reliable sea and coastal freight transport solutions connecting Zanzibar and East African ports with precision and efficiency.",
    detail: `Our Sea & Coastal Freight Water Transport service provides comprehensive shipping solutions across East African waters. We coordinate vessel scheduling, cargo booking, and freight documentation to ensure your goods move safely and on time between Zanzibar, Dar es Salaam, Mombasa, and other regional ports.

We manage all aspects of freight logistics including bill of lading preparation, customs liaison, port authority coordination, and last-mile delivery arrangements. Our experienced team monitors every shipment from origin to destination, providing real-time updates and proactive problem resolution to minimise delays and reduce costs for our clients.`,
  },
  {
    slug: "materials",
    title: "Supply of Building Materials",
    icon: Boxes,
    short:
      "Quality building materials sourced and delivered reliably across Zanzibar and Tanzania for construction projects of any scale.",
    detail: `Radiant Company Limited is a leading supplier of quality building materials across Zanzibar and the wider Tanzania region. We maintain strong supplier relationships and robust logistics networks to ensure timely delivery of all construction essentials.

Our building materials product range includes:
• Cement (Portland and specialty grades)
• Sand (fine and coarse, river and marine)
• White Cement (premium finishing grade)
• Gravel (crushed stone and natural aggregate)
• Steel Reinforcement Bars (rebar, various diameters)
• Blocks (concrete hollow and solid blocks)
• Roofing Materials (iron sheets, tiles, and accessories)

We offer competitive bulk pricing, flexible delivery schedules, and quality assurance on all products. Whether you are managing a residential build or a large infrastructure project, our team will work with you to meet your specifications and timelines.`,
    products: [
      "Cement",
      "Sand",
      "White Cement",
      "Gravel",
      "Steel Reinforcement Bars",
      "Blocks",
      "Roofing Materials",
    ],
  },
  {
    slug: "zma",
    title: "Shipping Agency (ZMA)",
    icon: Anchor,
    short:
      "Fully ZMA-registered shipping agency providing port representation, vessel clearance, and complete port call management.",
    detail: `As a registered Zanzibar Maritime Authority (ZMA) shipping agent, Radiant Company Limited provides authoritative port representation for vessel owners, operators, and charterers calling at Zanzibar and Tanzanian ports.

Our shipping agency services include vessel pre-arrival notification, port clearance and customs documentation, berth arrangements and harbour master liaison, crew welfare management and visa facilitation, cargo surveys and inspection coordination, cargo receipt and delivery, freight invoice management, and post-departure port disbursement accounts.

We maintain 24/7 communication with port authorities and provide a single point of contact throughout the entire port call, ensuring your vessel turnaround is fast, compliant, and cost-effective.`,
  },
  {
    slug: "chandling",
    title: "Ship Chandlers",
    icon: ShoppingCart,
    short:
      "Comprehensive ship chandling supplying provisions, deck and engine stores, bonded goods, and marine equipment to vessels in port.",
    detail: `Radiant Company Limited provides full-service ship chandling to vessels calling at Zanzibar and surrounding East African ports. Our chandling division is staffed by experienced marine supply specialists who understand the critical importance of timely, accurate deliveries to vessels on tight turnaround schedules.

We supply a comprehensive range of provisions including fresh and preserved foodstuffs, fresh water, deck stores (ropes, paints, safety equipment), engine room stores (oils, filters, spare parts), bonded goods (tobacco, spirits), cleaning materials, and cabin supplies. We also coordinate bonded store deliveries in compliance with Tanzania Revenue Authority regulations.

Our supply chain covers both local and internationally-sourced products, and our logistics team ensures delivery to the vessel gangway within agreed timeframes, with full documentation and inspection services on request.`,
  },
  {
    slug: "cargo",
    title: "Cargo Handling",
    icon: Package,
    short:
      "Professional cargo handling services including stevedoring, warehousing, tallying, and cargo inspection at Zanzibar ports.",
    detail: `Our Cargo Handling division delivers expert stevedoring and port cargo management services at Zanzibar port and surrounding terminals. We combine experienced workforce management with modern cargo-handling practices to ensure safe, efficient, and damage-free cargo operations.

Services include container and break-bulk stevedoring, cargo tallying and documentation, lashing and securing, warehousing and storage (short and long-term), reefer monitoring, dangerous goods handling (IMDG-compliant), cargo surveys and outturn reports, and customs examination facilitation.

Our operations are fully compliant with Zanzibar Port Corporation regulations and ISPS code requirements. We work with port authorities and customs to minimise dwell time and help our clients achieve the fastest possible cargo release.`,
  },
];

export const WHY_US = [
  {
    id: 1,
    icon: GraduationCap,
    title: "Professional Expertise",
    desc: "Decades of combined maritime and logistics experience with ZMA-certified specialists who know the East African market inside out.",
  },
  {
    id: 2,
    icon: Clock,
    title: "Reliability & Efficiency",
    desc: "We deliver on commitments — on time, every time. Our operations are built on robust processes that minimise delays and cost overruns.",
  },
  {
    id: 3,
    icon: Star,
    title: "Quality Services & Products",
    desc: "Every service we provide and every product we supply meets rigorous quality standards, backed by established supplier and authority relationships.",
  },
  {
    id: 4,
    icon: Handshake,
    title: "Customer-Centered Approach",
    desc: "Your goals are our goals. We listen, tailor our solutions to your specific needs, and maintain transparent communication throughout every engagement.",
  },
  {
    id: 5,
    icon: Shield,
    title: "Safety & Compliance",
    desc: "We operate under ZMA registration and ISPS/IMDG standards, ensuring every maritime, cargo, and supply operation is safe and fully compliant.",
  },
  {
    id: 6,
    icon: DollarSign,
    title: "Competitive & Cost-Effective Solutions",
    desc: "We leverage our regional networks and economies of scale to offer outstanding value without ever compromising on quality or service standards.",
  },
  {
    id: 7,
    icon: Globe,
    title: "Comprehensive Service Portfolio",
    desc: "From freight transport and cargo handling to ship chandling, shipping agency, and building materials — one trusted partner for your entire operation.",
  },
];

export const VISION =
  "To be the leading maritime, logistics, and construction supply partner in East Africa — renowned for integrity, innovation, and the highest standards of professional service.";

export const MISSION =
  "To deliver reliable, cost-effective, and comprehensive maritime, logistics, and construction support services that exceed client expectations, foster economic growth across East Africa, and build lasting partnerships grounded in trust, safety, and excellence.";

export const CORE_VALUES = [
  { id: 1, name: "Integrity", icon: Scale, desc: "We act with honesty and transparency in every transaction and relationship." },
  { id: 2, name: "Excellence", icon: Trophy, desc: "We pursue the highest standards in everything we do, continuously improving our services." },
  { id: 3, name: "Reliability", icon: Lock, desc: "Our clients can count on us to deliver on our commitments, every single time." },
  { id: 4, name: "Safety", icon: HardHat, desc: "The safety of our people, clients, and environment is always our first priority." },
  { id: 5, name: "Customer Focus", icon: Lightbulb, desc: "We put our clients at the heart of every decision, tailoring solutions to their needs." },
  { id: 6, name: "Innovation", icon: Rocket, desc: "We embrace new ideas and technologies to deliver smarter, more efficient solutions." },
  { id: 7, name: "Teamwork", icon: Users, desc: "We collaborate across teams and with partners to achieve outstanding results together." },
];

export const PARTNERS = [
  {
    id: "propav",
    name: "PROPAV Infrastructure",
    tagline: "Building the foundations of tomorrow",
    logo: "/assets/IMG_20260625_133054.jpg",
  },
  {
    id: "crdb",
    name: "CRDB Bank",
    tagline: "The bank that listens",
    logo: "/assets/CRDB_Bank_Logo.svg",
  },
  {
    id: "alpha",
    name: "ALPHA LOGISTICS",
    tagline: "Beyond Logistics",
    logo: "/assets/IMG_20260625_133206.jpg",
  },
  {
    id: "til",
    name: "TIL CONSTRUCTION LIMITED",
    tagline: "Construction excellence across East Africa",
    logo: "/assets/IMG_20260625_133253.jpg",
  },
];
