import React, { useEffect, useState } from "react";
import "./HouseTable.css";

const HouseTable = () => {
  const [houses, setHouses] = useState([]);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;
  const [inputPage, setInputPage] = useState(""); // Untuk input halaman

  useEffect(() => {
    console.log("📢 Fetching data from /data_rumah.json...");
    fetch("/data_rumah.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("📊 Data berhasil dimuat:", data);
        setHouses(data);
      })
      .catch((error) => console.error("❌ Error fetching data:", error));
  }, []);

  const pageCount = Math.ceil(houses.length / rowsPerPage);
  const paginatedData = houses.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  // Fungsi untuk pergi ke halaman tertentu (mencegah input angka < 1)
  const goToPage = () => {
    const pageNumber = parseInt(inputPage, 10);

    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= pageCount) {
      setPage(pageNumber - 1);
    } else {
      alert(`Halaman harus di antara 1 - ${pageCount}`);
    }
  };

  return (
    <div className="table-container">
      <h2 className="nama-table">Daftar Rumah</h2>
      <table className="house-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Rumah</th>
            <th>Harga</th>
            <th>LB</th>
            <th>LT</th>
            <th>KT</th>
            <th>KM</th>
            <th>GRS</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((house, index) => (
            <tr key={index}>
              <td>{house.NO}</td>
              <td>{house["NAMA RUMAH"]}</td>
              <td>Rp {parseInt(house.HARGA).toLocaleString("id-ID")}</td>
              <td>{house.LB}</td>
              <td>{house.LT}</td>
              <td>{house.KT}</td>
              <td>{house.KM}</td>
              <td>{house.GRS}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination Controls */}
        <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page === 0}>
                ⬅ Prev
            </button>

            <span className="page-info">Page {page + 1} of {pageCount}</span> {/* Tambahkan class */}
            
            <button onClick={() => setPage(page + 1)} disabled={page + 1 === pageCount}>
                Next ➡
            </button>
        </div>


      {/* Input untuk pergi ke halaman tertentu */}
    {/* Input untuk pergi ke halaman tertentu */}
        <div className="page-input-container">
        <input
                type="number"
                placeholder="Go to page..."
                value={inputPage}
                min="1" 
                onChange={(e) => {
                const value = e.target.value;

                // Izinkan input kosong agar pengguna bisa mengetik angka berapa pun
                if (value === "") {
                    setInputPage(value);
                } 
                // Validasi: Hanya terima angka >= 1
                else if (/^\d+$/.test(value) && parseInt(value, 10) >= 1) {
                    setInputPage(value);
                }
                }}
            />
            <button onClick={goToPage}>Go</button>
        </div>
    </div>
  );
};

export default HouseTable;
