import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cat, setCat] = useState(null);
  const [likedCats, setLikedCats] = useState([]);
  const [dislikedCats, setDislikedCats] = useState([]);
  const [loading, setLoading] = useState(false);

  // API orqali yangi mushuk rasmini olish
  const fetchCat = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      const data = await response.json();
      setCat(data[0]);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
    setLoading(false);
  };

  // Birinchi marta yuklanganda mushukni ko'rsatish
  useEffect(() => {
    fetchCat();
  }, []);

  // Like bosilganda
  const toggleLike = () => {
    if (!cat) return;
    
    const isLiked = likedCats.find(c => c.id === cat.id);
    if (isLiked) {
      setLikedCats(likedCats.filter(c => c.id !== cat.id));
    } else {
      // Agar dislike qilingan bo'lsa, avval dislikeni o'chiramiz
      setDislikedCats(dislikedCats.filter(c => c.id !== cat.id));
      setLikedCats([...likedCats, cat]);
    }
  };

  // Dislike bosilganda
  const toggleDislike = () => {
    if (!cat) return;

    const isDisliked = dislikedCats.find(c => c.id === cat.id);
    if (isDisliked) {
      setDislikedCats(dislikedCats.filter(c => c.id !== cat.id));
    } else {
      // Agar like qilingan bo'lsa, avval likeni o'chiramiz
      setLikedCats(likedCats.filter(c => c.id !== cat.id));
      setDislikedCats([...dislikedCats, cat]);
    }
  };

  // Statusni tekshirish (button rangini o'zgartirish uchun)
  const isCurrentlyLiked = cat && likedCats.some(c => c.id === cat.id);
  const isCurrentlyDisliked = cat && dislikedCats.some(c => c.id === cat.id);

  return (
    <div className="container">
      <h1>CAT APP</h1>
      <hr />

      {/* Asosiy Mushuk Maydoni */}
      <div className="main-cat">
        {loading ? <p>Yuklanmoqda...</p> : (
          cat && <img src={cat.url} alt="Random Cat" className="current-cat-img" />
        )}
        
        <div className="controls">
          <button 
            onClick={toggleLike} 
            className={`like-btn ${isCurrentlyLiked ? 'active-like' : ''}`}
          >
             Like
          </button>
          <button 
            onClick={toggleDislike} 
            className={`dislike-btn ${isCurrentlyDisliked ? 'active-dislike' : ''}`}
          >
             Dislike
          </button>
          <button onClick={fetchCat} className="next-btn"> Next Cat</button>
        </div>
      </div>

      <hr />

      {/* Liked Cats Bo'limi */}
      <section>
        <div className="section-header">
          <h2>Liked Cats: {likedCats.length}</h2>
          <button onClick={() => setLikedCats([])} className="clear-btn">Clear Likes</button>
        </div>
        <div className="cat-grid">
          {likedCats.map(c => <img key={c.id} src={c.url} alt="Liked" />)}
        </div>
      </section>

      <hr />

      {/* Disliked Cats Bo'limi */}
      <section>
        <div className="section-header">
          <h2>Disliked Cats: {dislikedCats.length}</h2>
          <button onClick={() => setDislikedCats([])} className="clear-btn">Clear Dislikes</button>
        </div>
        <div className="cat-grid">
          {dislikedCats.map(c => <img key={c.id} src={c.url} alt="Disliked" />)}
        </div>
      </section>
    </div>
  );
}

export default App;