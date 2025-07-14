import React, { useState } from 'react';
import { usePublications } from '../hooks/usePublications';
import { useNavigate } from 'react-router-dom';
import { uploadImageToCloudinary } from '../services/publicationService';

export default function AddPublicationPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const { addPublication } = usePublications();
  const navigate = useNavigate();

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCoverFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !releaseDate) {
      alert('Judul dan Tanggal Rilis harus diisi!');
      return;
    }

    let coverUrl = "";
    if (coverFile) {
      try {
        coverUrl = await uploadImageToCloudinary(coverFile);
      } catch (err) {
        alert("Gagal upload gambar: " + err.message);
        return;
      }
    } else {
      coverUrl = `https://placehold.co/200x280/7f8c8d/ffffff?text=${encodeURIComponent(title)}`;
    }

    const newPublication = {
      title,
      description,
      releaseDate,
      coverUrl,
    };

    try {
      await addPublication(newPublication);

      // reset state
      setTitle("");
      setDescription("");
      setReleaseDate("");
      setCoverFile(null);
      setPreviewUrl(null);

      navigate("/publications");
    } catch (err) {
      alert("Gagal menambah publikasi: " + err.message);
    }
  };

  return (
    <>
       <main
className="min-h-screen flex flex-col items-center justify-center space-y-4"
      style={{
        backgroundColor: "#6495ED",
        backgroundImage: `
      linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.2)),
      url('https://res.cloudinary.com/dqpffql8l/image/upload/v1752333202/pattern_fkv7a4.png')
    `,
      backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundBlendMode: "overlay",
      }}
    >
      <div
        className="h-40 flex items-center justify-center text-white text-2xl font-bold mb-8 mt-16"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dqpffql8l/image/upload/v1752333201/bg-title_x6ewpx.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        Tambah Publikasi
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-4"
      >
        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/dqpffql8l/image/upload/v1752333202/logo-bps_ggwlex.svg"
            alt="Logo BPS"
            className="h-16 w-auto mb-10"
          />
        </div>

        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <textarea
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          rows={4}
        />

        <input
          type="date"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          className="w-full px-4 py-2 border rounded"
        />

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview Sampul"
            className="h-40 object-cover rounded shadow"
          />
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </form>
      </main>
    </>
    
  );
}
