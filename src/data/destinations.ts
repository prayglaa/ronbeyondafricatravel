export type DestinationDetail = {
  /** Matches the name used in the Destinations grid */
  name: string;
  /** Value used in the booking form destination select */
  bookingValue: string;
  tagline: string;
  welcome: string;
  bestTime: string;
  gettingThere: string;
  /** Places / stages of the journey */
  before: string[];
  during: string[];
  after: string[];
  hotels: { name: string; note: string }[];
  entertainment: string[];
  culture: string[];
  /** Day-by-day building blocks used to auto-arrange the journey */
  dayPlan: string[];
  /** Repeated / filler days when the traveller picks more days than the core plan */
  extraDays: string[];
  minDays: number;
  suggestedDays: number;
};

export const DESTINATION_DETAILS: Record<string, DestinationDetail> = {
  "Serengeti National Park": {
    name: "Serengeti National Park",
    bookingValue: "Serengeti",
    tagline: "The endless plains and the Great Migration",
    welcome:
      "Karibu Serengeti — 14,750 km² of golden grassland where 1.5 million wildebeest, 250,000 zebra and the predators that follow them write the greatest wildlife story on Earth. This is the heart of a Tanzanian safari and the park every traveller dreams about.",
    bestTime:
      "Year-round. Dec–Mar for calving in the southern plains, Jun–Jul for the western corridor, Aug–Oct for the Mara River crossings.",
    gettingThere:
      "Fly Arusha/Kilimanjaro to Seronera, Kogatende or Grumeti (1h 15m), or drive the scenic Northern Circuit road via Ngorongoro (approx. 7–8 hours).",
    before: [
      "Arrival and welcome briefing in Arusha with your Ronbeyond guide",
      "Kit check, camera and lens advice, and a look at the current migration position",
      "Optional stop at Lake Manyara or Tarangire on the drive-in route",
      "Cultural coffee-farm or Maasai boma visit near Arusha before departure",
    ],
    during: [
      "Seronera Valley — the resident lion, leopard and cheetah stronghold",
      "Moru Kopjes — black rhino territory and ancient Maasai rock paintings",
      "Southern plains (Ndutu) — calving season and lightning-fast cheetah hunts",
      "Grumeti and Mara River crossing points — the drama of the migration",
      "Sunrise hot-air balloon flight followed by a champagne bush breakfast",
      "Night in a mobile tented camp that moves with the herds",
    ],
    after: [
      "Descend into the Ngorongoro Crater for a big-five finale",
      "Olduvai Gorge museum — the cradle of humankind",
      "Return to Arusha for a farewell dinner and a curated photo hand-over",
      "Fly on to Zanzibar for a beach decompression, if you want a soft landing",
    ],
    hotels: [
      { name: "Four Seasons Safari Lodge Serengeti", note: "Luxury lodge on an active waterhole in Seronera" },
      { name: "Singita Sasakwa / Faru Faru", note: "Ultra-luxury, private Grumeti reserve" },
      { name: "Serengeti Migration Camp", note: "Classic tented camp overlooking the Grumeti River" },
      { name: "Nimali Central Serengeti", note: "Boutique tented, excellent value luxury" },
      { name: "Serengeti Kati Kati / Osupuko", note: "Mid-range mobile camps that follow the herds" },
    ],
    entertainment: [
      "Hot-air balloon safari at first light",
      "Sundowners on a kopje with the plains stretching to the horizon",
      "Bush dinner under the stars with Maasai singers",
      "Night game drives in the private concessions",
      "Guided photographic safaris with beanbag-fitted vehicles",
    ],
    culture: [
      "Maasai warriors and their pastoral cattle culture on the park edges",
      "Ikoma and Sukuma communities of the western corridor",
      "Olduvai Gorge and the Laetoli footprints — 3.6 million years of human story",
      "Traditional adumu jumping dance, beadwork and bomas visits",
    ],
    dayPlan: [
      "Arrive in Arusha, welcome briefing and overnight at a garden lodge",
      "Fly or drive into Central Serengeti, afternoon game drive in Seronera Valley",
      "Full-day Serengeti game drive with picnic lunch in the bush",
      "Sunrise hot-air balloon flight and bush breakfast, afternoon at leisure",
      "Migration tracking day — Ndutu, Grumeti or Kogatende, depending on season",
      "Moru Kopjes, rhino tracking and Maasai rock art",
      "Transfer to Ngorongoro, crater rim sundowners",
      "Ngorongoro Crater descent, then return to Arusha and departure",
    ],
    extraDays: [
      "Extra full day in the Serengeti — deep-plains exploration with a packed lunch",
      "Walking safari with an armed ranger in a private concession",
      "Photographic day dedicated to big cats around Seronera",
    ],
    minDays: 3,
    suggestedDays: 5,
  },

  "Ngorongoro Crater": {
    name: "Ngorongoro Crater",
    bookingValue: "Ngorongoro",
    tagline: "A living Eden inside a collapsed volcano",
    welcome:
      "Karibu Ngorongoro — a 260 km² caldera, 600 metres deep, holding around 25,000 large animals including the densest population of predators in Africa and Tanzania's most reliable black rhino sightings. A UNESCO World Heritage Site and a genuine one-day wonder.",
    bestTime:
      "Year-round. Jun–Oct is dry and crisp; Nov–May is green, quieter and superb for birding.",
    gettingThere:
      "3 hours by road from Arusha, or a short hop from Lake Manyara/Karatu airstrips. Most travellers combine it with the Serengeti.",
    before: [
      "Arusha arrival, briefing and a night at the foot of Mount Meru",
      "Scenic Rift Valley drive with a stop at Mto wa Mbu market",
      "Karatu coffee-estate tour and lunch on the crater highlands",
      "Crater rim sunset viewpoint before your descent day",
    ],
    during: [
      "Crater floor descent at dawn — lion prides, elephant bulls and black rhino",
      "Lake Magadi flamingo flats and the hippo pools at Ngoitokitok",
      "Lerai Fever Tree Forest for elephant and bushbuck",
      "Picnic lunch on the crater floor with kite-watching",
      "Empakaai and Olmoti crater hikes for the more active",
    ],
    after: [
      "Olduvai Gorge and the Shifting Sands en route to the Serengeti",
      "Maasai boma visit on the conservation area highlands",
      "Continue to the Serengeti, or return via Lake Manyara to Arusha",
    ],
    hotels: [
      { name: "&Beyond Ngorongoro Crater Lodge", note: "Iconic rim lodge, baroque-meets-Maasai interiors" },
      { name: "The Highlands by Asilia", note: "Dome suites on the Olmoti slopes" },
      { name: "Lemala Ngorongoro Camp", note: "Tented camp minutes from the descent road" },
      { name: "Gibbs Farm, Karatu", note: "Working coffee farm with farm-to-table dining" },
      { name: "Ngorongoro Serena Safari Lodge", note: "Comfortable rim lodge with panoramic views" },
    ],
    entertainment: [
      "Crater-rim sundowners above the clouds",
      "Coffee roasting and tasting on a Karatu estate",
      "Guided highland hikes with Maasai escorts",
      "Mountain biking through Karatu's farm villages",
      "Evening storytelling and dance around the fire",
    ],
    culture: [
      "Maasai pastoralists who legally live and graze inside the conservation area",
      "Iraqw (Mbulu) farming culture around Karatu",
      "Olduvai Gorge — Leakey excavations and early hominid history",
      "Mto wa Mbu, a village where over 120 Tanzanian tribes meet",
    ],
    dayPlan: [
      "Arusha arrival, briefing and overnight",
      "Drive via the Rift Valley to the crater highlands, rim sundowners",
      "Full-day crater floor safari with picnic lunch",
      "Empakaai crater hike or Maasai boma cultural morning",
      "Karatu coffee farm, then return to Arusha and departure",
    ],
    extraDays: [
      "Second crater descent for a different light and different sightings",
      "Day trip to Lake Manyara for tree-climbing lions",
      "Olmoti crater waterfall hike with a Maasai guide",
    ],
    minDays: 2,
    suggestedDays: 3,
  },

  "Mount Kilimanjaro": {
    name: "Mount Kilimanjaro",
    bookingValue: "Kilimanjaro",
    tagline: "The Roof of Africa — 5,895 metres, walkable",
    welcome:
      "Karibu Kilimanjaro — the highest free-standing mountain in the world and the highest point in Africa. No ropes, no technical climbing: just you, five climate zones and a well-paced team of guides, cooks and porters who have summited hundreds of times.",
    bestTime:
      "Jan–mid Mar and Jun–Oct for the clearest, driest conditions. Full-moon summits are unforgettable.",
    gettingThere:
      "Fly into Kilimanjaro International Airport (JRO); trailheads at Machame, Lemosho, Rongai and Marangu are 45 min – 4 hours away.",
    before: [
      "Arrival at Moshi or Arusha, gear check and full route briefing",
      "Medical and pulse-oximetry baseline with your lead guide",
      "Rental kit fitting — boots, duffel, down jacket, sleeping bag",
      "Optional acclimatisation day hike on Mount Meru or Materuni",
    ],
    during: [
      "Rainforest zone — colobus monkeys, ferns and cloud drift",
      "Shira Plateau and Lava Tower for the acclimatise-high-sleep-low rhythm",
      "Barranco Wall scramble — the most photographed section of the mountain",
      "Karanga and Barafu high camps",
      "Midnight summit push to Stella Point and Uhuru Peak at sunrise",
      "Descent through Mweka with the glaciers behind you",
    ],
    after: [
      "Summit certificate ceremony and crew tipping celebration",
      "Hot springs at Kikuletwa or Materuni waterfalls to loosen the legs",
      "Two-night safari extension in Tarangire or Ngorongoro",
      "Zanzibar beach recovery — the classic Kili reward",
    ],
    hotels: [
      { name: "Gran Meliá Arusha", note: "Five-star pre and post-climb base" },
      { name: "Kaliwa Lodge, Moshi", note: "Forest lodge at the foot of the mountain" },
      { name: "Weru Weru River Lodge", note: "Comfortable, quiet, pool for recovery" },
      { name: "Mountain camps", note: "Four-season tents, mess tent, private toilet tent" },
      { name: "Marangu Hotel", note: "Historic colonial-era climbing hotel" },
    ],
    entertainment: [
      "Nightly crew singing of the Kilimanjaro song at camp",
      "Astrophotography above the cloud layer",
      "Materuni waterfall and Chagga coffee-making experience",
      "Kikuletwa hot springs day",
      "Moshi town craft market and local brewery tour",
    ],
    culture: [
      "Chagga people of the mountain slopes — banana, coffee and tunnel history",
      "Traditional Chagga coffee roasting and mbege brewing",
      "Guide and porter culture — the Kilimanjaro Porters Assistance Project",
      "Swahili lessons on the trail: pole pole (slowly, slowly)",
    ],
    dayPlan: [
      "Arrive JRO, transfer to Moshi, gear check and route briefing",
      "Trailhead registration and first day through the rainforest zone",
      "Trek to Shira/Second Camp — moorland and giant heather",
      "Acclimatisation day: climb high to Lava Tower, sleep low at Barranco",
      "Barranco Wall to Karanga Camp",
      "Karanga to Barafu high camp, early dinner and rest",
      "Midnight summit push to Uhuru Peak, descend to Millennium Camp",
      "Final descent to Mweka Gate, certificate ceremony and hotel",
    ],
    extraDays: [
      "Extra acclimatisation day — significantly raises summit success",
      "Materuni waterfall and Chagga coffee cultural day",
      "Recovery day at the hot springs or by the pool",
    ],
    minDays: 6,
    suggestedDays: 8,
  },

  "Zanzibar Island": {
    name: "Zanzibar Island",
    bookingValue: "Zanzibar",
    tagline: "Spice Island — Stone Town, dhows and barefoot luxury",
    welcome:
      "Karibu Zanzibar — an Indian Ocean archipelago of turquoise shallows, coral reefs, 1,000-year-old Swahili trading history and beaches that make the perfect end to any safari. Stone Town's alleys smell of cloves; the east coast is pure white sand.",
    bestTime:
      "Jun–Oct and Dec–Feb are dry and sunny. Apr–May is the long rains and the quietest, cheapest season.",
    gettingThere:
      "Direct flights from Arusha, Serengeti airstrips and Dar es Salaam (20 min – 1h 30m), or the fast ferry from Dar es Salaam (2 hours).",
    before: [
      "Safari-to-sea flight from the Serengeti or Arusha",
      "Arrival at Abeid Amani Karume Airport and transfer to your coast",
      "Orientation walk and welcome dinner in Stone Town",
      "Choosing your coast: Nungwi/Kendwa for swimmable tides, Paje for kitesurfing, Matemwe for reefs",
    ],
    during: [
      "Stone Town: House of Wonders, Old Fort, Freddie Mercury House, the former slave market memorial",
      "Spice farm tour — cloves, nutmeg, vanilla and cinnamon straight off the tree",
      "Jozani Forest for the endemic red colobus monkey",
      "Mnemba Atoll snorkelling and diving",
      "The Rock Restaurant and sunset dhow cruise",
      "Sandbank picnic and Kizimkazi dolphin encounter",
      "Prison Island giant tortoises",
    ],
    after: [
      "Sunset at Forodhani Gardens night food market",
      "Pemba or Mafia Island extension for whale sharks and remote reefs",
      "Return flight to Dar es Salaam or direct international departure from ZNZ",
    ],
    hotels: [
      { name: "Zuri Zanzibar", note: "Design-led resort on Kendwa Beach" },
      { name: "The Residence Zanzibar", note: "Private-pool villas on the quiet south-west" },
      { name: "Baraza Resort & Spa", note: "Swahili-Arabic architecture, all inclusive" },
      { name: "Emerson Spice, Stone Town", note: "Boutique heritage house with a rooftop restaurant" },
      { name: "Matemwe Lodge", note: "Barefoot luxury facing Mnemba Atoll" },
    ],
    entertainment: [
      "Sunset dhow sailing with Swahili acoustic music",
      "Kitesurfing and diving schools at Paje and Nungwi",
      "Taarab and ngoma live music evenings",
      "Forodhani night market — Zanzibar pizza and sugarcane juice",
      "Spa treatments with local coconut and clove oils",
    ],
    culture: [
      "Swahili coastal civilisation, Omani and Persian trading heritage",
      "Stone Town UNESCO World Heritage architecture and carved doors",
      "Taarab music, the island's signature orchestral sound",
      "Respectful dress and Ramadan etiquette in the villages",
      "Seaweed farming and the women's cooperatives of the east coast",
    ],
    dayPlan: [
      "Fly to Zanzibar, transfer and sunset at your beach resort",
      "Stone Town heritage walking tour and spice farm afternoon",
      "Mnemba Atoll snorkelling and sandbank picnic",
      "Beach day at leisure with optional spa or kitesurf lesson",
      "Jozani Forest red colobus and Kizimkazi dolphins",
      "Sunset dhow cruise and farewell seafood dinner, departure next morning",
    ],
    extraDays: [
      "Extra full beach day — nothing scheduled but the tide",
      "Diving day with two guided reef dives",
      "Day trip to Prison Island and Nakupenda sandbank",
    ],
    minDays: 3,
    suggestedDays: 5,
  },

  "Tarangire National Park": {
    name: "Tarangire National Park",
    bookingValue: "Tarangire",
    tagline: "Giant baobabs and Tanzania's greatest elephant herds",
    welcome:
      "Karibu Tarangire — 2,850 km² of baobab-studded valley along a river that never dries. In the dry season it holds the biggest elephant concentrations in northern Tanzania, plus tree-climbing pythons, huge buffalo herds and over 550 bird species.",
    bestTime:
      "Jun–Oct is peak, when animals crowd the Tarangire River. Nov–May is green, dramatic and excellent for birds.",
    gettingThere:
      "2 hours by road from Arusha — usually the first stop on the Northern Circuit — or a short flight to Kuro airstrip.",
    before: [
      "Arusha arrival, briefing and overnight",
      "Mto wa Mbu or Maasai market stop on the drive south",
      "Park gate formalities and baobab-lined entry drive",
    ],
    during: [
      "Tarangire River circuit — elephants digging for water in the sand",
      "Silale Swamp for buffalo, lion and huge python sightings",
      "Baobab groves and the classic Tanzanian photographic landscape",
      "Walking safari and night drive in the neighbouring conservancies",
      "Birding for yellow-collared lovebird and ashy starling, both endemics",
    ],
    after: [
      "Continue to Lake Manyara or Ngorongoro on the Northern Circuit",
      "Maasai and Barabaig cultural visit on the park's eastern boundary",
      "Return to Arusha for onward flights",
    ],
    hotels: [
      { name: "Chem Chem Lodge", note: "Ultra-luxury between Tarangire and Manyara" },
      { name: "Tarangire Treetops", note: "Stilted rooms in a baobab and marula canopy" },
      { name: "Little Oliver's Camp", note: "Classic tented camp with walking safaris" },
      { name: "Sanctuary Swala", note: "Remote camp beside a private waterhole" },
      { name: "Maramboi Tented Lodge", note: "Great value, on the Manyara floodplain" },
    ],
    entertainment: [
      "Guided walking safaris in private conservancies",
      "Night game drives for genet, civet and leopard",
      "Baobab sundowners and bush dinners",
      "Birdwatching mornings with a specialist guide",
      "Maasai fire-making and beadwork demonstrations",
    ],
    culture: [
      "Maasai communities on the eastern conservancies",
      "Barabaig pastoralists of the Manyara plains",
      "Mto wa Mbu village banana-beer and art tour",
      "Local Swahili cooking classes at lodge level",
    ],
    dayPlan: [
      "Arusha arrival, briefing and overnight",
      "Drive to Tarangire, afternoon river-circuit game drive",
      "Full-day Tarangire safari with picnic lunch at Silale Swamp",
      "Walking safari at dawn, cultural boma visit in the afternoon",
      "Onward to Lake Manyara / Ngorongoro or return to Arusha",
    ],
    extraDays: [
      "Additional full game-drive day exploring the southern swamps",
      "Night drive and bush dinner in a private conservancy",
      "Birding-focused morning with a specialist guide",
    ],
    minDays: 2,
    suggestedDays: 3,
  },

  "Lake Manyara": {
    name: "Lake Manyara",
    bookingValue: "Lake Manyara",
    tagline: "Tree-climbing lions beneath the Rift Valley escarpment",
    welcome:
      "Karibu Lake Manyara — a compact, ridiculously scenic park where a groundwater forest meets an alkaline soda lake. Famous for tree-climbing lions, huge baboon troops, flamingo flocks and a canopy walkway through fig and mahogany.",
    bestTime:
      "Jun–Oct for game viewing and Nov–Jun for flamingos and birdlife. Great as a half-day or full-day park.",
    gettingThere:
      "1.5–2 hours by road from Arusha, right on the way to Ngorongoro and the Serengeti.",
    before: [
      "Arusha arrival and Northern Circuit briefing",
      "Mto wa Mbu cultural village and market visit at the park gate",
      "Rift Valley escarpment viewpoint photo stop",
    ],
    during: [
      "Groundwater forest drive with blue monkeys and baboon troops",
      "Hippo pool and the lake shore flamingo flats",
      "Tree-climbing lions in the acacia woodland",
      "Canopy treetop walkway, 18 metres above the forest floor",
      "Maji Moto hot springs at the southern end of the lake",
      "Night drive — one of the few Tanzanian parks that allows it",
    ],
    after: [
      "Climb the escarpment to Karatu and the Ngorongoro highlands",
      "Continue to the Serengeti, or loop back to Arusha",
      "Canoeing or cycling on the lake edge when water levels allow",
    ],
    hotels: [
      { name: "Lake Manyara Serena Safari Lodge", note: "Escarpment-top views over the lake" },
      { name: "Escarpment Luxury Lodge", note: "Cliff-edge suites with infinity pool" },
      { name: "Lake Manyara Tree Lodge (&Beyond)", note: "Stilted treehouses inside the park" },
      { name: "Manyara's Secret", note: "Boutique lodge with panoramic Rift views" },
      { name: "Kirurumu Manyara Lodge", note: "Tented, eco-conscious and well priced" },
    ],
    entertainment: [
      "Treetop canopy walkway",
      "Night game drives and spotlighting",
      "Cycling and canoe safaris around Mto wa Mbu",
      "Hot springs bathing at Maji Moto",
      "Sundowners on the escarpment edge",
    ],
    culture: [
      "Mto wa Mbu — a village where more than 120 tribes live together",
      "Banana plantation and local banana-beer tasting",
      "Makonde wood carving and Tinga Tinga painting workshops",
      "Maasai and Chagga community projects supported by lodge levies",
    ],
    dayPlan: [
      "Arusha arrival, briefing and overnight",
      "Drive to Lake Manyara, afternoon forest and lakeshore game drive",
      "Full day: canopy walkway, hot springs and tree-climbing lion search",
      "Mto wa Mbu cultural morning, then onward to Ngorongoro or Arusha",
    ],
    extraDays: [
      "Extra game-drive day including a guided night drive",
      "Cycling and canoe safari day around the lake villages",
      "Cultural and craft workshop day in Mto wa Mbu",
    ],
    minDays: 1,
    suggestedDays: 3,
  },
};

/** Build a day-by-day plan for the chosen number of days. */
export function buildItinerary(detail: DestinationDetail, days: number): string[] {
  const core = detail.dayPlan;
  if (days <= 0) return [];
  if (days <= core.length) {
    // Keep the first day and the final day, trim the middle.
    if (days === 1) return [core[0]];
    const middle = core.slice(1, core.length - 1).slice(0, days - 2);
    return [core[0], ...middle, core[core.length - 1]];
  }
  const extra: string[] = [];
  for (let i = 0; i < days - core.length; i++) {
    extra.push(detail.extraDays[i % detail.extraDays.length]);
  }
  return [...core.slice(0, core.length - 1), ...extra, core[core.length - 1]];
}
