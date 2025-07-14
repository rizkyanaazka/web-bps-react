import React, { useState } from 'react';
import { usePublications } from '../hooks/usePublications';
import { useNavigate } from 'react-router-dom';

export default function PublicationListPage() {
  const { publications } = usePublications();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalPub, setModalPub] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = searchQuery
    ? publications
        .filter(pub => pub.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 5)
    : [];

  const handleEdit = (pub) => {
    navigate(`/publications/edit/${pub.id}`);
  };

  const openModal = (pub) => {
    setModalPub(pub);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalPub(null);
  };

  const filteredPublications = publications.filter(pub => {
    const q = searchQuery.toLowerCase();
    return (
      pub.title.toLowerCase().includes(q) ||
      (pub.description && pub.description.toLowerCase().includes(q))
    );
  });

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
          onClick={() => openModal(pub)}
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
          backgroundImage:
            "url('https://res.cloudinary.com/dqpffql8l/image/upload/v1752333201/bg-title_x6ewpx.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        Daftar Publikasi
      </div>

      {showModal && modalPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl font-bold"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4 text-sky-800">{modalPub.title}</h3>
            <p className="text-gray-700 whitespace-pre-line">{modalPub.description}</p>
          </div>
        </div>
      )}

      <div className="mb-8 flex justify-center relative">
        <div className="w-full max-w-xl relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Cari publikasi..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-full bg-white focus:border-gray-500 text-sm outline-none"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-56 overflow-y-auto">
              {suggestions.map((pub) => (
                <li
                  key={pub.id}
                  className="px-4 py-2 cursor-pointer hover:bg-sky-100 text-gray-700"
                  onMouseDown={() => {
                    setSearchQuery(pub.title);
                    setShowSuggestions(false);
                  }}
                >
                  {pub.title}
                </li>
              ))}
            </ul>
          )}
        </div>
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
            {Array.isArray(filteredPublications) && filteredPublications.length > 0 ? (
              filteredPublications.map((pub, index) => renderRow(pub, index))
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
