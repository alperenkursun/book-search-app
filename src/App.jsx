import React, { useState } from 'react';
import axios from 'axios';
import { Search, X, Loader2, BookImage } from 'lucide-react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setBooks([]);

    try {
      const response = await axios.get(
        `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=ebook&limit=24`
      );

      const formattedBooks = response.data.results.map((book) => ({
        id: book.trackId,
        title: book.trackName,
        authors: [book.artistName],
        cover: book.artworkUrl100.replace('100x100', '400x400'),
        publishDate: new Date(book.releaseDate).getFullYear() || 'N/A',
        publisher: 'Apple Books',
        pages: 'E-Kitap',
        language: 'Çok dilli',
        description: book.description || 'Bu kitap için açıklama bulunmuyor.',
        link: book.trackViewUrl
      }));

      setBooks(formattedBooks);
    } catch (error) {
      console.error("API Hatası:", error);
      alert("Bir bağlantı sorunu oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const openDetails = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div className="app-container">
      <header className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Book Search using React</h1>
          
          <form className="search-form" onSubmit={searchBooks}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Kitap veya yazar adı yazın..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-button" disabled={loading}>
              {loading ? <Loader2 className="spinner" size={20} /> : <Search size={20} />}
            </button>
          </form>
        </div>
      </header>

      <main className="main-content">
        {books.length === 0 && !loading && (
          <div className="empty-state">
            <BookImage size={48} strokeWidth={1} />
            <p>Arama yaparak kitapları keşfetmeye başlayın.</p>
          </div>
        )}

        <div className="books-grid">
          {books.map((book) => (
            <article className="book-card" key={book.id}>
              <div className="book-image-container">
                <img src={book.cover} alt={book.title} className="book-image" />
              </div>
              <div className="book-actions">
                <button className="action-btn" onClick={() => openDetails(book)}>DETAILS</button>
              </div>
              <h2 className="book-title">{book.title}</h2>
              <p className="book-author">{book.authors[0]}</p>
            </article>
          ))}
        </div>
      </main>

      {isModalOpen && selectedBook && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}><X size={24} /></button>
            
            <div className="modal-body">
              <div className="modal-image-wrapper">
                <img src={selectedBook.cover} alt={selectedBook.title} className="modal-image" />
              </div>
              
              <div className="modal-info">
                <h2 className="modal-title">{selectedBook.title}</h2>
                <h3 className="modal-author">{selectedBook.authors[0]}</h3>
                
                <div className="modal-details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Yayın Yılı</span>
                    <span className="detail-value">{selectedBook.publishDate}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Tür</span>
                    <span className="detail-value">E-Kitap</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Platform</span>
                    <span className="detail-value">Apple Books</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Durum</span>
                    <span className="detail-value">Aktif</span>
                  </div>
                </div>

                <div className="modal-description">
                  <p>{selectedBook.description.replace(/<[^>]*>?/gm, '')}</p>
                </div>

                <div className="modal-footer">
                  <a href={selectedBook.link} className="modal-preview-link" target="_blank" rel="noopener noreferrer">
                    Apple Books'ta Görüntüle
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;