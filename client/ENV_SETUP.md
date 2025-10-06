# Environment Configuration

## Development Setup

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Update the API URL in .env if needed:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

- `NEXT_PUBLIC_API_URL`: The URL of your backend server (default: http://localhost:3000)
- `NODE_ENV`: Environment mode (development/production)
