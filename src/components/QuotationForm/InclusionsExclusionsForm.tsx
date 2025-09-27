import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { QuotationData } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

const InclusionsExclusionsForm: React.FC = () => {
  const { control, register, watch, setValue } = useFormContext<QuotationData>();
  
  const { 
    fields: inclusionsFields, 
    append: appendInclusion, 
    remove: removeInclusion 
  } = useFieldArray({
    control,
    name: 'inclusions',
  });
  
  const { 
    fields: exclusionsFields, 
    append: appendExclusion, 
    remove: removeExclusion 
  } = useFieldArray({
    control,
    name: 'exclusions',
  });

  const inclusions = watch('inclusions');
  const itinerary = watch('itinerary');
  const toyTrainInclusion = "Toy train tickets are complimentary for Comfort & Luxury packages (based on IRCTC availability)";

  React.useEffect(() => {
    const hasOoty = (itinerary || []).some((day: any) => {
      const location = (day?.location || '').toString().trim().toUpperCase();
      return location === 'OOTY';
    });

    const currentInclusions = Array.isArray(inclusions) ? inclusions : [];
    const hasToyTrain = currentInclusions.includes(toyTrainInclusion);

    if (hasOoty && !hasToyTrain) {
      setValue('inclusions', [...currentInclusions, toyTrainInclusion], { shouldDirty: true, shouldTouch: true });
    } else if (!hasOoty && hasToyTrain) {
      setValue('inclusions', currentInclusions.filter((item) => item !== toyTrainInclusion), { shouldDirty: true, shouldTouch: true });
    }
  }, [JSON.stringify(itinerary || []), Array.isArray(inclusions) ? inclusions.join('|') : '', setValue]);

  
  return (
    <div className="space-y-8">
      {/* Inclusions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Inclusions</h3>
          <button
            type="button"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            onClick={() => appendInclusion('')}
          >
            <Plus size={16} className="mr-1" />
            Add Inclusion
          </button>
        </div>
        
        <div className="space-y-2">
          {inclusionsFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                placeholder="e.g. Hotel accommodation"
                {...register(`inclusions.${index}` as const)}
              />
              <button
                type="button"
                onClick={() => removeInclusion(index)}
                className="p-1.5 text-gray-500 hover:text-red-500 focus:outline-none"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          
          {inclusionsFields.length === 0 && (
            <p className="text-sm text-gray-500 italic">No inclusions added yet.</p>
          )}
        </div>
      </div>
      
      {/* Exclusions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Exclusions</h3>
          <button
            type="button"
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            onClick={() => appendExclusion('')}
          >
            <Plus size={16} className="mr-1" />
            Add Exclusion
          </button>
        </div>
        
        <div className="space-y-2">
          {exclusionsFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-2">
              <input
                type="text"
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500 sm:text-sm"
                placeholder="e.g. Airfare"
                {...register(`exclusions.${index}` as const)}
              />
              <button
                type="button"
                onClick={() => removeExclusion(index)}
                className="p-1.5 text-gray-500 hover:text-red-500 focus:outline-none"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
          
          {exclusionsFields.length === 0 && (
            <p className="text-sm text-gray-500 italic">No exclusions added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default InclusionsExclusionsForm;
