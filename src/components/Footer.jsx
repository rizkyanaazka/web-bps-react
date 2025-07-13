import React from "react";

export default function Footer() {
  return (
    <div className="mt-12">
      {/* Bagian created by */}
      <p className="text-center text-sm text-gray-500 mb-4">
        Created by Rizkyana Azka Akhiria Ramadhanti (222313354@stis.ac.id)
      </p>
      <div>
        <img
          src="https://res.cloudinary.com/dqpffql8l/image/upload/v1752333201/footer-wave_vr6qbq.png"
          alt="Footer Wave"
          className="w-full mb-[-2px]"
        />
      </div>
      {/* Footer utama dengan wave dan info BPS */}
      <div className="bg-[#0A0A6D] text-white">
        {/* Wave image */}

        {/* Isi utama footer */}
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between gap-10">
          {/* Kolom kiri */}
          <div className="md:w-1/2">
            <div className="flex items-center gap-4 mb-4">
              <img
                src="/assets/logo-bps.svg"
                alt="Logo BPS"
                className="h-12 w-auto"
              />
              <h4 className="text-lg font-semibold">BADAN PUSAT STATISTIK</h4>
            </div>
            <p className="text-sm leading-relaxed">
              Badan Pusat Statistik Provinsi Nusa Tenggara Timur
              <br />
              Jl. R. Suprapto No. 5 Kupang - 85111
              <br />
              Telp (0380) 826289; 821755; Faks (0380) 833124
              <br />
              Email:{" "}
              <a href="mailto:pst5300@bps.go.id" className="underline">
                pst5300@bps.go.id
              </a>
            </p>
          </div>

          {/* Kolom kanan */}
          <div className="md:w-1/2 mt-8 ml-3">
            <h4 className="text-lg font-semibold mb-2">Tentang Kami</h4>
            <p className="text-sm leading-relaxed">
              Laman ini dibuat untuk tugas Pemrograman Berbasis Web Polstat
              STIS.
              <br />
              Untuk informasi lebih lanjut, silakan kunjungi{" "}
              <a
                href="https://www.bps.go.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline"
              >
                www.bps.go.id
              </a>
              <br />
              <em>"Dengan Data Kita Bangun Bangsa".</em>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
