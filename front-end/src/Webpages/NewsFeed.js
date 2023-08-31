import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Row, Col, Pagination, DropdownButton, Dropdown } from "react-bootstrap";
import axios from "axios";
import ArticleCard from "./ArticleCard";
import links from "../Components/HostedLinks";

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(9);
  const [fullData, setFullData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  var chosenCategories = sessionStorage.getItem("categories");
  if (chosenCategories !== null) {
    console.log(chosenCategories);
  }

  useEffect(() => {
    const fetchArticles = async () => {
      const res = await axios.get(`${links}api/articles`);
      setArticles(res.data);
      setFullData(res.data);
    };
    fetchArticles();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setArticles(fullData.filter((article) => article.category === category));
  };
  const handleCategoryClear = () => {
    setArticles(fullData);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let active = currentPage;
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(articles.length / articlesPerPage);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        {chosenCategories !== null &&
          chosenCategories !== "" &&
          chosenCategories.length > 0 && (
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "15px" }}
            >
              <DropdownButton title={selectedCategory || "Choose Category"}>
                {chosenCategories.split(",").map((item, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleCategorySelect(item)}
                  >
                    {item}
                  </Dropdown.Item>
                ))}
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    setSelectedCategory(null);
                    handleCategoryClear();
                  }}
                >
                  Cancel
                </Dropdown.Item>
              </DropdownButton>
            </div>
          )}{" "}
      </div>
      <Container className="my-8">
        <Row>
          {currentArticles.map((article, index) => (
            <Col sm={12} md={6} lg={4} key={index}>
              <ArticleCard article={article} />
            </Col>
          ))}
        </Row>
        <Pagination>{items}</Pagination>
      </Container>
    </motion.div>
  );
}

export default NewsFeed;
