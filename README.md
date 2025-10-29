# openshift-lab

A basic REST API server built with Node.js and Express.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd openshift-lab
```

2. Install dependencies:
```bash
npm install
```

### Running the Server

Start the server:
```bash
npm start
```

The server will start on port 3000 by default. You can set a custom port using the `PORT` environment variable:
```bash
PORT=8080 npm start
```

## API Endpoints

### Health Check
- **GET** `/health` - Check server health status

### Items API
- **GET** `/api/items` - Retrieve all items
- **GET** `/api/items/:id` - Retrieve a specific item by ID
- **POST** `/api/items` - Create a new item
- **PUT** `/api/items/:id` - Update an existing item
- **DELETE** `/api/items/:id` - Delete an item

### Root
- **GET** `/` - Display available endpoints

## Example Usage

### Get all items
```bash
curl http://localhost:3000/api/items
```

### Get a specific item
```bash
curl http://localhost:3000/api/items/1
```

### Create a new item
```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -d '{"name": "New Item", "description": "A new item description"}'
```

### Update an item
```bash
curl -X PUT http://localhost:3000/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Item", "description": "Updated description"}'
```

### Delete an item
```bash
curl -X DELETE http://localhost:3000/api/items/1
```

## Response Format

All API responses are in JSON format. Example response:
```json
{
  "items": [
    {
      "id": 1,
      "name": "Item 1",
      "description": "First item"
    }
  ],
  "count": 1
}
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error