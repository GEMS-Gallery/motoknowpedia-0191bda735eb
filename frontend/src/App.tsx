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

  useEffect(() => {
    fetchArticles();
  }, []);

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

  return (
    <div className="wiki-layout">
      <AppBar position="static" className="wiki-header">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Wikipedia-like Message Board
          </Typography>
          <div className="wiki-search">
            <TextField
              placeholder="Search..."
              variant="outlined"
              size="small"
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Grid container>
        <Grid item xs={3}>
          <Drawer
            variant="permanent"
            anchor="left"
            className="wiki-sidebar"
            sx={{
              width: 240,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: 240,
                boxSizing: 'border-box',
              },
            }}
          >
            <Toolbar />
            <List>
              {articles.map((article, index) => (
                <ListItem button key={index} onClick={() => handleSelectArticle(article)}>
                  <ListItemText primary={article[0]} className="wiki-link" />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Grid>
        <Grid item xs={9}>
          <Container className="wiki-content" maxWidth="md">
            {loading ? (
              <CircularProgress />
            ) : selectedArticle ? (
              <div>
                <h1>{selectedArticle[0]}</h1>
                <p>{selectedArticle[1]}</p>
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
        </Grid>
      </Grid>
    </div>
  );
};

export default App;