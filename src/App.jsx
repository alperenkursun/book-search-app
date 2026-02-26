import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import './App.css';

function App() {
  const[isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="app-container">
      <header className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Book Search using React</h1>
          
          <form className="search-form" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Book Title or Author ..." 
            />
            <button type="submit" className="search-button">
              <Search size={20} />
            </button>
          </form>
        </div>
      </header>

      <main className="main-content">
        <div className="books-grid">
          
          <article className="book-card">
            <div className="book-image-container">
              <img 
                src="https://images-na.ssl-images-amazon.com/images/I/91asIC1fSBL.jpg" 
                alt="React Cookbook" 
                className="book-image"
              />
            </div>
            <div className="book-actions">
              <button className="action-btn" onClick={openModal}>DETAILS</button>
            </div>
            <h2 className="book-title">React Cookbook</h2>
            <p className="book-author">Dawn Griffiths</p>
          </article>

          <article className="book-card">
            <div className="book-image-container">
              <img 
                src="https://m.media-amazon.com/images/I/81Y7y6-0pFL._AC_UF1000,1000_QL80_.jpg" 
                alt="React 17 Design Patterns" 
                className="book-image"
              />
            </div>
            <div className="book-actions">
              <button className="action-btn" onClick={openModal}>DETAILS</button>
            </div>
            <h2 className="book-title">React 17 Design Patterns and Best Practices</h2>
            <p className="book-author">Carlos Santana Roldan</p>
          </article>

          <article className="book-card">
            <div className="book-image-container">
              <img 
                src="https://m.media-amazon.com/images/I/71uM5E6P2AL._AC_UF1000,1000_QL80_.jpg" 
                alt="Practical Enterprise React" 
                className="book-image"
              />
            </div>
            <div className="book-actions">
              <button className="action-btn" onClick={openModal}>DETAILS</button>
            </div>
            <h2 className="book-title">Practical Enterprise React</h2>
            <p className="book-author">Ruby Jane Cabagnot</p>
          </article>

        </div>
      </main>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              <X size={24} />
            </button>
            
            <div className="modal-body">
              <div className="modal-image-wrapper">
                <img 
                  src="https://images-na.ssl-images-amazon.com/images/I/91asIC1fSBL.jpg" 
                  alt="React Cookbook" 
                  className="modal-image"
                />
              </div>
              
              <div className="modal-info">
                <h2 className="modal-title">React Cookbook</h2>
                <h3 className="modal-author">Dawn Griffiths, David Griffiths</h3>
                
                <div className="modal-details-grid">
                  <div className="detail-item">
                    <span className="detail-label">Yayın Tarihi</span>
                    <span className="detail-value">2021-08-31</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Sayfa Sayısı</span>
                    <span className="detail-value">550 Sayfa</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Yayınevi</span>
                    <span className="detail-value">O'Reilly Media</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Dil</span>
                    <span className="detail-value">İngilizce</span>
                  </div>
                </div>

                <div className="modal-description">
                  <p>
                    React helps you write logic that handles everything from data changes to rendering elements based on those changes. But what happens when things get complex? This cookbook provides the recipes you need to master React to build large, enterprise-class applications.
                  </p>
                </div>

                <div className="modal-footer">
                  <a href="#" className="modal-preview-link" target="_blank" rel="noopener noreferrer">
                    Kitabı İncele (Google Books)
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