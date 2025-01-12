import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaPlus, FaTrash } from "react-icons/fa";

const DynamicForm = () => {
  const [fields, setFields] = useState([{ id: Date.now() }]);
  const [formData, setFormData] = useState([]);

  const { control, handleSubmit, setValue, formState: { errors } } = useForm();

  const addField = () => {
    setFields([...fields, { id: Date.now() }]);
  };

  const deleteField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const onSubmit = (data) => {
    const submittedData = fields.map((field) => ({
      name: data[`name-${field.id}`],
      occupation: data[`occupation-${field.id}`],
    }));
    setFormData(submittedData);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-100 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Dynamic Form Selector</h2>



        {fields.map((field) => (
          <div key={field.id} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">

            {/* Input name Field */}
            <div className="w-full">
              <label htmlFor={`name-${field.id}`} className="block mb-1 text-gray-700">Name</label>
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
              {errors[`name-${field.id}`] && (
                <p className="text-red-500 text-sm mt-1">{errors[`name-${field.id}`]?.message}</p>
              )}
            </div>

            {/* Select Field */}
            <div className="w-full">
              <label htmlFor={`occupation-${field.id}`} className="block mb-1 text-gray-700">Occupation</label>
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
                <p className="text-red-500 text-sm mt-1">{errors[`occupation-${field.id}`]?.message}</p>
              )}
            </div>

            {/* Delete Button */}
            <button
              type="button"
              className="btn btn-error p-2  mt-7  text-sm"
              onClick={() => deleteField(field.id)}
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
            onClick={addField}
          >
            <FaPlus className="mr-2" />
            Add Field
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-accent w-full text-white hover:bg-sky-500 text-lg">
          Submit
        </button>
      </form>

      {/* Display Table */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 text-center text-blue-600">Form State:</h3>
        {formData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table-auto w-full bg-white rounded-lg shadow-md">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Occupation</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((data, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="px-4 py-2 text-center">{data.name}</td>
                    <td className="px-4 py-2 text-center">{data.occupation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-red-500">No data submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default DynamicForm;
