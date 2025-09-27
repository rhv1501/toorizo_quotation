import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Link,
} from "@react-pdf/renderer";
import { QuotationData } from "../../types";
import { format } from "date-fns";
import { hotels } from "../../data/hotels";

// Register fonts
Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: 600,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf",
      fontWeight: 700,
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-italic.ttf",
      fontStyle: "italic",
    },
  ],
});

// Register Noto Sans for rupee symbol
Font.register({
  family: "Noto Sans",
  src: "https://fonts.gstatic.com/s/notosans/v27/o-0IIpQlx3QUlC5A4PNb4g.ttf",
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Open Sans",
    padding: 30,
    backgroundColor: "#fff",
    maxHeight: "842pt", // A4 height
    maxWidth: "595pt", // A4 width
  },
  contentPage: {
    padding: 30,
    backgroundColor: "#fff",
  },
  coverPage: {
    position: "relative",
    height: "842pt",
    width: "595pt",
    overflow: "hidden",
  },
  posterImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    objectFit: "cover",
  },
  infoTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 20,
  },
  tableHeader: {
    backgroundColor: "#F3F4F6",
    padding: 8,
    fontSize: 8,
    fontWeight: 700,
    borderBottom: "1px solid #E5E7EB",
    fontFamily: "Open Sans",
  },
  tableCell: {
    padding: 8,
    fontSize: 8,
    borderBottom: "1px solid #E5E7EB",
  },
  costingTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 8,
    color: "#0D9488",
    paddingBottom: 4,
    borderBottom: "1px solid #E5E7EB",
    fontFamily: "Open Sans",
  },
  subsection: {
    marginBottom: 8,
  },
  subsectionTitle: {
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 4,
    color: "#1F2937",
    fontFamily: "Open Sans",
  },
  bulletList: {
    marginLeft: 12,
  },
  bulletItem: {
    fontSize: 8,
    marginBottom: 4,
    flexDirection: "row",
    fontFamily: "Open Sans",
  },
  bulletPoint: {
    width: 8,
    fontSize: 8,
    fontFamily: "Open Sans",
  },
  bulletText: {
    flex: 1,
    fontSize: 8,
    fontFamily: "Open Sans",
  },
  itineraryDay: {
    marginBottom: 12,
  },
  locationTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#0D9488",
    marginBottom: 8,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontFamily: "Open Sans",
  },
  itineraryDayTitle: {
    fontSize: 9,
    fontWeight: 600,
    marginBottom: 4,
    backgroundColor: "#F3F4F6",
    padding: 4,
    borderRadius: 3,
    fontFamily: "Open Sans",
  },
  itineraryDayActivities: {
    marginLeft: 12,
  },
  costingRow: {
    flexDirection: "row",
    borderBottom: "1px solid #E5E7EB",
  },
  costingHeader: {
    backgroundColor: "#F3F4F6",
    fontWeight: 600,
    fontFamily: "Open Sans",
  },
  costingCell: {
    padding: 8,
    fontSize: 8,
    borderRight: "1px solid #E5E7EB",
    flex: 1,
    fontFamily: "Open Sans",
  },
  costingLastCell: {
    padding: 8,
    fontSize: 8,
    flex: 1,
    fontFamily: "Open Sans",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 7,
    color: "#6B7280",
    textAlign: "center",
    paddingTop: 8,
    borderTop: "1px solid #E5E7EB",
  },
  travelGuidelines: {
    fontSize: 8,
    lineHeight: 1.5,
    fontFamily: "Open Sans",
  },
  notesText: {
    fontSize: 7,
    fontStyle: "italic",
    color: "#6B7280",
    marginTop: 4,
    fontFamily: "Open Sans",
  },
  companyInfo: {
    fontSize: 7,
    textAlign: "center",
    color: "#374151",
    fontFamily: "Open Sans",
  },
  pageNumber: {
    position: "absolute",
    bottom: 30,
    right: 30,
    fontSize: 7,
    color: "#6B7280",
    fontFamily: "Open Sans",
  },
  finalCostRupee: {
    fontFamily: "Noto Sans",
    fontSize: 13,
    fontWeight: 700,
    padding: 4,
  },
});

// Update PDFLogoFooter to top right and only render on non-cover pages
const PDFLogoFooter = ({ logoSrc }: { logoSrc: string }) => (
  <View
    style={{ position: "absolute", right: 20, top: 20, width: 80, height: 40 }}
    fixed
  >
    <Image src={logoSrc} style={{ width: 80, height: 40, opacity: 0.7 }} />
  </View>
);

// Utility to optimize images (resize/compress) in browser
function useOptimizedImage(
  url: string,
  maxWidth = 400,
  maxHeight = 300,
  quality = 0.4
): string {
  const [optimized, setOptimized] = React.useState(url);
  React.useEffect(() => {
    let isMounted = true;
    async function optimize() {
      if (!url) {
        setOptimized(url);
        return;
      }
      try {
        // Handle both relative and absolute URLs
        const imageSrc = url.startsWith('http') ? url : url;
        const img = new window.Image();
        img.crossOrigin = "Anonymous";
        img.src = imageSrc;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });
        const canvas = document.createElement("canvas");
        let { width, height } = img;
        // Always resize to reduce file size
        const scale = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          // Use better image rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          if (isMounted) setOptimized(dataUrl);
        } else {
          if (isMounted) setOptimized(url);
        }
      } catch {
        if (isMounted) setOptimized(url);
      }
    }
    optimize();
    return () => {
      isMounted = false;
    };
  }, [url, maxWidth, maxHeight, quality]);
  return optimized;
}

