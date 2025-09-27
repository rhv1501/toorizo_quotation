import React from "react";
import { useFormContext } from "react-hook-form";
import { QuotationData } from "../../types";
import { FormField } from "../ui/FormField";

const TravelGuidelinesForm: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<QuotationData>();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium text-gray-900">Travel Guidelines</h3>

      <FormField
        label="General Travel Guidelines"
        error={errors.travelGuidelines?.message}
      >
        <textarea
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
          placeholder="Enter general travel guidelines, tips, documentation requirements, etc."
          {...register("travelGuidelines", {
            required: "Travel guidelines are required",
          })}
          defaultValue={`📌 Important Travel Guidelines – TOORIZO
________________________________________
🔐 Booking Process & Payment Terms
To initiate your reservation, kindly confirm your preferred package and hotel category. Upon confirmation, we will issue a GST-compliant invoice for processing. An advance payment of 50% is required to secure the booking, while the remaining 50% can be settled at the time of vehicle boarding.
________________________________________
❎ Trip Cancellation Guidelines
• More than 15 days before travel: No cancellation charges.
• 3 to 14 days before travel: 30% of the total package amount will be charged.
• Less than 3 days before travel: The booking is non-refundable.
Note: This is a general guideline. Cancellation terms may vary based on hotel policies, season, or other specific circumstances. If cancellation is a possibility, please consult us for detailed terms before confirming your booking.
________________________________________
🌦 Travel Plan Adjustments
In situations such as adverse weather, local unrest, or major events, some itinerary spots may become inaccessible. We appreciate your flexibility in cooperating with any necessary plan changes.
________________________________________
🏨 Partner Services Disclaimer
Some accommodations, transport, or cruise services in your package may be arranged through third-party vendors. Guests are required to follow their policies during the trip.
________________________________________
🧭 Itinerary Fulfillment Notice
While we aim to cover all destinations listed, factors like traffic, time spent at attractions, or hotel check-out timings may affect the final itinerary coverage. We always strive to offer you the best possible experience.`}
        />
      </FormField>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Make sure to include important information such as required
              documents, recommended clothing, payment terms, and cancellation
              policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelGuidelinesForm;
