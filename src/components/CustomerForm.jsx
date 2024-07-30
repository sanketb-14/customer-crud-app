import  { useState } from 'react';
//import react-hook-form form form handling
import { useForm, useFieldArray } from 'react-hook-form';
//for API calls
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyPAN, getPostcodeDetails } from '../api';
import AddressForm from './AddressForm';

const CustomerForm = () => {
    //extract id parameter from URL 
    const { id } = useParams();
    const navigate = useNavigate();
    const [panVerified, setPanVerified] = useState(false);
    


    const { register, handleSubmit, control, setValue,  formState: { errors } } =
    // default value set from localStorage if editing existing customer
     useForm({
      defaultValues: id ? JSON.parse(localStorage.getItem(`customer_${id}`)) : {},
    });
    
    //sets up an array of form fields for multiple addresses
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'addresses',
    });


  // sets up mutation for PAN verification
    const panMutation = useMutation({
      mutationFn: verifyPAN,
      //on success it updates the full name and sets panVerified to TRUE
      onSuccess: (data) => {
        if (data.isValid) {
          setValue('fullName', data.fullName);
          setPanVerified(true);
        }
      },
    });
    
    // sets up mutation for postcode verification
    const postcodeMutation = useMutation({
      mutationFn: getPostcodeDetails,
    });

   //handle form submission , check is pan is verified and updates customer in local storage and navigate back to customer list
    const onSubmit = (data) => {
      if (!panVerified) {
        alert('Please verify PAN before submitting');
        return;
      }
  
      const customers = JSON.parse(localStorage.getItem('customers') || '[]');
      if (id) {
        const index = customers.findIndex(c => c.id === id);
        customers[index] = { ...data, id };
      } else {
        customers.push({ ...data, id: Date.now().toString() });
      }
      localStorage.setItem('customers', JSON.stringify(customers));
      navigate('/');
    };
    
    //it triggers PAN  verification when PAN input loses focus and contain 10 characters
    const handlePANBlur = (e) => {
      const pan = e.target.value;
      if (pan.length === 10) {
        panMutation.mutate(pan);
      }
    };


   // triggers when postcode input loses focus and contains 6 characters
    const handlePostcodeBlur = (e, index) => {
      const postcode = e.target.value;
      if (postcode.length === 6) {
        postcodeMutation.mutate(postcode, {
            // on success it updates the city and state
          onSuccess: (data) => {
            setValue(`addresses.${index}.city`, data.city[0].name);
            setValue(`addresses.${index}.state`, data.state[0].name);
          },
        });
      }
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='card card-compact p-4 w-full max-w-4xl bg-base-200 rounded-xl shadow-xl'>
      <div className="card-title text-primary flex flex-col items-start">
        <label >PAN</label>
       
        <input
          {...register('pan', {
            required: 'PAN is required',
            pattern: {
              value: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
              message: 'Invalid PAN format',
            },
            maxLength: { value: 10, message: 'PAN must be 10 characters' },
          })}
          onBlur={handlePANBlur}
          className="w-full p-2 border rounded"
        />
        {errors.pan && <span className="text-red-500">{errors.pan.message}</span>}
        {panMutation.isPending && <span className="ml-2">Verifying...</span>}
      </div>

      <div className="card-title text-primary flex flex-col items-start">
        <label >Full Name</label>
        <input
          {...register('fullName', {
            required: 'Full Name is required',
            maxLength: { value: 140, message: 'Full Name must be at most 140 characters' },
          })}
          className="w-full p-2 border rounded"
        />
        {errors.fullName && <span className="text-red-500">{errors.fullName.message}</span>}
      </div>

      <div className="card-title text-primary flex flex-col items-start">
        <label >Email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            maxLength: { value: 255, message: 'Email must be at most 255 characters' },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          className="w-full p-2 border rounded"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>

      <div className="card-title text-primary flex flex-col items-start">
        <label >Mobile Number</label>
        <div className="flex">
          <span className="p-2 bg-gray-100 border rounded-l">+91</span>
          <input
            {...register('mobileNumber', {
              required: 'Mobile Number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Invalid mobile number format',
              },
              maxLength: { value: 10, message: 'Mobile Number must be 10 digits' },
            })}
            className="w-full p-2 border rounded-r"
          />
        </div>
        {errors.mobileNumber && <span className="text-red-500">{errors.mobileNumber.message}</span>}
      </div>

      <div >
        <h3 className="text-xl border-b-2 border-primary py-2 text-secondary text-center font-semibold mb-2">Addresses</h3>
        {fields.map((field, index) => (
          <AddressForm
            key={field.id}
            index={index}
            register={register}
            errors={errors}
            remove={remove}
            handlePostcodeBlur={handlePostcodeBlur}
            isLoading={postcodeMutation.isPending}
          />
        ))}
        {fields.length < 10 && (
          <button
            type="button"
            onClick={() => append({ addressLine1: '', addressLine2: '', postcode: '', city: '', state: '' })}
            className="btn btn-md btn-accent m-2"
          >
            Add Address
          </button>
        )}
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {id ? 'Update' : 'Add'} Customer
      </button>
    </form>
  );
};

export default CustomerForm;