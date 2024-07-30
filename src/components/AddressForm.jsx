

const AddressForm = ({ index, register, errors, remove, handlePostcodeBlur, isLoading }) => {
  return (
    <div className="border p-4 mb-4 rounded">
      <h4 className="text-lg font-semibold mb-2">Address {index + 1}</h4>
      <div className="space-y-2">
        <div  className="card-title text-primary flex flex-col items-start">
          <label className="block mb-1">Address Line 1</label>
          <input
            {...register(`addresses.${index}.addressLine1`, { required: 'Address Line 1 is required' })}
            className="w-full p-2 border rounded"
          />
          {errors.addresses?.[index]?.addressLine1 && (
            <span className="text-red-500">{errors.addresses[index].addressLine1.message}</span>
          )}
        </div>

        <div  className="card-title text-primary flex flex-col items-start">
          <label className="block mb-1">Address Line 2</label>
          <input
            {...register(`addresses.${index}.addressLine2`)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div  className="card-title text-primary flex flex-col items-start">
          <label className="block mb-1">Postcode</label>
          <input
            {...register(`addresses.${index}.postcode`, {
              required: 'Postcode is required',
              pattern: {
                value: /^[0-9]{6}$/,
                message: 'Invalid postcode format',
              },
              maxLength: { value: 6, message: 'Postcode must be 6 digits' },
            })}
            onBlur={(e) => handlePostcodeBlur(e, index)}
            className="w-full p-2 border rounded"
          />
          {errors.addresses?.[index]?.postcode && (
            <span className="text-red-500">{errors.addresses[index].postcode.message}</span>
          )}
          {isLoading && <span className="ml-2">Loading...</span>}
        </div>

        <div  className="card-title text-primary flex flex-col items-start">
          <label className="block mb-1">City</label>
          <input
            {...register(`addresses.${index}.city`, { required: 'City is required' })}
            className="w-full p-2 border rounded"
            readOnly
          />
        </div>

        <div  className="card-title text-primary flex flex-col items-start">
          <label className="block mb-1">State</label>
          <input
            {...register(`addresses.${index}.state`, { required: 'State is required' })}
            className="w-full p-2 border rounded"
            readOnly
          />
        </div>
      </div>
      <button
        type="button"
        onClick={() => remove(index)}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
      >
        Remove Address
      </button>
    </div>
  );
};

export default AddressForm;