import React from "react";
import { useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { QuotationData, RoomAllocation } from "../../types";
import { FormField } from "../ui/FormField";
import { startLocations } from "../../data/travelCosts";

const durationOptions = [
  { value: "1 Night / 2 Days", nights: 1, days: 2 },
  { value: "2 Nights / 3 Days", nights: 2, days: 3 },
  { value: "3 Nights / 4 Days", nights: 3, days: 4 },
  { value: "4 Nights / 5 Days", nights: 4, days: 5 },
  { value: "5 Nights / 6 Days", nights: 5, days: 6 },
  { value: "6 Nights / 7 Days", nights: 6, days: 7 },
  { value: "7 Nights / 8 Days", nights: 7, days: 8 },
];

const roomTypeOptions = [
  { value: "Single", label: "Single", capacity: 1 },
  { value: "Double", label: "Double", capacity: 2 },
  { value: "Triple", label: "Triple", capacity: 3 },
  { value: "Family", label: "Family", capacity: 4 },
];

const ClientDetailsForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<QuotationData>();

  const checkInDate = watch("clientDetails.checkInDate");
  const daysFormat = watch("clientDetails.daysFormat");
  const numAdults = watch("clientDetails.numAdults");
  const numChildren = watch("clientDetails.numChildren");
  const roomAllocations = watch("clientDetails.roomAllocations") || [];

  const transportOptions = ["Sedan", "SUV", "12 Seater", "21 Seater", "32 Seater", "50 Seater"];

  // Calculate total people and room capacity
  const totalPeople = (numAdults || 0) + (numChildren || 0);
  const totalRoomCapacity = roomAllocations.reduce((total, allocation) => {
    const roomType = roomTypeOptions.find(type => type.value === allocation.roomType);
    return total + (roomType?.capacity || 0) * (allocation.roomCount || 0);
  }, 0);

  // Auto-initialize room allocation when adults count changes
  React.useEffect(() => {
    if (numAdults && (!roomAllocations || roomAllocations.length === 0)) {
      const defaultRooms = Math.ceil(numAdults / 2); // Default to Double rooms
      setValue("clientDetails.roomAllocations", [
        {
          roomType: "Double",
          roomCount: defaultRooms,
        }
      ]);
    }
  }, [numAdults, roomAllocations, setValue]);

  // Add new room allocation
  const addRoomAllocation = () => {
    const newAllocations = [...roomAllocations, { roomType: "Double", roomCount: 1 }];
    setValue("clientDetails.roomAllocations", newAllocations);
  };

  // Remove room allocation
  const removeRoomAllocation = (index: number) => {
    if (roomAllocations.length > 1) {
      const newAllocations = roomAllocations.filter((_, i) => i !== index);
      setValue("clientDetails.roomAllocations", newAllocations);
    }
  };

  // Update specific room allocation
  const updateRoomAllocation = (index: number, field: keyof RoomAllocation, value: string | number) => {
    const newAllocations = [...roomAllocations];
    newAllocations[index] = { ...newAllocations[index], [field]: value };
    setValue("clientDetails.roomAllocations", newAllocations);
  };

  // Update checkout date when check-in date or duration changes
  React.useEffect(() => {
    if (checkInDate && daysFormat) {
      const selectedDuration = durationOptions.find(
        (opt) => opt.value === daysFormat
      );
      if (selectedDuration) {
        setValue(
          "clientDetails.checkOutDate",
          addDays(checkInDate, selectedDuration.days - 1)
        );
      }
    }
  }, [checkInDate, daysFormat, setValue]);

  const [isStartLocationManual, setIsStartLocationManual] = React.useState(false);
  const startLocation = watch("clientDetails.startLocation");
  const [isEndLocationManual, setIsEndLocationManual] = React.useState(false);
  const endLocation = watch("clientDetails.endLocation");

  // Switch to manual mode if value not in presets
  React.useEffect(() => {
    if (startLocation && !startLocations.includes(startLocation)) {
      setIsStartLocationManual(true);
    }
  }, [startLocation]);

  React.useEffect(() => {
    if (endLocation && !startLocations.includes(endLocation)) {
      setIsEndLocationManual(true);
    }
  }, [endLocation]);

  // Handler to manage dropdown/manual selection
  const handleStartLocationChange = (value: string) => {
    if (value === "Manual") {
      setIsStartLocationManual(true);
      setValue("clientDetails.startLocation", "");
    } else {
      setIsStartLocationManual(false);
      setValue("clientDetails.startLocation", value);
    }
  };

  const handleBackToStartDropdown = () => {
    setIsStartLocationManual(false);
    setValue("clientDetails.startLocation", "");
  };

  const handleEndLocationChange = (value: string) => {
    if (value === "Manual") {
      setIsEndLocationManual(true);
      setValue("clientDetails.endLocation", "");
    } else {
      setIsEndLocationManual(false);
      setValue("clientDetails.endLocation", value);
    }
  };

  const handleBackToEndDropdown = () => {
    setIsEndLocationManual(false);
    setValue("clientDetails.endLocation", "");
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Client Details</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Client Name"
          error={errors.clientDetails?.name?.message}
        >
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            {...register("clientDetails.name", {
              required: "Client name is required",
            })}
          />
        </FormField>

        <FormField
          label="Package Name/Title"
          error={errors.clientDetails?.packageName?.message}
        >
          <input
            type="text"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            {...register("clientDetails.packageName", {
              required: "Package name is required",
            })}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Contact Number"
          error={errors.clientDetails?.contactNumber?.message}
        >
          <input
            type="tel"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            placeholder="e.g. +91 9876543210"
            {...register("clientDetails.contactNumber", {
              pattern: {
                value: /^(\+\d{1,3}[-.\s]?)?\d{10}$/,
                message: "Please enter a valid phone number (e.g. +91 9876543210 or 9876543210)",
              },
            })}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Start Location"
          error={errors.clientDetails?.startLocation?.message}
        >
          {isStartLocationManual ? (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter custom start location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                {...register("clientDetails.startLocation", {
                  required: "Start location is required",
                })}
              />
              <button
                type="button"
                onClick={handleBackToStartDropdown}
                className="text-xs text-teal-600 hover:text-teal-800"
              >
                ← Back to dropdown options
              </button>
            </div>
          ) : (
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              value={startLocation || ""}
              onChange={(e) => handleStartLocationChange(e.target.value)}
            >
              <option value="">Select start location</option>
              {startLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
              <option value="Manual">Manual (Enter custom location)</option>
            </select>
          )}
        </FormField>

        <FormField
          label="End Location"
          error={errors.clientDetails?.endLocation?.message}
        >
          {isEndLocationManual ? (
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter custom end location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                {...register("clientDetails.endLocation", {
                  required: "End location is required",
                })}
              />
              <button
                type="button"
                onClick={handleBackToEndDropdown}
                className="text-xs text-teal-600 hover:text-teal-800"
              >
                ← Back to dropdown options
              </button>
            </div>
          ) : (
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
              value={endLocation || ""}
              onChange={(e) => handleEndLocationChange(e.target.value)}
            >
              <option value="">Select end location</option>
              {startLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
              <option value="Manual">Manual (Enter custom location)</option>
            </select>
          )}
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Format (Nights & Days)"
          error={errors.clientDetails?.daysFormat?.message}
        >
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            {...register("clientDetails.daysFormat", {
              required: "Format is required",
            })}
          >
            <option value="">Select duration</option>
            {durationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FormField
          label="Number of Adults"
          error={errors.clientDetails?.numAdults?.message}
        >
          <input
            type="number"
            min={1}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            {...register("clientDetails.numAdults", {
              required: "Number of adults is required",
              valueAsNumber: true,
              min: { value: 1, message: "At least 1 adult is required" },
            })}
          />
        </FormField>

        <FormField
          label="Number of Children"
          error={errors.clientDetails?.numChildren?.message}
        >
          <input
            type="number"
            min={0}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            {...register("clientDetails.numChildren", {
              required: false,
              valueAsNumber: true,
              min: { value: 0, message: "Cannot be negative" },
            })}
          />
        </FormField>

        <FormField
          label="Children Age(s)"
          error={errors.clientDetails?.childrenAges?.message}
        >
          <input
            type="text"
            placeholder="e.g. 5, 8, 12"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            {...register("clientDetails.childrenAges", {
              required: false,
            })}
          />
        </FormField>
      </div>

      {/* Room Allocation Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-medium text-gray-900">Room Allocation</h4>
          <div className="text-sm text-gray-600">
            Total People: {totalPeople} | Room Capacity: {totalRoomCapacity}
            {totalRoomCapacity !== totalPeople && (
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                totalRoomCapacity < totalPeople 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {totalRoomCapacity < totalPeople ? '⚠️ Under capacity' : '⚠️ Over capacity'}
              </span>
            )}
          </div>
        </div>

        <div className="space-y-3">
          {roomAllocations.map((allocation, index) => (
            <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Type
                </label>
                <select
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  value={allocation.roomType}
                  onChange={(e) => updateRoomAllocation(index, 'roomType', e.target.value)}
                >
                  {roomTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label} ({option.capacity} people)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room Count
                </label>
                <input
                  type="number"
                  min={1}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                  value={allocation.roomCount}
                  onChange={(e) => updateRoomAllocation(index, 'roomCount', parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="flex-shrink-0 pt-6">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeRoomAllocation(index)}
                    className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm leading-4 font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addRoomAllocation}
          className="inline-flex items-center px-4 py-2 border border-teal-300 shadow-sm text-sm font-medium rounded-md text-teal-700 bg-white hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
        >
          <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Room Type
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Check-in Date"
          error={errors.clientDetails?.checkInDate?.message}
        >
          <DatePicker
            selected={checkInDate}
            onChange={(date) => setValue("clientDetails.checkInDate", date)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            dateFormat="MMMM d, yyyy"
            minDate={new Date()}
          />
        </FormField>

        <FormField
          label="Check-out Date"
          error={errors.clientDetails?.checkOutDate?.message}
        >
          <DatePicker
            selected={watch("clientDetails.checkOutDate")}
            disabled
            onChange={() => {}}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
            dateFormat="MMMM d, yyyy"
            minDate={checkInDate}
          />
        </FormField>
      </div>
    </div>
  );
};

export default ClientDetailsForm;
