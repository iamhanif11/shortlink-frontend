import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function ListLinks() {
  const [links, setLinks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchLinks = async () => {
      const token = localStorage.getItem("token");

      if (!token || token === "undefined") {
        toast.error("Sesi Anda telah berakhir. Silakan login kembali.");
        navigate("/auth");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/links", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (response.ok && result.isSucces) {
          setLinks(result.data || []);
        } else {
          toast.error(result.message || "Gagal memuat daftar tautan.");
        }
      } catch {
        toast.error("Gagal terhubung ke server. Pastikan backend Go menyala.");
      } finally {
        setIsLoading(false); 
      }
    };

    
    fetchLinks();
  }, [navigate]);

  
  const handleCopy = (shortUrl) => {

    const fullUrl = shortUrl.startsWith("http")
      ? shortUrl
      : `http://${shortUrl}`;
    navigator.clipboard.writeText(fullUrl);
    toast.success("Tautan berhasil disalin!");
  };

  //FUNGSI INTEGRASI DELETE KE API
  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus tautan ini?")) return;

    const token = localStorage.getItem("token");
    const deleteToast = toast.loading("Sedang menghapus tautan...");

    try {
      const response = await fetch(`http://localhost:8080/api/links/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok && result.isSucces) {
        toast.dismiss(deleteToast);
        toast.success("Tautan berhasil dihapus!");
        // Saring state lokal agar item yang dihapus langsung hilang dari layar
        setLinks(links.filter((link) => link.id !== id));
      } else {
        toast.dismiss(deleteToast);
        toast.error(result.message || "Gagal menghapus tautan.");
      }
    } catch {
      toast.dismiss(deleteToast);
      toast.error("Gagal terhubung ke server.");
    }
  };

  // OGIKA FILTER PENCARIAN LOKAL
  const filteredLinks = links.filter((link) => {
    const query = searchQuery.toLowerCase();
    return (
      link.short_url?.toLowerCase().includes(query) ||
      link.original_url?.toLowerCase().includes(query) ||
      link.slug?.toLowerCase().includes(query)
    );
  });

  
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
      .toUpperCase();
  };

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] font-sans text-gray-800 px-4 py-10 flex flex-col items-center">
      {/* KONTEN UTAMA */}
      <div className="w-full max-w-[760px] mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              My Links
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage and track your shortened digital assets.
            </p>
          </div>
          <div className="text-right">
            <span className="block text-[11px] font-bold text-gray-400 tracking-wider uppercase">
              Total Active
            </span>
            <span className="text-3xl font-extrabold text-blue-600 tracking-tight leading-none block mt-1">
              {links.length}
            </span>
          </div>
        </div>

        {/* INPUT PENCARIAN */}
        <div className="w-full bg-white rounded-xl border border-gray-100 shadow-sm px-4 flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-gray-300 flex-shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.604 10.604Z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or URL..."
            className="w-full py-4 text-sm bg-transparent text-gray-700 placeholder:text-gray-400 focus:outline-none"
          />
        </div>

        {/* LISTING KARTU LINK */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-12 text-sm text-gray-400 font-medium">
              Loading assets from server...
            </div>
          ) : filteredLinks.length === 0 ? (
            <div className="text-center py-12 text-sm text-gray-400 font-medium bg-white rounded-xl border border-gray-100">
              No short links found.
            </div>
          ) : (
            filteredLinks.map((link) => (
              <div
                key={link.id}
                className="w-full bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4 transition-all hover:border-gray-200"
              >
                {/* Info Sisi Kiri Link */}
                <div className="space-y-1.5 flex-grow min-w-0">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-sm tracking-wide">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                      className="w-4 h-4 flex-shrink-0"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                      />
                    </svg>


                    <a
                      href={
                        link.slug
                          ? `http://localhost:8080/${link.slug}`
                          : link.original_url
                      }
                      target="_blank"
                      rel="noreferrer"
                      className="hover:underline break-all"
                      title="Buka Tautan Pendek"
                    >
                      {/* Menampilkan alamat domain shortlink tiruan atau alamat asli dari object state */}
                      {link.short_url || `short.link/${link.slug}`}
                    </a>
                  </div>

                  <p
                    className="text-xs text-gray-400 font-medium truncate pr-4"
                    title={link.original_url}
                  >
                    {link.original_url}
                  </p>

                  {/* Meta Informasi */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] font-bold text-gray-400 tracking-wider uppercase pt-1">
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                        />
                      </svg>
                      {formatDate(link.created_at)}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                        />
                      </svg>
                      {link.click_count || 0} Clicks
                    </span>
                  </div>
                </div>

                {/* Tombol Aksi Kanan */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={() => handleCopy(link.short_url)}
                    className="p-2.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors shadow-sm cursor-pointer"
                    title="Copy Link"
                  >
                    <img src="public/button.svg" alt="copy" />
                
                  </button>

                  <button
                    onClick={() => handleDelete(link.id)}
                    className="p-2.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                    title="Delete Link"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between text-xs font-semibold text-gray-500 pt-4 px-1">
          <button className="flex items-center gap-1 hover:text-gray-900 transition-colors cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            Prev Page
          </button>

          <div className="flex items-center gap-2">
            <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-bold text-center">
              1
            </span>
            <span className="text-gray-400 font-medium">of</span>
            <span className="font-bold text-gray-700">1</span>
          </div>

          <button className="flex items-center gap-1 hover:text-gray-900 transition-colors cursor-pointer">
            Next Page
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListLinks;
