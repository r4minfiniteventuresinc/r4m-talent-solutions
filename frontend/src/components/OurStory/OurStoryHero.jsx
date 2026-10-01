import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import '../../styles/components/OurStoryHero.css';

export default function OurStoryHero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <section className="r4m-story-hero">
        {/* Background Video / Image Wrapper */}
        <div className="r4m-story-hero__video-wrap">
          <video 
            className="r4m-story-hero__video" 
            autoPlay 
            loop 
            muted 
            playsInline
            poster="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
          >
            <source src="https://drive.google.com/uc?export=download&id=1Nai-jbdWZ--hHWHkf2Z02dakYhSJ6fxf" type="video/mp4" />
            <source src="https://drive.usercontent.google.com/download?id=1Nai-jbdWZ--hHWHkf2Z02dakYhSJ6fxf&export=download" type="video/mp4" />
          </video>
          <div className="r4m-story-hero__video-overlay"></div>
        </div>

        <div className="r4m-story-hero__container">
          {/* Floating Navbar */}
          <Navbar />

          {/* Hero Content Block */}
          <div className="r4m-story-hero__content">
            
            {/* Breadcrumbs */}
            <div className="r4m-story-hero__breadcrumb">
              <Link to="/" className="r4m-story-hero__link">Home</Link>
              <span className="r4m-story-hero__dot">•</span>
              <span className="r4m-story-hero__current">Our Story</span>
            </div>

            {/* Headline with white "Our" and orange "Story" */}
            <h1 className="r4m-story-hero__title">
              <span className="white-text">Our </span>
              <span className="orange-text">Story</span>
            </h1>
            <div className="r4m-story-hero__underline"></div>

            {/* Subtitle */}
            <p className="r4m-story-hero__subtitle">
              A story of people, purpose, and progress—building opportunities for a stronger tomorrow.
            </p>

            {/* Play Button Element */}
            <div className="r4m-story-hero__play-wrap" onClick={() => setIsVideoOpen(true)}>
              <button className="r4m-story-hero__play-btn" aria-label="Play Our Story Video">
                <i className="bi bi-play-fill"></i>
              </button>
              <div className="r4m-story-hero__play-meta">
                <span className="r4m-story-hero__play-title">Play Our Story</span>
                <span className="r4m-story-hero__play-duration">02:18</span>
              </div>
            </div>

          </div>
        </div>

        {/* Geometric Design Accents */}
        <div className="r4m-story-hero__accent-grey"></div>
        <div className="r4m-story-hero__accent-orange"></div>
      </section>

      {/* Fullscreen Video Modal */}
      {isVideoOpen && (
        <div className="r4m-story-modal" onClick={() => setIsVideoOpen(false)}>
          <div className="r4m-story-modal__content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="r4m-story-modal__close" 
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close video player"
            >
              <i className="bi bi-x-lg"></i>
            </button>
            <div className="r4m-story-modal__video-box">
              <iframe 
                src="https://drive.google.com/file/d/1Nai-jbdWZ--hHWHkf2Z02dakYhSJ6fxf/preview" 
                className="r4m-story-modal__video" 
                allow="autoplay; encrypted-media" 
                allowFullScreen
                title="Our Story Video"
                style={{ width: '100%', height: '100%', minHeight: '450px', border: 0, borderRadius: '12px' }}
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
