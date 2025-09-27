import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { QuotationData } from "../../types";
import ClientDetailsForm from "./ClientDetailsForm";
import ExecutiveDetailsForm from "./ExecutiveDetailsForm";
import InclusionsExclusionsForm from "./InclusionsExclusionsForm";
import ItineraryForm from "./ItineraryForm";
import CustomerRequirementsForm from "./CustomerRequirementsForm";
import TravelCostingForm from "./TravelCostingForm";
import HotelCostingForm from "./HotelCostingForm";
import FinalCostingForm from "./FinalCostingForm";
import TravelGuidelinesForm from "./TravelGuidelinesForm";
import CompanyDetailsForm from "./CompanyDetailsForm";

interface QuotationFormProps {
  quotationData: QuotationData;
  onUpdateQuotation: (data: QuotationData) => void;
}

const formSections = [
  { id: "client", label: "Client Details", component: ClientDetailsForm },
  { id: "executive", label: "Executive Details", component: ExecutiveDetailsForm },
  { id: "inclusions", label: "Inclusions & Exclusions", component: InclusionsExclusionsForm },
  { id: "itinerary", label: "Itinerary", component: ItineraryForm },
  { id: "requirements", label: "Customer Requirements", component: CustomerRequirementsForm },
  { id: "travel-costing", label: "Travel Costing", component: TravelCostingForm },
  { id: "hotel-costing", label: "Hotel Costing", component: HotelCostingForm },
  { id: "final-costing", label: "Final Costing", component: FinalCostingForm },
  { id: "guidelines", label: "Travel Guidelines", component: TravelGuidelinesForm },
  { id: "company", label: "Company Details", component: CompanyDetailsForm },
];

const QuotationForm: React.FC<QuotationFormProps> = ({
  quotationData,
  onUpdateQuotation,
}) => {
  const methods = useForm<QuotationData>({
    defaultValues: quotationData,
  });

  const handleFormSubmit = (data: QuotationData) => {
    onUpdateQuotation(data);
  };

  // Function to scroll to a specific section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -20; // Offset to account for header spacing
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5 bg-teal-700 text-white">
        <h2 className="text-xl font-semibold">Create Quotation</h2>
        <p className="text-teal-100">
          Fill in the details to generate a professional quotation
        </p>
      </div>

      {/* Quick Navigation Menu */}
      <div className="bg-gray-50 border-b border-gray-200 p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Navigation:</h3>
        <div className="flex flex-wrap gap-2">
          {formSections.map((section) => (
            <button
              key={section.id}
              type="button"
              className="px-3 py-1 text-xs font-medium text-teal-700 bg-white border border-teal-300 rounded-md hover:bg-teal-50 transition-colors duration-200"
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Single Form with All Sections */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>
          <div className="p-6 space-y-8">
            {formSections.map((section, index) => {
              const Component = section.component;
              return (
                <div key={section.id} id={section.id} className="scroll-mt-4">
                  {/* Section Header with Divider */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {index + 1}. {section.label}
                    </h3>
                    <div className="w-full h-px bg-gray-300"></div>
                  </div>
                  
                  {/* Section Content */}
                  <div className="mb-8">
                    <Component />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Save Button at Bottom */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-teal-600 text-white font-medium rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Save Quotation
              </button>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default QuotationForm;
