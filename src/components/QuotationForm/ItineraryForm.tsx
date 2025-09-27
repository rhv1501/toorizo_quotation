import React from "react";
import { useFormContext } from "react-hook-form";
import { QuotationData } from "../../types";
import { Plus, Trash2 } from "lucide-react";
import { locationItineraries } from "../../data/itineraries";

type EditableDay = {
  day: number;
  title: string;
  activities: string[];
  location: string;
  isTravelAlone: boolean;
};

type EditableLocation = {
  name: string;
  days: EditableDay[];
};

const ItineraryForm: React.FC = () => {
  const { setValue } = useFormContext<QuotationData>();
  // This state holds all editable locations and their days/activities
  const [locations, setLocations] = React.useState<EditableLocation[]>([]);

  // Add a location with prefilled data
  const handleAddLocation = (locationKey: string) => {
    if (locations.some((loc) => loc.name === locationKey)) return;
    const locData = locationItineraries[locationKey];
    setLocations((prev) => [
      ...prev,
      {
        name: locationKey,
        days: locData.days.map((d) => ({
          day: d.day,
          title: d.title,
          activities: [...d.activities],
          location: locationKey,
          isTravelAlone: false,
        })),
      },
    ]);
  };

  // Remove a location and all its days
  const handleRemoveLocation = (locationKey: string) => {
    setLocations((prev) => prev.filter((loc) => loc.name !== locationKey));
  };

  // Edit a day field
  const handleDayChange = (
    locationIdx: number,
    dayIdx: number,
    field: keyof EditableDay,
    value: any
  ) => {
    setLocations((prev) => {
      const updated = [...prev];
      updated[locationIdx] = {
        ...updated[locationIdx],
        days: updated[locationIdx].days.map((d, i) =>
          i === dayIdx ? { ...d, [field]: value } : d
        ),
      };
      return updated;
    });
  };

  // Remove a day from a location
  const handleRemoveDay = (locationIdx: number, dayIdx: number) => {
    setLocations((prev) => {
      const updated = [...prev];
      updated[locationIdx] = {
        ...updated[locationIdx],
        days: updated[locationIdx].days.filter((_, i) => i !== dayIdx),
      };
      return updated;
    });
  };

  // Add a new day to a location
  const handleAddDay = (locationIdx: number) => {
    setLocations((prev) => {
      const updated = [...prev];
      updated[locationIdx] = {
        ...updated[locationIdx],
        days: [
          ...updated[locationIdx].days,
          {
            day: updated[locationIdx].days.length + 1,
            title: "",
            activities: [""],
            location: updated[locationIdx].name,
            isTravelAlone: false,
          },
        ],
      };
      return updated;
    });
  };

  // Edit an activity
  const handleActivityChange = (
    locationIdx: number,
    dayIdx: number,
    actIdx: number,
    value: string
  ) => {
    setLocations((prev) => {
      const updated = [...prev];
      const day = updated[locationIdx].days[dayIdx];
      const newActs = [...day.activities];
      newActs[actIdx] = value;
      updated[locationIdx].days[dayIdx] = { ...day, activities: newActs };
      return updated;
    });
  };

  // Remove an activity
  const handleRemoveActivity = (
    locationIdx: number,
    dayIdx: number,
    actIdx: number
  ) => {
    setLocations((prev) => {
      const updated = [...prev];
      const day = updated[locationIdx].days[dayIdx];
      updated[locationIdx].days[dayIdx] = {
        ...day,
        activities: day.activities.filter((_, i) => i !== actIdx),
      };
      return updated;
    });
  };

  // Add an activity
  const handleAddActivity = (locationIdx: number, dayIdx: number) => {
    setLocations((prev) => {
      const updated = [...prev];
      const day = updated[locationIdx].days[dayIdx];
      updated[locationIdx].days[dayIdx] = {
        ...day,
        activities: [...day.activities, ""],
      };
      return updated;
    });
  };

  // Save all locations/days/activities to the form state for PDF export
  React.useEffect(() => {
    // Flatten all days from all locations into a single array for the form state
    const allDays = locations.flatMap((loc) => loc.days);
    setValue("itinerary", allDays);
  }, [locations, setValue]);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Itinerary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.keys(locationItineraries).map((location) => (
            <div
              key={location}
              className={`p-4 rounded-lg border ${
                locations.some((loc) => loc.name === location)
                  ? "border-teal-500 bg-teal-50"
                  : "border-gray-200 hover:border-teal-300"
              } transition-colors duration-200`}
            >
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{location}</h4>
                {!locations.some((loc) => loc.name === location) && (
                  <button
                    type="button"
                    onClick={() => handleAddLocation(location)}
                    className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                  >
                    <Plus size={16} />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {locationItineraries[location].days.length} days
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {locations.map((loc, locationIdx) => (
          <div key={loc.name} className="space-y-4 border rounded-lg p-4">
            <h3 className="text-2xl font-bold text-center text-teal-700 uppercase tracking-wide">
              {loc.name}
              <button
                type="button"
                onClick={() => handleRemoveLocation(loc.name)}
                className="ml-2 text-red-500 hover:text-red-700"
                title="Remove location"
              >
                <Trash2 size={18} />
              </button>
            </h3>
            {loc.days.map((day, dayIdx) => (
              <div
                key={dayIdx}
                className="bg-white rounded-lg shadow p-4 mb-4 border"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-teal-700">
                    Day
                    <input
                      type="number"
                      min={1}
                      value={day.day}
                      onChange={(e) =>
                        handleDayChange(
                          locationIdx,
                          dayIdx,
                          "day",
                          Number(e.target.value)
                        )
                      }
                      className="ml-2 border rounded px-2 py-1 w-16"
                    />
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDay(locationIdx, dayIdx)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove day"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="mb-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={day.isTravelAlone || false}
                      onChange={(e) =>
                        handleDayChange(
                          locationIdx,
                          dayIdx,
                          "isTravelAlone",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700">Travel Alone Day</span>
                  </label>
                </div>
                {!day.isTravelAlone && (
                  <>
                    <div className="mb-2">
                      <label className="font-semibold">Title:</label>
                      <input
                        type="text"
                        value={day.title}
                        onChange={(e) =>
                          handleDayChange(
                            locationIdx,
                            dayIdx,
                            "title",
                            e.target.value
                          )
                        }
                        className="border rounded px-2 py-1 w-full mt-1"
                      />
                    </div>

                    <div>
                      <label className="font-semibold">Activities:</label>
                      {day.activities.map((activity, actIdx) => (
                        <div key={actIdx} className="flex gap-2 mb-1">
                          <input
                            type="text"
                            value={activity}
                            onChange={(e) =>
                              handleActivityChange(
                                locationIdx,
                                dayIdx,
                                actIdx,
                                e.target.value
                              )
                            }
                            className="border rounded px-2 py-1 flex-1"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleRemoveActivity(locationIdx, dayIdx, actIdx)
                            }
                            className="text-red-500"
                            title="Remove activity"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => handleAddActivity(locationIdx, dayIdx)}
                        className="text-teal-600 mt-1"
                      >
                        + Add Activity
                      </button>
                    </div>
                  </>
                )}
                {day.isTravelAlone && (
                  <div className="text-center py-4 text-gray-500 italic">
                    This is a Travel Alone day - no itinerary details needed
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddDay(locationIdx)}
              className="text-teal-600 mt-2"
            >
              + Add Day
            </button>
          </div>
        ))}
        {locations.length === 0 && (
          <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">
              Select one or more locations to build your itinerary
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryForm;
