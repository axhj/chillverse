# Chillverse Upgraded

## Setup

### 1. Install dependencies

- **Frontend**:
  ```bash
  cd .
  npm install
  ```

- **Backend** (avatar proxy):
  ```bash
  cd server
  npm install
  ```

### 2. Populate `.env.local`

Fill in your API keys and model version:

```ini
VITE_REPLICATE_API_KEY=...
VITE_REPLICATE_MODEL_VERSION=<REPLICATE_MODEL_VERSION>
...
```

### 3. Dev Run

- **Start backend** (in one terminal):
  ```bash
  cd server
  npm run start
  ```

- **Start frontend** (in another terminal):
  ```bash
  npm run dev
  ```

### 4. Proxy Configuration

If you need to route `/api` to the backend during development, add this to your `vite.config.ts`:

```ts
export default defineConfig({
  // ...
  server: {
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
});
```

### 5. Usage

- The avatar generation endpoint is at `POST /api/avatar`.
- All other frontend features remain as before, now wired to real APIs.

## Deployment to Hostinger

1. **Local build**:
   ```bash
   npm install
   npm run build
   ```
   This creates a `dist/` folder.

2. **Prepare public files**:
   Copy the contents of `dist/` (not the folder itself) into your Hostinger `public_html/`.

3. **.htaccess**:
   The included `.htaccess` ensures SPA routing for Vite React apps.

4. **Environment Variables**:
   Your React build embeds `VITE_REPLICATE_API_KEY` at build time. Set it in `.env.local` locally before running the build:
   ```env
   VITE_REPLICATE_API_KEY=your_replicate_api_key_here
   VITE_LIBRIVOX_API_URL=https://librivox.org/api/feed/audiobooks/
   ```

Once uploaded, navigate to your domain (e.g., https://chillverse.store/) and it should serve `index.html` and route correctly without 404 errors.
