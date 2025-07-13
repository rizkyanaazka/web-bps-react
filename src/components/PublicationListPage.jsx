import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PublicationContext } from "../context/PublicationContext";

export default function PublicationListPage() {
  const { publications } = useContext(PublicationContext);
  const navigate = useNavigate();

  const handleEdit = (pub) => {
    navigate(`/publications/edit/${pub.id}`);
  };

  const renderRow = (pub, index) => (
    <tr
      key={pub.id}
      className="border-t odd:bg-white even:bg-yellow-50 hover:bg-gray-100 transition-colors"
    >
      <td className="p-3 text-center">{index + 1}</td>
      <td className="p-3">{pub.title}</td>
      <td className="p-3 text-center">{pub.releaseDate}</td>
      <td className="p-3 text-center">
        <img
          src={pub.coverUrl}
          alt={pub.title}
          className="w-20 h-28 object-cover rounded shadow border mx-auto"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/120x160/cccccc/666666?text=No+Image";
          }}
        />
      </td>
      <td className="p-3 text-center">
        <button
          onClick={() => handleEdit(pub)}
          className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-600 hover:text-white text-sm font-medium transition"
        >
          Edit
        </button>
      </td>
    </tr>
  );

  return (
    <div>
      <div
        className="h-40 flex items-center justify-center text-white text-2xl font-bold mb-6"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dqpffql8l/image/upload/v1752333201/bg-title_x6ewpx.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        Daftar Publikasi
      </div>

      <div className="max-w-4xl mx-auto">
        <table className="w-full border-collapse bg-white shadow rounded">
          <thead>
            <tr className="bg-blue-800 text-left text-white">
              <th className="p-3 text-center">No</th>
              <th className="p-3 text-center">Judul</th>
              <th className="p-3 text-center">Tanggal</th>
              <th className="p-3 text-center">Sampul</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(publications) && publications.length > 0 ? (
              publications.map((pub, index) => renderRow(pub, index))
            ) : (
              <tr className="border-t">
                <td colSpan="5" className="p-3 text-center text-gray-500">
                  Tidak ada publikasi yang tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
