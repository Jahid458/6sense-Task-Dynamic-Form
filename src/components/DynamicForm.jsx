import  { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FaPlus, FaTrash } from 'react-icons/fa';

const DynamicForm = () => {
    const [fields, setFields] = useState([{ id: Date.now() }]);

    const {
    
        control,
        setValue,
        formState: { errors },
      } = useForm();
    
    
    return (
        <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
             <form className="space-y-6 p-6 bg-white rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Dynamic Form with Occupation Selector
        </h2>
        {fields.map((field) => (
          <div key={field.id} className="flex items-center space-x-4">


            {/* Input Fields in this Dynamic Form */}
            <div className="w-full">
              <label htmlFor={`name-${field.id}`} className="block mb-1 text-gray-700">Name</label>

              {/* Name Conroller */}
              <Controller
                name={`name-${field.id}`}
                control={control}
                defaultValue=""
                rules={{ required: "Name is required" }}
                render={({ field: inputField }) => (
                  <input
                    {...inputField}
                    type="text"
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                    onChange={(e) => {
                      inputField.onChange(e);
                      setValue(`name-${field.id}`, e.target.value);
                    }}
                  />
                )}
              />
              
              {/* {errors[`name-${field.id}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`name-${field.id}`]?.message}
                </p>
              )} */}
            </div>

            {/* Selected Occupation  */}
            <div className="w-full">
              <label htmlFor={`occupation-${field.id}`} className="block mb-1 text-gray-700">
                Occupation
              </label>
              <Controller
                name={`occupation-${field.id}`}
                control={control}
                defaultValue=""
                rules={{ required: "Occupation is required" }}
                render={({ field: selectField }) => (
                  <select
                    {...selectField}
                    className="select select-bordered w-full"
                    onChange={(e) => {
                      selectField.onChange(e);
                      setValue(`occupation-${field.id}`, e.target.value);
                    }}
                  >
                    <option value="">Select Occupation</option>
                    <option value="Engineer">Engineer</option>
                    <option value="Businessman">Businessman</option>
                    <option value="Teacher">Teacher</option>
                    <option value="Doctor">Doctor</option>
                  </select>
                )}
              />
              {errors[`occupation-${field.id}`] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[`occupation-${field.id}`]?.message}
                </p>
              )}
            </div>

            {/* Delete Button */}
            <button
              type="button"
              className="btn btn-error btn-md mt-6"
            //   onClick={() => deleteField(field.id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}

        {/* Add Button */}
        <div className="flex justify-center">
          <button
            type="button"
            className="btn btn-primary flex items-center"
            // onClick={addField}
          >
            <FaPlus className="mr-2" />
            Add Field
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-accent w-full text-white">
          Submit
        </button>
      </form>
        </div>
    );
};

export default DynamicForm;