const PDFDocument: React.FC<{ data: QuotationData }> = ({ data }) => {
  // Group itinerary days by location property
  const daysByLocation = data.itinerary.reduce((acc, day) => {
    if (!day.location) return acc;
    if (!acc[day.location]) acc[day.location] = [];
    acc[day.location].push(day);
    return acc;
  }, {} as Record<string, typeof data.itinerary>);

  // Get all selected locations from itinerary
  const selectedLocations = Array.from(
    new Set(data.itinerary.map((d: any) => d.location))
  );

  // Helper function to get location-specific date range
  const getLocationDateRange = (location: string): string => {
    const locationDetails =
      data.hotelCostingDetails?.locationDetails?.[location];
    if (locationDetails?.checkInDate && locationDetails?.checkOutDate) {
      const checkIn = format(new Date(locationDetails.checkInDate), "MMM d");
      const checkOut = format(new Date(locationDetails.checkOutDate), "MMM d");
      return `${checkIn} - ${checkOut}`;
    }
    // Fallback to original dates if no location-specific dates
    const checkIn = data.clientDetails.checkInDate
      ? format(new Date(data.clientDetails.checkInDate), "MMM d")
      : "";
    const checkOut = data.clientDetails.checkOutDate
      ? format(new Date(data.clientDetails.checkOutDate), "MMM d")
      : "";
    return `${checkIn} - ${checkOut}`;
  };

  // Helper function to get overall date range from all locations
  const getOverallDateRange = (): string => {
    const uniqueLocations = Array.from(
      new Set(data.itinerary.map((d: any) => d.location))
    );

    if (data.hotelCostingDetails?.locationDetails) {
      let earliestCheckIn: Date | null = null;
      let latestCheckOut: Date | null = null;

      uniqueLocations.forEach((location) => {
        const locationDetails =
          data.hotelCostingDetails?.locationDetails?.[location];
        if (locationDetails?.checkInDate && locationDetails?.checkOutDate) {
          const checkIn = new Date(locationDetails.checkInDate);
          const checkOut = new Date(locationDetails.checkOutDate);

          if (!earliestCheckIn || checkIn < earliestCheckIn) {
            earliestCheckIn = checkIn;
          }
          if (!latestCheckOut || checkOut > latestCheckOut) {
            latestCheckOut = checkOut;
          }
        }
      });

      if (earliestCheckIn && latestCheckOut) {
        return `${format(earliestCheckIn, "MMM d")} - ${format(
          latestCheckOut,
          "MMM d"
        )}`;
      }
    }

    // Fallback to original dates
    const checkIn = data.clientDetails.checkInDate
      ? format(new Date(data.clientDetails.checkInDate), "MMM d")
      : "";
    const checkOut = data.clientDetails.checkOutDate
      ? format(new Date(data.clientDetails.checkOutDate), "MMM d")
      : "";
    return `${checkIn} - ${checkOut}`;
  };

  // Ooty images mapping (day number is 1-based) - using custom uploaded images
  const ootyImages = [
    ["/images/ooty/day1.jpg", "/images/ooty/day1-2.jpg"],
    ["/images/ooty/day2.jpg", "/images/ooty/day2-2.jpg"],
    ["/images/ooty/day3.jpg", "/images/ooty/day3-2.jpg"],
    ["/images/ooty/day4.jpg", "/images/ooty/day4-2.jpg"],
  ];

  // Coorg images mapping (day number is 1-based) - using custom uploaded images
  const coorgImages = [
    ["/images/coorg/day1.jpg", "/images/coorg/day1-2.jpg"],
    ["/images/coorg/day2.jpg", "/images/coorg/day2-2.jpg"],
    ["/images/coorg/day3.jpg", "/images/coorg/day3-2.jpg"],
    ["/images/coorg/day4.jpg", "/images/coorg/day4-2.jpg"],
  ];

  // Chikmagalur images mapping (day number is 1-based) - using user uploaded images
  // Note: Files are JPG in public/images/chikmagalur
  const chikmagalurImages = [
    ["/images/chikmagalur/chik1.jpg", "/images/chikmagalur/chik2.jpg"],
    ["/images/chikmagalur/chik3.jpg", "/images/chikmagalur/chik4.jpg"],
    ["", ""],
    ["", ""],
  ];

  // Kodaikanal images mapping (day number is 1-based) - using user uploaded images
  // Note: Files are in public/images/kodaikanal
  const kodaikanalImages = [
    ["/images/kodaikanal/day1.jpg", "/images/kodaikanal/day1-2.jpg"],
    ["/images/kodaikanal/day2.jpg", "/images/kodaikanal/day2-2.jpg"],
    ["", ""],
    ["", ""],
  ];

  // Wayanad images mapping (day number is 1-based) - using user uploaded images
  // Day 1 -> way1.jpg, way2.jpg; Day 2 -> way3.jpg, way4.jpg
  // Files located at public/images/wayanad
  const wayanadImages = [
    ["/images/wayanad/way1.jpg", "/images/wayanad/way2.jpg"],
    ["/images/wayanad/way3.jpg", "/images/wayanad/way4.jpg"],
    ["", ""],
    ["", ""],
  ];

  // 1. Add a utility to check if only Coorg is selected
  const isCoorgAlone =
    selectedLocations.length === 1 &&
    selectedLocations[0]?.toLowerCase() === "coorg";

  // Determine cover image based on itinerary selection
  const selectedLocationsLower = selectedLocations.map(
    (l) => (l || "").toLowerCase()
  );
  const coverByLocation: Record<string, string> = {
    wayanad: "/images/waya1.jpg",
    coorg: "/images/coorg.jpg",
    chikmagalur: "/images/chik1.jpg",
    kodaikanal: "/images/kodai1.jpg",
  };
  let coverImageSrc = "/images/page1.jpg"; // default
  for (const loc of selectedLocationsLower) {
    if (coverByLocation[loc]) {
      coverImageSrc = coverByLocation[loc];
      break; // use the first matched location in itinerary order
    }
  }

  // Optimize all images used in the PDF
  const optimizedCoverImage = useOptimizedImage(coverImageSrc, 600, 800, 0.5);
  const optimizedLogo = useOptimizedImage("/logo.png", 80, 40, 0.6);
  const optimizedTelescope = useOptimizedImage("/telescope.png", 60, 60, 0.4);
  const optimizedLocation = useOptimizedImage("/location.png", 60, 60, 0.4);
  const optimizedFood = useOptimizedImage("/food.png", 60, 60, 0.4);
  const optimizedStays = useOptimizedImage("/stays.png", 60, 60, 0.4);
  const optimizedSupport = useOptimizedImage("/support.png", 60, 60, 0.4);
  const optimizedBank = useOptimizedImage("/bank.png", 60, 60, 0.4);
  const optimizedContact = useOptimizedImage("/contact.png", 60, 60, 0.4);
  const optimizedBag = useOptimizedImage("/bag.png", 60, 60, 0.4);
  const optimizedRetention = useOptimizedImage("/retention.png", 60, 60, 0.4);
  const optimizedInstagram = useOptimizedImage("/instagram.png", 40, 40, 0.5);
  const optimizedFacebook = useOptimizedImage("/facebook.png", 40, 40, 0.5);
  const optimizedYoutube = useOptimizedImage("/youtube.png", 40, 40, 0.5);



  const getFinalCostString = (finalCostData: any, pkg: any) => {
    let amount = 0;

    // First try to get from finalCostingDetails
    if (
      typeof finalCostData === "object" &&
      finalCostData &&
      typeof finalCostData.totalCost === "number" &&
      finalCostData.totalCost > 0
    ) {
      amount = finalCostData.totalCost;
    }
    // Then try to get from costingDetails as fallback
    else if (pkg && typeof pkg.finalCost === "number" && pkg.finalCost > 0) {
      amount = pkg.finalCost;
    }
    // Final fallback calculation
    else if (pkg) {
      const hotelCost = pkg.hotelCost || 0;
      const travelCost = pkg.travelCost || 0;
      const travelCostWithMargin = Math.round(travelCost * 1.15);
      const profitMargin = pkg.profitMargin || 0;
      const discount = pkg.discount || 0;
      amount = hotelCost + travelCostWithMargin + profitMargin - discount;
    }

    return `₹${amount.toLocaleString()}`;
  };

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={styles.coverPage}>
        <Image src={optimizedCoverImage} style={styles.posterImage} />
      </Page>

      {/* Company Info Page */}
      <Page
        size="A4"
        style={{
          backgroundColor: isCoorgAlone ? "#CAE1CC" : "#f6ecd9",
          padding: 32,
        }}
      >
        <View style={{ flexDirection: "column", height: "100%" }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#0D9488",
              marginBottom: 0,
              fontFamily: "Open Sans",
            }}
          >
            Welcome to{" "}
            <Text
              style={{
                fontWeight: 700,
                color: "#222",
                fontFamily: "Open Sans",
                fontSize: 20,
              }}
            >
              Toorizo
            </Text>
            , where your
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "#0D9488",
              marginBottom: 10,
              fontFamily: "Open Sans",
            }}
          >
            travel dreams take flight.
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#222",
              marginBottom: 14,
              fontFamily: "Open Sans",
            }}
          >
            We specialize in crafting personalized getaways that inspire and
            delight. With a passion for exploration and a focus on hassle-free
            planning, we ensure every journey is smooth, memorable, and uniquely
            yours. Wander More. Worry Less.
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#222",
              marginBottom: 16,
              fontFamily: "Open Sans",
            }}
          >
            At{" "}
            <Text
              style={{
                fontWeight: 700,
                color: "#0D9488",
                fontFamily: "Open Sans",
                fontSize: 12,
              }}
            >
              Toorizo
            </Text>
            , we believe that travel is more than just visiting new places; it's
            about creating lasting memories and meaningful connections. Our
            journey began with a simple vision: to provide exceptional travel
            experiences that our clients would cherish forever. Today, we stand
            as a testament to that vision, having built a reputation for
            excellence and reliability in the travel industry.
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#222",
              marginBottom: 8,
              fontFamily: "Open Sans",
            }}
          >
            <Text
              style={{
                fontWeight: 700,
                color: "#0D9488",
                fontFamily: "Open Sans",
                fontSize: 12,
              }}
            >
              Exceptional Retention Rate:
            </Text>{" "}
            Our customers are our top priority, and their loyalty speaks
            volumes. With a remarkable retention rate, we pride ourselves on
            building long-lasting relationships and delivering consistently
            outstanding service that keeps our clients coming back for more
            adventures.
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#222",
              marginBottom: 8,
              fontFamily: "Open Sans",
            }}
          >
            <Text
              style={{ fontWeight: 700, fontFamily: "Open Sans", fontSize: 12 }}
            >
              Outstanding Google Reviews:
            </Text>{" "}
            Don't just take our word for it—our glowing Google reviews reflect
            the satisfaction and joy of our travelers. We are proud of the
            positive feedback we receive, which fuels our dedication to
            maintaining high standards in every aspect of our service.
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#222",
              marginBottom: 8,
              fontFamily: "Open Sans",
            }}
          >
            <Text
              style={{ fontWeight: 700, fontFamily: "Open Sans", fontSize: 12 }}
            >
              Unmatched Customer Support:
            </Text>{" "}
            We understand that travel plans don't adhere to a 9-to-5 schedule.
            That's why our customer support team is available from 8 AM to 11:45
            PM, ready to assist you with any inquiries, changes, or emergencies.
            Your peace of mind is our priority, and we're here to ensure your
            journey is smooth and enjoyable.
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#222",
              marginBottom: 16,
              fontFamily: "Open Sans",
            }}
          >
            <Text
              style={{ fontWeight: 700, fontFamily: "Open Sans", fontSize: 12 }}
            >
              Handpicked Stays and Partners:
            </Text>{" "}
            Quality is our priority. We meticulously select the best
            accommodations and vendors to ensure your stay is as comfortable and
            enjoyable as possible. From luxurious resorts to experienced guides,
            every detail is carefully chosen to enhance your travel experience.
          </Text>
          {/* Feature Icons Row */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 16,
              marginBottom: 12,
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              {/* Retention Rate Icon/Stat */}
              <Image
                src={optimizedRetention}
                style={{ width: 60, height: 60, marginBottom: 6 }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: "#222",
                  fontWeight: 700,
                  fontFamily: "Open Sans",
                }}
              >
                Retention Rate
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              {/* Support Icon */}
              <Image
                src={optimizedSupport}
                style={{ width: 60, height: 60, marginBottom: 6 }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: "#222",
                  fontWeight: 700,
                  fontFamily: "Open Sans",
                }}
              >
                8:00 AM - 11:45 PM Support
              </Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              {/* Handpicked Stays Icon */}
              <Image
                src={optimizedStays}
                style={{ width: 60, height: 60, marginBottom: 6 }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: "#222",
                  fontWeight: 700,
                  fontFamily: "Open Sans",
                }}
              >
                Handpicked Stays & Vendors
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 10,
              color: "#222",
              marginTop: 20,
              fontFamily: "Open Sans",
            }}
          >
            Embark on your next adventure with{" "}
            <Text
              style={{
                fontWeight: 700,
                color: "#0D9488",
                fontFamily: "Open Sans",
                fontSize: 10,
              }}
            >
              Toorizo
            </Text>
            , where exceptional service and unforgettable memories await. Let us
            be your trusted partner in exploring the world, one incredible
            journey at a time.
          </Text>
        </View>
        <PDFLogoFooter logoSrc={optimizedLogo} />
      </Page>

      {/* Customer & Executive Info Page */}
      <Page
        size="A4"
        style={{
          backgroundColor: isCoorgAlone ? "#CAE1CC" : "#f6ecd9",
          padding: 32,
        }}
      >
        <View style={{ position: "relative", minHeight: "100%", padding: 32 }}>
          <View style={{ position: "relative", zIndex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                padding: 20,
                borderRadius: 8,
                margin: 20,
                backgroundColor: "#fbbf24",
              }}
            >
              {/* Left: Customer Info - wider */}
              <View style={{ flex: 1.5, paddingRight: 12 }}>
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    fontFamily: "Open Sans",
                  }}
                >
                  {`Name: ${data.clientDetails.name}`}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 2,
                    fontFamily: "Open Sans",
                  }}
                >
                  Start location: {data.clientDetails.startLocation}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 2,
                    fontFamily: "Open Sans",
                  }}
                >
                  End location: {data.clientDetails.endLocation}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 2,
                    fontFamily: "Open Sans",
                  }}
                >
                  No of Days: {data.clientDetails.daysFormat}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 2,
                    fontFamily: "Open Sans",
                  }}
                >
                  Adults: {data.clientDetails.numAdults}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 2,
                    fontFamily: "Open Sans",
                  }}
                >
                  Children: {data.clientDetails.numChildren} (Ages:{" "}
                  {data.clientDetails.childrenAges})
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 2,
                    fontFamily: "Open Sans",
                  }}
                >
                  Rooms:{" "}
                  {data.clientDetails.roomAllocations
                    ?.map(
                      (allocation) =>
                        `${allocation.roomCount} ${allocation.roomType}`
                    )
                    .join(", ")}
                </Text>
                {data.clientDetails.contactNumber && (
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontFamily: "Open Sans",
                    }}
                  >
                    Contact: {data.clientDetails.contactNumber}
                  </Text>
                )}
                {data.customerRequirements?.type !== "travel_only" && (
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontFamily: "Open Sans",
                    }}
                  >
                    Check-in / Check-out: {getOverallDateRange()}
                  </Text>
                )}
                {data.customerRequirements?.type !== "rooms_only" && (
                  <Text
                    style={{
                      fontSize: 12,
                      marginTop: 2,
                      fontFamily: "Open Sans",
                    }}
                  >
                    Transport provided:{" "}
                    {data.travelCostingDetails?.transportType ||
                      data.clientDetails.transportProvided}
                  </Text>
                )}
              </View>

              {/* Right: Executive Info */}
              <View style={{ flex: 1, paddingLeft: 12 }}>
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: 13,
                    fontFamily: "Open Sans",
                  }}
                >
                  {data.clientDetails.packageName}
                </Text>
                <Text
                  style={{
                    fontWeight: 700,
                    fontSize: 12,
                    marginTop: 6,
                    fontFamily: "Open Sans",
                  }}
                >
                  Executive details
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 2,
                    fontFamily: "Open Sans",
                  }}
                >
                  Name: {data.executiveDetails.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 2,
                    fontFamily: "Open Sans",
                  }}
                >
                  Email: {data.executiveDetails.email}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 2,
                    fontFamily: "Open Sans",
                  }}
                >
                  Phone No: {data.executiveDetails.phone}
                </Text>
              </View>
            </View>

            <View style={{ marginTop: 8 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#16a34a",
                  marginBottom: 8,
                  fontFamily: "Open Sans",
                }}
              >
                Inclusions
              </Text>
              <View style={styles.bulletList}>
                {data.inclusions.map((inclusion, index) => (
                  <View key={`inc-${index}`} style={styles.bulletItem}>
                    <Text
                      style={{
                        ...styles.bulletPoint,
                        fontSize: 12,
                        fontFamily: "Open Sans",
                      }}
                    >
                      •{" "}
                    </Text>
                    <Text
                      style={{
                        ...styles.bulletText,
                        fontSize: 12,
                        fontFamily: "Open Sans",
                      }}
                    >
                      {inclusion}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Row of images below exclusions */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 16,
                marginBottom: 12,
                gap: 32,
              }}
            >
              <Image
                src={optimizedBag}
                style={{ width: 60, height: 60, marginRight: 24 }}
              />
              <Image
                src={optimizedFood}
                style={{ width: 60, height: 60, marginRight: 24 }}
              />
              <Image src={optimizedTelescope} style={{ width: 60, height: 60 }} />
            </View>

            {/* Exclusions Section */}
            <View style={{ marginTop: 8 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#dc2626",
                  marginBottom: 8,
                  fontFamily: "Open Sans",
                }}
              >
                Exclusions
              </Text>
              <View style={styles.bulletList}>
                {data.exclusions.map((exclusion, index) => (
                  <View key={`exc-${index}`} style={styles.bulletItem}>
                    <Text
                      style={{
                        ...styles.bulletPoint,
                        fontSize: 12,
                        fontFamily: "Open Sans",
                      }}
                    >
                      •{" "}
                    </Text>
                    <Text
                      style={{
                        ...styles.bulletText,
                        fontSize: 12,
                        fontFamily: "Open Sans",
                      }}
                    >
                      {exclusion}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        <PDFLogoFooter logoSrc={optimizedLogo} />
      </Page>

      {/* Itinerary Pages */}
      {Object.entries(daysByLocation).map(([location, days]) => (
        <Page
          key={location}
          size="A4"
          style={{
            backgroundColor: isCoorgAlone ? "#CAE1CC" : "#f6ecd9",
            padding: 32,
          }}
        >
          <View
            style={{ position: "relative", minHeight: "100%", padding: 32 }}
          >
            <View style={{ position: "relative", zIndex: 1 }}>
              <View style={styles.section}>
                <Text style={styles.locationTitle}>{location}</Text>
                {days.map((day, idx) => {
                  // Check if this is a Travel Alone day
                  if (day.isTravelAlone) {
                    return (
                      <View key={idx} style={styles.itineraryDay}>
                        <Text style={styles.itineraryDayTitle}>
                          <Text
                            style={{ fontWeight: 700, fontFamily: "Open Sans" }}
                          >
                            Day {day.day} - Travel Alone day
                          </Text>
                        </Text>
                      </View>
                    );
                  }

                  // Determine images based on location automatically
                  let image1 = "";
                  let image2 = "";
                  const selectedLocationsLower = selectedLocations.map(
                    (l) => l && l.toLowerCase()
                  );

                  // Calculate image index with cycling for days beyond 4 (0-based index)
                  let imageIndex = (day.day - 1) % 4;

                  if (
                    location.toLowerCase() === "ooty" &&
                    selectedLocationsLower.includes("ooty")
                  ) {
                    image1 = ootyImages[imageIndex][0] || "";
                    image2 = ootyImages[imageIndex][1] || "";
                  } else if (
                    location.toLowerCase() === "coorg" &&
                    selectedLocationsLower.includes("coorg")
                  ) {
                    image1 = coorgImages[imageIndex][0] || "";
                    image2 = coorgImages[imageIndex][1] || "";
                  } else if (
                    location.toLowerCase() === "chikmagalur" &&
                    selectedLocationsLower.includes("chikmagalur")
                  ) {
                    image1 = chikmagalurImages[imageIndex][0] || "";
                    image2 = chikmagalurImages[imageIndex][1] || "";
                  } else if (
                    location.toLowerCase() === "kodaikanal" &&
                    selectedLocationsLower.includes("kodaikanal")
                  ) {
                    image1 = kodaikanalImages[imageIndex][0] || "";
                    image2 = kodaikanalImages[imageIndex][1] || "";
                  } else if (
                    location.toLowerCase() === "wayanad" &&
                    selectedLocationsLower.includes("wayanad")
                  ) {
                    // Map Wayanad images by local day order within Wayanad
                    imageIndex = idx % wayanadImages.length;
                    image1 = wayanadImages[imageIndex][0] || "";
                    image2 = wayanadImages[imageIndex][1] || "";
                  }
                  // Use images directly (they're already reasonably sized)
                  return (
                    <View key={idx} style={styles.itineraryDay}>
                      <Text style={styles.itineraryDayTitle}>
                        <Text
                          style={{ fontWeight: 700, fontFamily: "Open Sans" }}
                        >
                          Day {day.day}:
                        </Text>{" "}
                        <Text style={{ fontFamily: "Open Sans" }}>
                          {day.title}
                        </Text>
                      </Text>
                      <View style={styles.itineraryDayActivities}>
                        {day.activities.map((activity, actIndex) => (
                          <View key={actIndex} style={styles.bulletItem}>
                            <Text
                              style={{
                                ...styles.bulletPoint,
                                fontFamily: "Open Sans",
                              }}
                            >
                              •{" "}
                            </Text>
                            <Text
                              style={{
                                ...styles.bulletText,
                                fontFamily: "Open Sans",
                              }}
                            >
                              {activity}
                            </Text>
                          </View>
                        ))}
                      </View>
                      <View
                        style={{ flexDirection: "row", gap: 12, marginTop: 16 }}
                      >
                        {image1 && (
                          <Image
                            src={image1}
                            style={{
                              flex: 1,
                              width: "100%",
                              aspectRatio: 16 / 9,
                              height: "auto",
                              objectFit: "cover",
                              borderRadius: 6,
                            }}
                          />
                        )}
                        {image2 && (
                          <Image
                            src={image2}
                            style={{
                              flex: 1,
                              width: "100%",
                              aspectRatio: 16 / 9,
                              height: "auto",
                              objectFit: "cover",
                              borderRadius: 6,
                            }}
                          />
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
          <PDFLogoFooter logoSrc={optimizedLogo} />
        </Page>
      ))}

      {/* Costing Page */}
      <Page
        size="A4"
        style={{
          backgroundColor: isCoorgAlone ? "#CAE1CC" : "#f6ecd9",
          padding: 32,
        }}
      >
        <View style={{ position: "relative", minHeight: "100%", padding: 32 }}>
          <View style={{ position: "relative", zIndex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#0D9488",
                marginBottom: 16,
                fontFamily: "Open Sans",
              }}
            >
              {data.customerRequirements?.type === "travel_only"
                ? "Transport Options"
                : "Package Options"}
            </Text>
            {data.customerRequirements?.type === "travel_only" ? (
              // Transport-only layout - simple cost display without hotel details
              <View
                style={{
                  border: "2px solid #16a34a",
                  borderRadius: 4,
                  marginBottom: 24,
                  backgroundColor: "#fff",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: "#16a34a",
                    borderTopLeftRadius: 4,
                    borderTopRightRadius: 4,
                    borderBottom: "2px solid #16a34a",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: 700,
                      fontSize: 14,
                      padding: 8,
                      fontFamily: "Open Sans",
                      color: "#fff",
                      letterSpacing: 1,
                    }}
                  >
                    TRANSPORT ONLY
                  </Text>
                </View>

                {/* Transport Details */}
                <View
                  style={{
                    flexDirection: "row",
                    borderBottom: "1px solid #888",
                    backgroundColor: "#f3f4f6",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: 700,
                      fontSize: 11,
                      padding: 4,
                      fontFamily: "Open Sans",
                    }}
                  >
                    Transport Type
                  </Text>
                  <Text
                    style={{
                      flex: 3,
                      fontSize: 11,
                      padding: 4,
                      fontFamily: "Open Sans",
                    }}
                  >
                    {data.travelCostingDetails?.transportType ||
                      data.clientDetails.transportProvided}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderBottom: "1px solid #888",
                    backgroundColor: "#f3f4f6",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: 700,
                      fontSize: 11,
                      padding: 4,
                      fontFamily: "Open Sans",
                    }}
                  >
                    Route
                  </Text>
                  <Text
                    style={{
                      flex: 3,
                      fontSize: 11,
                      padding: 4,
                      fontFamily: "Open Sans",
                    }}
                  >
                    {data.travelCostingDetails?.startLocation} to{" "}
                    {data.travelCostingDetails?.endLocation}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    borderBottom: "1px solid #888",
                    backgroundColor: "#f3f4f6",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: 700,
                      fontSize: 11,
                      padding: 4,
                      fontFamily: "Open Sans",
                    }}
                  >
                    Duration
                  </Text>
                  <Text
                    style={{
                      flex: 3,
                      fontSize: 11,
                      padding: 4,
                      fontFamily: "Open Sans",
                    }}
                  >
                    {data.clientDetails.daysFormat || ""}
                  </Text>
                </View>

                {/* Final Cost */}
                <View
                  style={{
                    flexDirection: "row",
                    borderBottom: "1px solid #888",
                  }}
                >
                  <Text
                    style={{
                      flex: 1,
                      fontWeight: 700,
                      fontSize: 11,
                      padding: 4,
                      fontFamily: "Open Sans",
                    }}
                  >
                    Total Transport Cost
                  </Text>
                  <Text style={[{ flex: 3 }, styles.finalCostRupee]}>
                    ₹
                    {(
                      data.travelCostingDetails?.finalTravelCost || 0
                    ).toLocaleString()}
                  </Text>
                </View>
              </View>
            ) : (
              ["standard", "comfort"].map((type) => {
                const pkg = data.costingDetails[type];
                const customHotel =
                  typeof pkg === "object" &&
                  pkg !== null &&
                  "customHotel" in pkg
                    ? pkg.customHotel
                    : false;
                const customHotelName =
                  typeof pkg === "object" &&
                  pkg !== null &&
                  "customHotelName" in pkg
                    ? pkg.customHotelName
                    : "";
                // Color map for each package
                const colorMap = {
                  standard: "#16a34a", // green
                  comfort: "#2563eb", // blue
                };
                const tableColor =
                  colorMap[type as keyof typeof colorMap] || "#888";
                // Get costs from final costing details if available
                const finalCostData =
                  data.finalCostingDetails?.[
                    type as keyof typeof data.finalCostingDetails
                  ];
                const costingPkg =
                  data.costingDetails?.[
                    type as keyof typeof data.costingDetails
                  ];
                const finalCost = getFinalCostString(finalCostData, costingPkg);
                // Get unique locations from itinerary, excluding skipped locations
                const uniqueLocations = Array.from(
                  new Set(data.itinerary.map((d: any) => d.location))
                ).filter(
                  (location) =>
                    !data.hotelCostingDetails?.skippedLocations?.[location]
                );
                // Get check-in/check-out dates
                const checkIn = data.clientDetails.checkInDate
                  ? format(new Date(data.clientDetails.checkInDate), "MMM d")
                  : "";
                const checkOut = data.clientDetails.checkOutDate
                  ? format(new Date(data.clientDetails.checkOutDate), "MMM d")
                  : "";
                // Get no. of days and nights
                const daysNights = data.clientDetails.daysFormat || "";
                // Get transport provided - use travelCostingDetails.transportType with fallback to clientDetails.transportProvided
                const transportProvided =
                  data.travelCostingDetails?.transportType ||
                  data.clientDetails.transportProvided ||
                  "";
                // Get no. of rooms - show detailed breakdown
                const noOfRooms = data.clientDetails.roomAllocations?.length
                  ? data.clientDetails.roomAllocations
                      .map(
                        (allocation) =>
                          `${allocation.roomCount} ${allocation.roomType}`
                      )
                      .join(", ")
                  : "No rooms specified";
                return (
                  <View
                    key={type}
                    style={{
                      border: `2px solid ${tableColor}`,
                      borderRadius: 4,
                      marginBottom: 24,
                      backgroundColor: "#fff",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: tableColor,
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        borderBottom: `2px solid ${tableColor}`,
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: 14,
                          padding: 8,
                          fontFamily: "Open Sans",
                          color: "#fff",
                          letterSpacing: 1,
                        }}
                      >
                        {type.toUpperCase()} PACKAGE
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottom: "1px solid #888",
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        Location
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        Check-in/out
                      </Text>
                      <Text
                        style={{
                          flex: 2,
                          fontWeight: 700,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        Hotel name (room type)
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        No of rooms
                      </Text>
                    </View>
                    {customHotel && customHotelName ? (
                      <View
                        style={{
                          flexDirection: "row",
                          borderBottom: "1px solid #888",
                        }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 11,
                            padding: 4,
                            fontFamily: "Open Sans",
                          }}
                        >
                          {uniqueLocations.join(", ")}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 11,
                            padding: 4,
                            fontFamily: "Open Sans",
                          }}
                        >
                          {checkIn} - {checkOut}
                        </Text>
                        <Text
                          style={{
                            flex: 2,
                            fontSize: 9,
                            padding: 4,
                            fontFamily: "Open Sans",
                          }}
                        >
                          {customHotelName}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 11,
                            padding: 4,
                            fontFamily: "Open Sans",
                          }}
                        >
                          {noOfRooms}
                        </Text>
                      </View>
                    ) : (
                      uniqueLocations.map((location, idx) => {
                        // Get hotels for this location and package type, avoid duplicates
                        const hotelsForLoc = hotels.filter(
                          (h) =>
                            h.location.toUpperCase() ===
                              location.toUpperCase() &&
                            h.packageType === type.toUpperCase()
                        );
                        // Remove duplicate hotel names for this location
                        const hotelNames = Array.from(
                          new Set(
                            hotelsForLoc.map(
                              (h) => `${h.hotel} (${h.roomType})`
                            )
                          )
                        );
                        // Get location-specific date range
                        const locationDateRange =
                          getLocationDateRange(location);
                        return (
                          <View
                            key={location + idx}
                            style={{
                              flexDirection: "row",
                              borderBottom: "1px solid #888",
                            }}
                          >
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 11,
                                padding: 4,
                                fontFamily: "Open Sans",
                              }}
                            >
                              {location}
                            </Text>
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 11,
                                padding: 4,
                                fontFamily: "Open Sans",
                              }}
                            >
                              {locationDateRange}
                            </Text>
                            <Text
                              style={{
                                flex: 2,
                                fontSize: 9,
                                padding: 4,
                                fontFamily: "Open Sans",
                              }}
                            >
                              {hotelNames.join(", ")}
                            </Text>
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 11,
                                padding: 4,
                                fontFamily: "Open Sans",
                              }}
                            >
                              {noOfRooms}
                            </Text>
                          </View>
                        );
                      })
                    )}
                    {/* Transport Provided row */}
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottom: "1px solid #888",
                        backgroundColor: "#f3f4f6",
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        Transport Provided
                      </Text>
                      <Text
                        style={{
                          flex: 3,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        {transportProvided}
                      </Text>
                    </View>
                    {/* No. of Days and Nights row */}
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottom: "1px solid #888",
                        backgroundColor: "#f3f4f6",
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        No. of Days and Nights
                      </Text>
                      <Text
                        style={{
                          flex: 3,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        {daysNights}
                      </Text>
                    </View>
                    {/* Final Cost row */}
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottom: "1px solid #888",
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        Final Cost
                      </Text>
                      <Text style={[{ flex: 3 }, styles.finalCostRupee]}>
                        {finalCost}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>
          <PDFLogoFooter logoSrc={optimizedLogo} />
        </View>
      </Page>

      {/* Luxury Package on a new page - only if not travel_only */}
      {data.customerRequirements?.type !== "travel_only" && (
        <Page
          size="A4"
          style={{
            backgroundColor: isCoorgAlone ? "#CAE1CC" : "#f6ecd9",
            padding: 32,
          }}
        >
          <View
            style={{ position: "relative", minHeight: "100%", padding: 32 }}
          >
            <View style={{ position: "relative", zIndex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#0D9488",
                  marginBottom: 16,
                  fontFamily: "Open Sans",
                }}
              >
                Package Options
              </Text>
              {["luxury"].map((type) => {
                const pkg = data.costingDetails[type];
                const customHotel =
                  typeof pkg === "object" &&
                  pkg !== null &&
                  "customHotel" in pkg
                    ? pkg.customHotel
                    : false;
                const customHotelName =
                  typeof pkg === "object" &&
                  pkg !== null &&
                  "customHotelName" in pkg
                    ? pkg.customHotelName
                    : "";
                // Color map for each package
                const colorMap = {
                  luxury: "#eab308", // gold
                };
                const tableColor =
                  colorMap[type as keyof typeof colorMap] || "#888";
                // Get costs from final costing details if available
                const finalCostData =
                  data.finalCostingDetails?.[
                    type as keyof typeof data.finalCostingDetails
                  ];
                const costingPkg =
                  data.costingDetails?.[
                    type as keyof typeof data.costingDetails
                  ];
                const finalCost = getFinalCostString(finalCostData, costingPkg);
                // Get unique locations from itinerary, excluding skipped locations
                const uniqueLocations = Array.from(
                  new Set(data.itinerary.map((d: any) => d.location))
                ).filter(
                  (location) =>
                    !data.hotelCostingDetails?.skippedLocations?.[location]
                );
                // Get overall date range for display
                const overallDateRange = getOverallDateRange();
                // Get no. of days and nights
                const daysNights = data.clientDetails.daysFormat || "";
                // Get transport provided - use travelCostingDetails.transportType with fallback to clientDetails.transportProvided
                const transportProvided =
                  data.travelCostingDetails?.transportType ||
                  data.clientDetails.transportProvided ||
                  "";
                // Get no. of rooms - show detailed breakdown
                const noOfRooms = data.clientDetails.roomAllocations?.length
                  ? data.clientDetails.roomAllocations
                      .map(
                        (allocation) =>
                          `${allocation.roomCount} ${allocation.roomType}`
                      )
                      .join(", ")
                  : "No rooms specified";
                return (
                  <View
                    key={type}
                    style={{
                      border: `2px solid ${tableColor}`,
                      borderRadius: 4,
                      marginBottom: 24,
                      backgroundColor: "#fff",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        backgroundColor: tableColor,
                        borderTopLeftRadius: 4,
                        borderTopRightRadius: 4,
                        borderBottom: `2px solid ${tableColor}`,
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: 14,
                          padding: 8,
                          fontFamily: "Open Sans",
                          color: "#fff",
                          letterSpacing: 1,
                        }}
                      >
                        {type.toUpperCase()} PACKAGE
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottom: "1px solid #888",
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        Location
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        Check-in/out
                      </Text>
                      <Text
                        style={{
                          flex: 2,
                          fontWeight: 700,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        Hotel name (room type)
                      </Text>
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        No of rooms
                      </Text>
                    </View>
                    {customHotel && customHotelName ? (
                      <View
                        style={{
                          flexDirection: "row",
                          borderBottom: "1px solid #888",
                        }}
                      >
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 11,
                            padding: 4,
                            fontFamily: "Open Sans",
                          }}
                        >
                          {uniqueLocations.join(", ")}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 11,
                            padding: 4,
                            fontFamily: "Open Sans",
                          }}
                        >
                          {overallDateRange}
                        </Text>
                        <Text
                          style={{
                            flex: 2,
                            fontSize: 9,
                            padding: 4,
                            fontFamily: "Open Sans",
                          }}
                        >
                          {customHotelName}
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            fontSize: 11,
                            padding: 4,
                            fontFamily: "Open Sans",
                          }}
                        >
                          {noOfRooms}
                        </Text>
                      </View>
                    ) : (
                      uniqueLocations.map((location, idx) => {
                        // Get hotels for this location and package type, avoid duplicates
                        const hotelsForLoc = hotels.filter(
                          (h) =>
                            h.location.toUpperCase() ===
                              location.toUpperCase() &&
                            h.packageType === type.toUpperCase()
                        );
                        // Remove duplicate hotel names for this location
                        const hotelNames = Array.from(
                          new Set(
                            hotelsForLoc.map(
                              (h) => `${h.hotel} (${h.roomType})`
                            )
                          )
                        );
                        // Get location-specific date range
                        const locationDateRange =
                          getLocationDateRange(location);
                        return (
                          <View
                            key={location + idx}
                            style={{
                              flexDirection: "row",
                              borderBottom: "1px solid #888",
                            }}
                          >
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 11,
                                padding: 4,
                                fontFamily: "Open Sans",
                              }}
                            >
                              {location}
                            </Text>
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 11,
                                padding: 4,
                                fontFamily: "Open Sans",
                              }}
                            >
                              {locationDateRange}
                            </Text>
                            <Text
                              style={{
                                flex: 2,
                                fontSize: 9,
                                padding: 4,
                                fontFamily: "Open Sans",
                              }}
                            >
                              {hotelNames.join(", ")}
                            </Text>
                            <Text
                              style={{
                                flex: 1,
                                fontSize: 11,
                                padding: 4,
                                fontFamily: "Open Sans",
                              }}
                            >
                              {noOfRooms}
                            </Text>
                          </View>
                        );
                      })
                    )}
                    {/* Transport Provided row */}
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottom: "1px solid #888",
                        backgroundColor: "#f3f4f6",
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        Transport Provided
                      </Text>
                      <Text
                        style={{
                          flex: 3,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        {transportProvided}
                      </Text>
                    </View>
                    {/* No. of Days and Nights row */}
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottom: "1px solid #888",
                        backgroundColor: "#f3f4f6",
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        No. of Days and Nights
                      </Text>
                      <Text
                        style={{
                          flex: 3,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        {daysNights}
                      </Text>
                    </View>
                    {/* Final Cost row */}
                    <View
                      style={{
                        flexDirection: "row",
                        borderBottom: "1px solid #888",
                      }}
                    >
                      <Text
                        style={{
                          flex: 1,
                          fontWeight: 700,
                          fontSize: 11,
                          padding: 4,
                          fontFamily: "Open Sans",
                        }}
                      >
                        Final Cost
                      </Text>
                      <Text style={[{ flex: 3 }, styles.finalCostRupee]}>
                        {finalCost}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
            <PDFLogoFooter logoSrc={optimizedLogo} />
          </View>
        </Page>
      )}

      {/* Final Page with Last Page Image + Footer */}
      <Page
        size="A4"
        style={{
          backgroundColor: isCoorgAlone ? "#CAE1CC" : "#f6ecd9",
          padding: 32,
        }}
      >
        <View style={{ position: "relative", minHeight: "100%", padding: 32 }}>
          {/* Last Page Image */}
          <View style={{ marginBottom: 28, alignItems: "center" }}>
            <Image
              src="/lastpage.jpg"
              style={{
                width: "100%",
                maxWidth: 500,
                height: "auto",
                borderRadius: 8,
                marginBottom: 16,
              }}
            />
          </View>
          {/* Three columns: Bank, Office, Contact */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 16,
              marginBottom: 24,
            }}
          >
            {/* Bank Details */}
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: 11,
                  fontFamily: "Open Sans",
                  marginBottom: 4,
                }}
              >
                BANK DETAILS
              </Text>
              <Image
                src={optimizedBank}
                style={{ width: 20, height: 20, marginBottom: 4 }}
              />
              <Text
                style={{
                  fontSize: 9,
                  color: "#444",
                  fontFamily: "Open Sans",
                  marginBottom: 1,
                }}
              >
                Account Holder: TOORIZO
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  color: "#444",
                  fontFamily: "Open Sans",
                  marginBottom: 1,
                }}
              >
                Account Number: 50200109167114
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  color: "#444",
                  fontFamily: "Open Sans",
                  marginBottom: 1,
                }}
              >
                IFSC: HDFC0000082
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  color: "#444",
                  fontFamily: "Open Sans",
                  marginBottom: 1,
                }}
              >
                Branch: NUNGAMBAKKAM
              </Text>
              <Text
                style={{ fontSize: 9, color: "#444", fontFamily: "Open Sans" }}
              >
                Account Type: CURRENT
              </Text>
            </View>
            {/* Office Location */}
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: 11,
                  fontFamily: "Open Sans",
                  marginBottom: 4,
                }}
              >
                OFFICE LOCATION
              </Text>
              <Image
                src={optimizedLocation}
                style={{ width: 20, height: 20, marginBottom: 4 }}
              />
              <Text
                style={{ fontSize: 9, color: "#444", fontFamily: "Open Sans" }}
              >
                {data.companyDetails.address}
              </Text>
            </View>
            {/* Contact */}
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text
                style={{
                  fontWeight: 700,
                  fontSize: 11,
                  fontFamily: "Open Sans",
                  marginBottom: 4,
                }}
              >
                CONTACT
              </Text>
              <Image
                src={optimizedContact}
                style={{ width: 20, height: 20, marginBottom: 4 }}
              />
              <Text
                style={{
                  fontSize: 9,
                  color: "#444",
                  fontFamily: "Open Sans",
                  marginBottom: 1,
                }}
              >
                Mobile: {data.executiveDetails.phone}
              </Text>
              <Text
                style={{
                  fontSize: 9,
                  color: "#444",
                  fontFamily: "Open Sans",
                  marginBottom: 1,
                }}
              >
                Mail: {data.companyDetails.email}
              </Text>
              <Text
                style={{ fontSize: 9, color: "#444", fontFamily: "Open Sans" }}
              >
                Website: {data.companyDetails.website}
              </Text>
            </View>
          </View>
          {/* Footer message */}
          <Text
            style={{
              fontSize: 10,
              color: "#222",
              fontFamily: "Open Sans",
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Looking forward for your revert which gives us an opportunity to
            make your holiday experience memorable
          </Text>
          {/* Social icons row, spaced and underlined */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              borderBottom: "1px solid #bbb",
              paddingBottom: 8,
            }}
          >
            <Link
              src="https://www.instagram.com/toorizotravel/"
              style={{ alignItems: "center", textDecoration: "none" }}
            >
              <Image
                src={optimizedInstagram}
                style={{ width: 20, height: 20, marginBottom: 2 }}
              />
            </Link>
            <Link
              src="#"
              style={{ alignItems: "center", textDecoration: "none" }}
            >
              <Image
                src={optimizedFacebook}
                style={{ width: 20, height: 20, marginBottom: 2 }}
              />
            </Link>
            <Link
              src="#"
              style={{ alignItems: "center", textDecoration: "none" }}
            >
              <Image
                src={optimizedYoutube}
                style={{ width: 20, height: 20, marginBottom: 2 }}
              />
            </Link>
          </View>
        </View>
        <PDFLogoFooter logoSrc={optimizedLogo} />
      </Page>
    </Document>
  );
};

export default PDFDocument;
