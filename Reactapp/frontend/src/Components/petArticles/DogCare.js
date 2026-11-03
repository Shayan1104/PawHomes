// PetArticles.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import Dog from '../../Images/Dog.jpg';
import Cat from '../../Images/Cat.jpg';
import Cat1 from '../../Images/Cat1.jpg';

const PetArticles = () => {
  const articles = [
    { id: 'dog-care', title: 'Dog Care', image: Dog, description: 'Learn how to care for your dog with expert advice.' },
    { id: 'cat-care', title: 'Cat Care', image: Cat, description: 'Tips for keeping your cat happy and healthy.' },
    { id: 'rabbit-care', title: 'Kitten Care', image: Cat1, description: 'Best practices for caring for your kittens.' },
    { id: 'rabbit-care', title: 'Kitten Care', image: Cat1, description: 'Best practices for caring for your kittens.' },
  ];

  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Pet Articles</h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {articles.map((article) => (
            <div
              key={article.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '10px',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                backgroundColor: '#fff',
                transition: 'transform 0.2s ease',
              }}
            >
              <img
                src={article.image}
                alt={article.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
              <div style={{ padding: '10px 15px' }}>
                <h4>{article.title}</h4>
                <p style={{ fontSize: '14px', color: '#555' }}>{article.description}</p>
                <Link to={`/articles/${article.id}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PetArticles;
