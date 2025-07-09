let listings = [
  {
    id: 1,
    title: "Toyota Camry 2022",
    location: "San Francisco, CA",
    price: 89,
    category: "sedan",
    status: "pending",
    submittedBy: "john.doe@example.com",
    submittedAt: "2024-01-15T10:30:00Z",
    views: 24,
    description: "Reliable sedan with great fuel economy"
  },
  {
    id: 2,
    title: "BMW X5 2023",
    location: "Los Angeles, CA",
    price: 150,
    category: "luxury",
    status: "approved",
    submittedBy: "jane.smith@example.com",
    submittedAt: "2024-01-14T14:20:00Z",
    views: 45,
    description: "Luxury SUV with premium features"
  },
  {
    id: 3,
    title: "Honda Civic 2021",
    location: "New York, NY",
    price: 65,
    category: "economy",
    status: "rejected",
    submittedBy: "mike.johnson@example.com",
    submittedAt: "2024-01-13T09:15:00Z",
    views: 12,
    description: "Compact car perfect for city driving"
  },
  {
    id: 4,
    title: "Tesla Model 3 2023",
    location: "Austin, TX",
    price: 120,
    category: "sports",
    status: "pending",
    submittedBy: "sarah.wilson@example.com",
    submittedAt: "2024-01-16T16:45:00Z",
    views: 67,
    description: "Electric sports sedan with autopilot"
  },
  {
    id: 5,
    title: "Ford F-150 2022",
    location: "Denver, CO",
    price: 95,
    category: "suv",
    status: "approved",
    submittedBy: "tom.brown@example.com",
    submittedAt: "2024-01-12T11:30:00Z",
    views: 38,
    description: "Powerful pickup truck for heavy duty"
  },
  {
    id: 6,
    title: "Chevrolet Malibu 2020",
    location: "Chicago, IL",
    price: 70,
    category: "sedan",
    status: "approved",
    submittedBy: "alice.morgan@example.com",
    submittedAt: "2024-01-10T08:50:00Z",
    views: 29,
    description: "Smooth ride and great mileage"
  },
  {
    id: 7,
    title: "Audi A4 2022",
    location: "Seattle, WA",
    price: 135,
    category: "luxury",
    status: "pending",
    submittedBy: "david.lee@example.com",
    submittedAt: "2024-01-11T13:00:00Z",
    views: 55,
    description: "Elegant design with tech upgrades"
  },
  {
    id: 8,
    title: "Jeep Wrangler 2021",
    location: "Phoenix, AZ",
    price: 110,
    category: "suv",
    status: "approved",
    submittedBy: "emma.white@example.com",
    submittedAt: "2024-01-09T17:30:00Z",
    views: 41,
    description: "Off-road capable and adventurous"
  },
  {
    id: 9,
    title: "Hyundai Elantra 2020",
    location: "Miami, FL",
    price: 60,
    category: "economy",
    status: "rejected",
    submittedBy: "noah.green@example.com",
    submittedAt: "2024-01-08T12:15:00Z",
    views: 19,
    description: "Affordable and fuel efficient"
  },
  {
    id: 10,
    title: "Lexus RX 350 2022",
    location: "Portland, OR",
    price: 140,
    category: "luxury",
    status: "approved",
    submittedBy: "olivia.martin@example.com",
    submittedAt: "2024-01-07T09:00:00Z",
    views: 48,
    description: "Comfortable luxury SUV with space"
  },
  {
    id: 11,
    title: "Subaru Outback 2021",
    location: "Salt Lake City, UT",
    price: 85,
    category: "suv",
    status: "pending",
    submittedBy: "liam.walker@example.com",
    submittedAt: "2024-01-06T11:45:00Z",
    views: 22,
    description: "Perfect for snowy conditions"
  },
  {
    id: 12,
    title: "Mercedes-Benz C-Class 2022",
    location: "Boston, MA",
    price: 160,
    category: "luxury",
    status: "approved",
    submittedBy: "sophia.hall@example.com",
    submittedAt: "2024-01-05T15:30:00Z",
    views: 62,
    description: "Smooth performance and luxury feel"
  },
  {
    id: 13,
    title: "Nissan Altima 2019",
    location: "Atlanta, GA",
    price: 55,
    category: "economy",
    status: "rejected",
    submittedBy: "jacob.adams@example.com",
    submittedAt: "2024-01-04T14:10:00Z",
    views: 13,
    description: "Reliable option for daily commute"
  },
  {
    id: 14,
    title: "Kia Sportage 2021",
    location: "Orlando, FL",
    price: 78,
    category: "suv",
    status: "pending",
    submittedBy: "mia.morris@example.com",
    submittedAt: "2024-01-03T18:00:00Z",
    views: 27,
    description: "Compact SUV with good features"
  },
  {
    id: 15,
    title: "Mazda 3 2020",
    location: "Las Vegas, NV",
    price: 68,
    category: "sedan",
    status: "approved",
    submittedBy: "logan.wright@example.com",
    submittedAt: "2024-01-02T10:30:00Z",
    views: 35,
    description: "Stylish compact car"
  },
  {
    id: 16,
    title: "Dodge Charger 2021",
    location: "Dallas, TX",
    price: 105,
    category: "sports",
    status: "rejected",
    submittedBy: "ella.scott@example.com",
    submittedAt: "2024-01-01T16:20:00Z",
    views: 44,
    description: "Powerful performance car"
  },
  {
    id: 17,
    title: "Volkswagen Jetta 2019",
    location: "Charlotte, NC",
    price: 58,
    category: "economy",
    status: "approved",
    submittedBy: "lucas.harris@example.com",
    submittedAt: "2023-12-31T09:00:00Z",
    views: 21,
    description: "Simple and comfortable ride"
  },
  {
    id: 18,
    title: "Range Rover Evoque 2023",
    location: "San Diego, CA",
    price: 170,
    category: "luxury",
    status: "pending",
    submittedBy: "avery.mitchell@example.com",
    submittedAt: "2023-12-30T14:40:00Z",
    views: 52,
    description: "Premium off-road experience"
  },
  {
    id: 19,
    title: "Chrysler Pacifica 2021",
    location: "Philadelphia, PA",
    price: 90,
    category: "suv",
    status: "approved",
    submittedBy: "harper.evans@example.com",
    submittedAt: "2023-12-29T12:10:00Z",
    views: 30,
    description: "Family minivan with ample space"
  },
  {
    id: 20,
    title: "Porsche 911 Carrera 2022",
    location: "Beverly Hills, CA",
    price: 250,
    category: "sports",
    status: "approved",
    submittedBy: "ethan.carter@example.com",
    submittedAt: "2023-12-28T11:00:00Z",
    views: 89,
    description: "High-performance luxury sports car"
  }
];


export const getListings = () => listings;

export const updateListingStatus = (id, status) => {
  const index = listings.findIndex(l => l.id === parseInt(id));
  if (index !== -1) {
    listings[index].status = status;
    return listings[index];
  }
  return null;
};

export const updateListing = (id, updates) => {
  const index = listings.findIndex(l => l.id === parseInt(id));
  if (index !== -1) {
    listings[index] = { ...listings[index], ...updates };
    return listings[index];
  }
  return null;
};

export const getListingById = (id) => {
  return listings.find(l => l.id === parseInt(id));
};