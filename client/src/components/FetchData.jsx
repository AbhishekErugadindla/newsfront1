import React, { useEffect, useState } from 'react';
import { FacebookShareButton } from 'react-share';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import "../styles/FetchData.css";

const FetchData = ({ cat }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace this API URL with your GNews API endpoint
  const apiUrl = cat
    ? `https://gnews.io/api/v4/top-headlines?country=in&topic=${cat}&lang=en&token=501fd11891b7f44777eddf041c90d6a8`
    : `https://gnews.io/api/v4/top-headlines?country=in&lang=en&token=501fd11891b7f44777eddf041c90d6a8`;

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      // GNews API uses a different data structure, so we need to map it to match our component's expectations
      setData(
        result.articles.map((article) => ({
          title: article.title,
          image: article.image,
          description: article.description,
          url: article.url,
        }))
      );
    } catch (error) {
      setError('Error fetching data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cat]);

  const handleShareOnFacebook = (url) => {
    // Open Facebook sharing dialog
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
  };

  const handleShareOnWhatsApp = (url, title) => {
    // Construct a WhatsApp message
    const whatsappMessage = `Check out this news article: ${title}\n${url}`;
    // Encode the message
    const encodedMessage = encodeURIComponent(whatsappMessage);
    // Open WhatsApp with the message
    window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, '_blank');
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="page-background">
      <div className="container my-4">
        <div className="d-flex justify-content-center">
          <h3 className="text-center">
            <u>TOP HEADLINES</u>
          </h3>
        </div>
        <div className="container d-flex flex-column align-items-center my-3" style={{ minHeight: '100vh' }}>
          {data.map((item, index) => (
            <div
              className="container my-3 p-3 news-article"
              style={{ maxWidth: '600px', boxShadow: '2px 2px 10px silver', borderRadius: '12px', cursor: 'pointer' }}
              key={index}
            >
              <h5 className="my-3">{item.title}</h5>
              <div className="d-flex justify-content-center align-items-center flex-column article-image">
                <img
                  src={item.image || 'placeholder-image-url'} // Replace with a placeholder image URL
                  alt="Image not found"
                  className="img-fluid"
                  style={{ width: '100%', height: '300px', objectFit: 'cover', transition: 'transform 0.2s' }}
                />
              </div>
              <p className="my-1">{item.description}</p>
              <button className="btn btn-link w-100" onClick={() => window.open(item.url, '_blank')} rel="noopener noreferrer">
                View more..
              </button>
              <div className="my-2">
                {/* Share on WhatsApp */}
                <button className="btn btn-success mx-2 mb-2" onClick={() => handleShareOnWhatsApp(item.url, item.title)}>
                  <FaWhatsapp /> Share on WhatsApp
                </button>
                {/* Share on Facebook */}
                <FacebookShareButton url={item.url} quote={item.title}>
                  <div className="btn btn-primary mx-2 mb-2">
                    <FaFacebook /> Share on Facebook
                  </div>
                </FacebookShareButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FetchData;