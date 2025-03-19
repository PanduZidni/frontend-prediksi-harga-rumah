import { useState } from "react";
import axios from "axios";

const PredictionForm = ({ setPrediction }) => {
  const [formData, setFormData] = useState({
    lb: "",
    lt: "",
    kt: "",
    km: "",
    grs: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://flask-prediksi.onrender.com/predict", formData);
      setPrediction(response.data.predicted_price * 1000000);

    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Masukkan Data Rumah</h2>

      {["lb", "lt", "kt", "km", "grs"].map((field) => (
        <div key={field} className="mb-3">
          <label className="block mb-1 capitalize">{field}:</label>
          <input
            type="number"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
      ))}

      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Prediksi
      </button>
    </form>
  );
};

export default PredictionForm;
