const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store for demonstration
let items = [
  { id: 1, name: 'Item 1', description: 'First item' },
  { id: 2, name: 'Item 2', description: 'Second item' }
];
let nextId = 3; // ID counter for efficient ID generation

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// GET - Retrieve all items
app.get('/api/items', (req, res) => {
  res.status(200).json({ items, count: items.length });
});

// GET - Retrieve a specific item by ID
app.get('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find(i => i.id === id);
  
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  res.status(200).json(item);
});

// POST - Create a new item
app.post('/api/items', (req, res) => {
  const { name, description } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  const newItem = {
    id: nextId++,
    name,
    description: description || ''
  };
  
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT - Update an existing item
app.put('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, description } = req.body;
  const itemIndex = items.findIndex(i => i.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  // Validate that at least one field is provided for update
  if (name === undefined && description === undefined) {
    return res.status(400).json({ error: 'At least one field (name or description) must be provided' });
  }
  
  if (name !== undefined) items[itemIndex].name = name;
  if (description !== undefined) items[itemIndex].description = description;
  
  res.status(200).json(items[itemIndex]);
});

// DELETE - Delete an item
app.delete('/api/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const itemIndex = items.findIndex(i => i.id === id);
  
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  
  const deletedItem = items.splice(itemIndex, 1)[0];
  res.status(200).json({ message: 'Item deleted', item: deletedItem });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API',
    endpoints: {
      health: 'GET /health',
      items: {
        getAll: 'GET /api/items',
        getById: 'GET /api/items/:id',
        create: 'POST /api/items',
        update: 'PUT /api/items/:id',
        delete: 'DELETE /api/items/:id'
      }
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to see available endpoints`);
});

module.exports = app;
