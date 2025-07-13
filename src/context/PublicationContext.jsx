// src/context/PublicationContext.jsx

import React, { createContext, useState, useEffect } from "react";
import { publicationService } from "../services/publicationService";
import { useAuth } from "../hooks/useAuth";

const PublicationContext = createContext(null);
const PublicationProvider = ({ children }) => {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return; // jangan fetch kalau belum login

      setLoading(true);
      try {
        const data = await publicationService.getPublications(token);
        setPublications(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Gagal mengambil data publikasi");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const addPublication = async (newPub) => {
    try {
      const added = await publicationService.addPublication(newPub, token);
      setPublications((prev) => [added, ...prev]);
      setError(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const editPublication = async (updatedPub) => {
    try {
      const edited = await publicationService.editPublication(updatedPub, token);
      setPublications((prev) =>
        prev.map((pub) => (pub.id === edited.id ? edited : pub))
      );
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const deletePublication = async (id) => {
    try {
      await publicationService.deletePublication(id, token);
      setPublications((prev) => prev.filter((pub) => pub.id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <PublicationContext.Provider
      value={{
        publications,
        loading,
        error,
        addPublication,
        editPublication,
        deletePublication,
      }}
    >
      {children}
    </PublicationContext.Provider>
  );
};

// const initialPublications = [
//   {
//     id: 1,
//     title: "Statistik Air Bersih Provinsi NTT 2023",
//     releaseDate: "2025-03-07",
//     description:
//       "Publikasi ini menyajikan data dan analisis mengenai akses rumah tangga terhadap sumber air minum layak...",
//     coverUrl: "https://res.cloudinary.com/dqpffql8l/image/upload/v1752333202/air-bersih_bfru1l.png",
//   },
//   {
//     id: 2,
//     title: "Provinsi Nusa Tenggara Timur Dalam Angka 2024",
//     releaseDate: "2024-02-28",
//     description:
//       "Publikasi ini merupakan publikasi tahunan yang diterbitkan oleh Badan Pusat Statistik Provinsi Nusa Tenggara Timur",
//     coverUrl: "https://res.cloudinary.com/dqpffql8l/image/upload/v1752333203/ntt-angka_gmsh9n.png",
//   },
//   {
//     id: 3,
//     title:
//       "Statistik Sosial dan Kependudukan Provinsi Nusa Tenggara Timur 2024",
//     releaseDate: "2025-05-28",
//     description:
//       "Publikasi ini merupakan salah satu wujud sumbangsih BPS, khususnya BPS Provinsi Nusa Tenggara Timur, dalam hal penyediaan data di bidang sosiodemografi masyarakat Nusa Tenggara Timur. ",
//     coverUrl: "https://res.cloudinary.com/dqpffql8l/image/upload/v1752333202/sampul-statistik-sosial_worccp.webp",
//   },
// ];

// const PublicationProvider = ({ children }) => {
//   const [publications, setPublications] = useState(() => {
//     const savedPublications = localStorage.getItem("publications");
//     return savedPublications
//       ? JSON.parse(savedPublications)
//       : initialPublications;
//   });

  // Simpan ke localStorage setiap kali publications berubah
//   useEffect(() => {
//     localStorage.setItem("publications", JSON.stringify(publications));
//   }, [publications]);

//   const addPublication = (newPub) => {
//     setPublications((prev) => [...prev, newPub]);
//   };

//   const editPublication = (updatedPub) => {
//     setPublications((prev) =>
//       prev.map((pub) => (pub.id === updatedPub.id ? updatedPub : pub))
//     );
//   };

//   const deletePublication = (id) => {
//     setPublications((prev) => prev.filter((pub) => pub.id !== id));
//   };

//   return (
//     <PublicationContext.Provider
//       value={{
//         publications,
//         addPublication,
//         editPublication,
//         deletePublication,
//       }}
//     >
//       {children}
//     </PublicationContext.Provider>
//   );
// };

export { PublicationContext, PublicationProvider };
