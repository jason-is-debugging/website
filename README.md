# Personal Website

A modern personal website with Go backend and Vue 3 frontend.

## Tech Stack

- **Frontend**: Vue 3 + TypeScript + Vite
- **Backend**: Go + Gin + GORM
- **Database**: SQLite
- **Features**: User authentication, admin panel, responsive design

## Project Structure

```
website/
├── backend/              # Go backend service
│   ├── config/          # Configuration
│   ├── database/        # Database connection
│   ├── handlers/        # HTTP handlers
│   ├── middleware/      # Middleware
│   ├── models/          # Data models
│   ├── router/          # Routes
│   ├── main.go         # Entry point
│   └── config.yaml     # Config file
├── frontend/            # Vue 3 frontend
│   ├── src/
│   │   ├── api/        # API calls
│   │   ├── router/     # Routes
│   │   ├── views/       # Pages
│   │   └── utils/       # Utilities
│   └── vite.config.ts  # Vite config
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+
- Go 1.21+
- npm or pnpm

### Backend

```bash
cd backend
go run main.go
```

The backend server will start on `http://localhost:8080`

### Frontend (Development)

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server will start on `http://localhost:5173`

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Build backend
cd ../backend
go build -o website .

# Run in production mode
./website
# or set mode=release in config.yaml
```

## API Endpoints

### Common
- `GET /api/health` - Health check
- `GET /api/ping` - Ping
- `GET /api/info` - Get info
- `GET /api/list` - Get paginated list

### Auth
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login

### Users
- `GET /api/user` - List users
- `GET /api/user/:id` - Get user
- `PUT /api/user/:id` - Update user
- `DELETE /api/user/:id` - Delete user

## Configuration

Edit `backend/config.yaml` to configure:

```yaml
server:
  port: "8080"

database:
  type: "sqlite"
  dsn: "website.db"

cors:
  allowOrigins:
    - "http://localhost:5173"
    - "http://localhost:3000"

mode: "debug"  # or "release"
```

## Development

The frontend development server proxies API requests to the backend. Make sure the backend is running before starting the frontend.

### Hot Reload

- Frontend: Automatic with Vite HMR
- Backend: Manual restart required

## License

MIT
