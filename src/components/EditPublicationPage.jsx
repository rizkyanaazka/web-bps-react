import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PublicationContext } from "../context/PublicationContext";
import { uploadImageToCloudinary } from "../services/publicationService";

export default function EditPublicationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { publications, editPublication, deletePublication } =
    useContext(PublicationContext);

  const publication = publications.find((p) => p.id === Number(id));

  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (publication) {
      setTitle(publication.title);
      setReleaseDate(publication.releaseDate);
      setDescription(publication.description || "");
      setPreviewUrl(publication.coverUrl);
      setCoverFile(null);
    }
  }, [publication]);


  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    setCoverFile(file);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let coverUrl = previewUrl;

    if (coverFile) {
      try {
        coverUrl = await uploadImageToCloudinary(coverFile);
      } catch (err) {
        alert("Gagal upload gambar: " + err.message);
        return;
      }
    }

    const updatedPublication = {
      ...publication,
      title,
      releaseDate,
      description,
      coverUrl,
    };

    try {
      await editPublication(updatedPublication);
      navigate("/publications");
    } catch (err) {
      alert("Gagal menyimpan perubahan: " + err.message);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Yakin ingin menghapus publikasi ini?");
    if (!confirm) return;

    try {
      await deletePublication(publication.id);
      navigate("/publications");
    } catch (err) {
      alert("Gagal menghapus publikasi: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
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
        Edit Publikasi
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block mb-1 font-medium text-gray-700"
          >
            Judul
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Judul Publikasi"
            required
          />
        </div>

        <div>
          <label
            htmlFor="releaseDate"
            className="block mb-1 font-medium text-gray-700"
          >
            Tanggal Rilis
          </label>
          <input
            id="releaseDate"
            type="date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-1 font-medium text-gray-700"
          >
            Deskripsi
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Deskripsi Publikasi"
          />
        </div>
        <div>
          <label
            htmlFor="cover"
            className="block mb-1 font-medium text-gray-700"
          >
            Ganti Sampul
          </label>
          <input
            id="cover"
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="w-full px-4 py-2 border rounded"
          />
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview Sampul"
              className="mt-3 h-40 w-auto object-cover rounded shadow"
            />
          )}
        </div>

        <div className="flex justify-between gap-2 pt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Simpan
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Hapus
          </button>
          <button
            type="button"
            onClick={() => navigate("/publications")}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
