import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap'; 
import Swal from 'sweetalert2';
import EditForm from '../EditForm/EditForm'; 
import ShowDetails from '../ShowDetails/ShowDetails'; 
import './Article.css';

const Article = () => {
  const [articles, setArticles] = useState([]);
  const [productFamilies, setProductFamilies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false); 

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:4804/api/article');
      setArticles(response.data["$values"]);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductFamilies = async () => {
    try {
      const response = await axios.get('http://localhost:4804/api/ProductFamily');
      setProductFamilies(response.data["$values"]);
    } catch (error) {
      console.error("Error fetching product families:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchProductFamilies();
  }, []);

  const handleEdit = (id) => {
    setSelectedArticle(getArticleById(id));
    setEditMode(true);
  };

  const handleCloseEditForm = () => {
    setEditMode(false);
    setSelectedArticle(null);
    fetchArticles(); // Refresh article list after editing
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this article!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:4804/api/article/${id}`);
          fetchArticles(); // Fetch articles again after deletion
          Swal.fire(
            'Deleted!',
            'Your article has been deleted.',
            'success'
          );
        } catch (error) {
          console.error(`Error deleting article with id ${id}: `, error);
          Swal.fire(
            'Error!',
            'Failed to delete article.',
            'error'
          );
        }
      }
    });
  };

  const handleShowDetails = (id) => {
    setSelectedArticle(getArticleById(id));
    setShowDetailsModal(true); // Show details modal
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">
          Error: {error.message}
        </Alert>
      </Container>
    );
  }

  const getProductFamilyName = (id) => {
    const family = productFamilies.find(family => family.id === id);
    return family ? family.name : 'Unknown';
  };

  const getArticleById = (id) => {
    return articles.find(article => article.id === id);
  };

  return (
    <Container className="my-3">
      <Card className="modern-table">
        <Card.Body className="modern-table-body">
          <h2 className="article-title my-1">Article List</h2>
          <table className="table table-striped table-hover">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Item Type</th>
      <th scope="col">Item Number</th>
      <th scope="col">Description</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {articles.map((article, index) => (
      <tr key={article.id} className="article-row">
        <td>{index + 1}</td>
        <td>{article.itemType}</td>
        <td>{article.itemNumber}</td>
        <td>{article.description}</td>
        <td>
          <Button variant="link" onClick={() => handleEdit(article.id)}>Edit</Button>
          <Button variant="link" onClick={() => handleDelete(article.id)}>Delete</Button>
          <Button variant="link" onClick={() => handleShowDetails(article.id)}>Show Details</Button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
        </Card.Body>
        
        {editMode && (
          <EditForm articleId={selectedArticle?.id} onClose={handleCloseEditForm} />
        )}
        
        {showDetailsModal && (
          <ShowDetails 
            show={showDetailsModal} 
            onHide={() => setShowDetailsModal(false)} 
            article={selectedArticle} 
          />
        )}
      </Card>
    </Container>
  );
};

export default Article;
