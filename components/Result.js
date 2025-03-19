const Result = ({ prediction }) => {
    return (
      <div className="mt-4 p-4 border rounded shadow-md text-center">
        <h3 className="text-lg font-semibold">Hasil Prediksi</h3>
        {prediction ? (
          <p className="text-2xl font-bold text-green-500">
            Rp {prediction.toLocaleString("id-ID")}
          </p>
        ) : (
          <p className="text-gray-500">Masukkan data untuk melihat prediksi</p>
        )}
      </div>
    );
  };
  
  export default Result;
  