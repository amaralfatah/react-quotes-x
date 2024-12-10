// Import yang dibutuhkan dari React dan komponen lainnya
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import Button from '../Button';
import Style from './listAuthor.module.css';

export default function ListAuthor() {
  // State untuk menyimpan data penulis
  const [authors, setAuthors] = useState([]);
  // State untuk menandai proses loading
  const [isLoading, setIsLoading] = useState(true);
  // State untuk menyimpan nomor halaman
  const [page, setPage] = useState(1);

  // useEffect akan dijalankan setiap kali nilai page berubah
  useEffect(() => {
    // Controller untuk membatalkan fetch jika komponen unmount
    const controller = new AbortController();

    // Fungsi untuk mengambil data penulis dari API
    async function getAuthors() {
      setIsLoading(true);
      const signal = controller.signal;
      // Buat URL dengan parameter page
      const url =
        'https://api.quotable.io/authors?' + new URLSearchParams({ page });
      const res = await fetch(url, { signal });
      const data = await res.json();

      // Jika bukan halaman pertama, gabungkan data lama dengan data baru
      if (page > 1) {
        setAuthors((old) => ({
          ...data,
          results: [...old.results, ...data.results],
        }));
      } else {
        // Jika halaman pertama, langsung set data
        setAuthors(data);
      }
      setIsLoading(false);
    }

    getAuthors();

    // Cleanup function untuk membatalkan fetch saat unmount
    return () => {
      controller.abort();
    };
  }, [page]);

  return (
    <section className={Style.spaceSection}>
      <h2 className={Style.title}>List Author</h2>
      {/* Jika data kosong, tampilkan loader */}
      {isEmpty(authors) ? (
        <PulseLoader
          color="blue"
          size="6px"
          cssOverride={{ textAlign: 'center' }}
        />
      ) : (
        <>
          {/* Tampilkan daftar penulis */}
          <div className={Style.container}>
            {authors?.results?.map((author) => (
              <div key={author._id} className={Style.card}>
                <p className={Style.content}>{author.name}</p>
              </div>
            ))}
          </div>

          {/* Tombol Load More untuk halaman pertama */}
          {page === 1 && (
            <div style={{ textAlign: 'center', paddingTop: '1.5rem' }}>
              <Button onClick={() => setPage((old) => old + 1)}>
                Load More
              </Button>
            </div>
          )}
        </>
      )}

      {/* Tombol Load More untuk halaman selanjutnya dengan loading indicator */}
      {page > 1 && (
        <div style={{ textAlign: 'center', paddingTop: '1.5rem' }}>
          <Button onClick={() => setPage((old) => old + 1)}>
            {isLoading ? <PulseLoader color="white" size="6px" /> : 'Load More'}
          </Button>
        </div>
      )}
    </section>
  );
}

// Fungsi helper untuk mengecek apakah sebuah objek kosong
function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.hasOwn(obj, prop)) {
      return false;
    }
  }
  return true;
}
