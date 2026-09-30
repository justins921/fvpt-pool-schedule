// Clinic facts used across the site. Change them here, not in individual pages.

export const SITE = {
  name: "Fox Valley Physical Therapy & Wellness Clinic",
  shortName: "Fox Valley Physical Therapy",
  url: "https://www.foxvalleyphysicaltherapy.com",
  phone: "(920) 235-8966",
  phoneHref: "tel:+19202358966",
  fax: "(920) 235-1526",
  email: "admin@foxvalleyphysicaltherapy.com",
  address: {
    street: "909 S Washburn Street",
    city: "Oshkosh",
    state: "WI",
    zip: "54904",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Fox+Valley+Physical+Therapy+909+S+Washburn+St+Oshkosh+WI+54904",
  mapsEmbed: "https://www.google.com/maps?q=909+S+Washburn+St,+Oshkosh,+WI+54904&output=embed",
  founded: 1990,
  // TODO: confirm with the clinic. Taken from third-party listings, not the old website.
  hours: [
    { days: "Monday – Thursday", time: "8:00 am – 5:30 pm", schema: ["Mo", "Tu", "We", "Th"], opens: "08:00", closes: "17:30" },
    { days: "Friday", time: "8:00 am – 1:00 pm", schema: ["Fr"], opens: "08:00", closes: "13:00" },
    { days: "Saturday – Sunday", time: "Closed", schema: [], opens: "", closes: "" },
  ],
  intakeForm: "/docs/patient-intake-form.pdf",
};

export const POOL = {
  // Set this to the Practice Perfect Client Portal link once online booking is turned on.
  // While it's empty, the site tells people to call to book.
  bookingUrl: "",
  // TODO: confirm. Paula: "if they come 2x a week they pay $35."
  monthlyPrice: "$35",
  visitsPerWeek: 2,
  lastStart: "4:00 pm",
  outBy: "5:00 pm",
};

export const fullAddress = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`;
