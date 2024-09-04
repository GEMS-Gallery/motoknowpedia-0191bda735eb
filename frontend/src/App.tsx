import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';
import { AppBar, Toolbar, Typography, TextField, Button, List, ListItem, ListItemText, CircularProgress, Drawer, Container, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const App: React.FC = () => {
  const [articles, setArticles] = useState<[string, string][]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<[string, string] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      searchArticles(searchQuery);
    } else {
      fetchArticles();
    }
  }, [searchQuery]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const fetchedArticles = await backend.getArticles();
      setArticles(fetchedArticles);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
    setLoading(false);
  };

  const searchArticles = async (query: string) => {
    setLoading(true);
    try {
      const searchResults = await backend.searchArticles(query);
      setArticles(searchResults);
    } catch (error) {
      console.error('Error searching articles:', error);
    }
    setLoading(false);
  };

  const handleAddArticle = async () => {
    if (newTitle.trim() && newContent.trim()) {
      setLoading(true);
      try {
        await backend.addArticle(newTitle, newContent);
        setNewTitle('');
        setNewContent('');
        await fetchArticles();
      } catch (error) {
        console.error('Error adding article:', error);
      }
      setLoading(false);
    }
  };

  const handleClearArticles = async () => {
    setLoading(true);
    try {
      await backend.clearArticles();
      await fetchArticles();
      setSelectedArticle(null);
    } catch (error) {
      console.error('Error clearing articles:', error);
    }
    setLoading(false);
  };

  const handleSelectArticle = (article: [string, string]) => {
    setSelectedArticle(article);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="wiki-layout">
      <AppBar position="fixed" className="wiki-header">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <a href="/" className="wiki-logo">Wikipedia-like Message Board</a>
          </Typography>
          <div className="wiki-search">
            <TextField
              placeholder="Search articles..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        className="wiki-sidebar"
        sx={{
          width: 200,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 200,
            boxSizing: 'border-box',
            marginTop: '64px',
          },
        }}
      >
        <List>
          {articles.map((article, index) => (
            <ListItem button key={index} onClick={() => handleSelectArticle(article)}>
              <ListItemText primary={article[0]} className="wiki-link" />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className="main-content">
        <Container className="wiki-content" maxWidth="md">
          {loading ? (
            <CircularProgress />
          ) : selectedArticle ? (
            <div className="wiki-article">
              <h1>{selectedArticle[0]}</h1>
              <div className="wiki-toc">
                <div className="wiki-toc-title">Contents</div>
                <ul>
                  <li><a href="#section1">1. Section 1</a></li>
                  <li><a href="#section2">2. Section 2</a></li>
                </ul>
              </div>
              <p>{selectedArticle[1]}</p>
              <div className="wiki-edit-history">
                <a href="#">Edit</a> | <a href="#">View history</a>
              </div>
            </div>
          ) : (
            <div>
              <h2>Add New Article</h2>
              <TextField
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Enter article title"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <TextField
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Enter article content"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                margin="normal"
              />
              <Button
                onClick={handleAddArticle}
                variant="contained"
                color="primary"
                disabled={loading}
              >
                Add Article
              </Button>
              <Button
                onClick={handleClearArticles}
                variant="outlined"
                color="secondary"
                className="ml-2"
                disabled={loading}
              >
                Clear All Articles
              </Button>
            </div>
          )}
        </Container>
      </main>
    </div>
  );
};

export default App;