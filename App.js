import "./styles.css";
import { useState } from "react";
import PredictionForm from "./components/PredictionForm";
import Result from "./components/Result";
import HouseTable from "./components/HouseTable"; // ✅ Import tabel

function App() {
  const [prediction, setPrediction] = useState(null);

  return (
    <div className="app">
      <header className="header">Prediksi Harga Rumah Wilayah Tebet Jaksel</header>

      <div className="main-content">
        {/* Container Prediksi */}
        <div className="container">
          <PredictionForm setPrediction={setPrediction} />
          <Result prediction={prediction} />
        </div>

        {/* ✅ Container HouseTable ditaruh di bawah */}
        <div className="table-wrapper">
          <HouseTable />
        </div>
      </div>

      <footer className="footer">&copy; 2025 Prediksi Harga Rumah</footer>
    </div>
  );
}

export default App;
