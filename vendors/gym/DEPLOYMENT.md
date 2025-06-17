# Gym Membership Server - Vercel Deployment Guide

## 🚀 Deploying to Vercel

This Express server is configured for deployment on Vercel's serverless platform.

### Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas**: Set up a cloud MongoDB database
3. **GitHub Repository**: Push your code to GitHub
4. **Bun Runtime**: Ensure bun is installed locally

### 📋 Step-by-Step Deployment

#### 1. Install Dependencies

```bash
cd vendors/gym
~/.bun/bin/bun install
```

#### 2. Build the Project

```bash
~/.bun/bin/bun run build
```

#### 3. Set Up MongoDB Atlas

1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a new cluster
3. Get your connection string (replace `<username>`, `<password>`, `<cluster-url>`)
4. Whitelist Vercel's IP ranges (or use 0.0.0.0/0 for all IPs)

#### 4. Deploy to Vercel

**Option A: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from gym directory
cd vendors/gym
vercel
```

**Option B: Using Vercel Dashboard**

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Set root directory to `vendors/gym`
5. Configure build settings (see below)

#### 5. Configure Environment Variables

In Vercel Dashboard, go to Project Settings → Environment Variables and add:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/gym-membership?retryWrites=true&w=majority
NODE_ENV=production
X402_RECIPIENT_ADDRESS=0x9bfeBd2E81725D7a3282cdB01cD1C3732178E954
X402_FACILITATOR_URL=https://x402.org/facilitator
```

### ⚙️ Vercel Build Configuration

The following files configure Vercel deployment:

**vercel.json** (already created):

```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.ts"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "src/index.ts": {
      "maxDuration": 30
    }
  }
}
```

**Build Settings in Vercel Dashboard:**

- Framework Preset: `Other`
- Root Directory: `vendors/gym`
- Build Command: `bun run vercel-build`
- Output Directory: `dist` (auto-detected)
- Install Command: `bun install`

### 🔧 Key Modifications for Serverless

The following changes were made to make the Express app compatible with Vercel:

1. **Database Connection Caching**: MongoDB connections are cached and reused
2. **Conditional app.listen()**: Only runs in development mode
3. **Export Default**: App is exported for Vercel to use
4. **Error Handling**: Removed `process.exit()` calls that would crash serverless functions

### 📡 API Endpoints

Once deployed, your API will be available at:

- `https://your-app.vercel.app/`
- `https://your-app.vercel.app/buy-membership` (POST)
- `https://your-app.vercel.app/generate-day-pass` (POST)
- `https://your-app.vercel.app/get-membership-details/:id` (GET)
- `https://your-app.vercel.app/memberships/history` (GET)
- `https://your-app.vercel.app/day-passes/history` (GET)

### 🧪 Testing the Deployment

1. **Health Check**: Visit `https://your-app.vercel.app/`
2. **API Testing**: Use the provided `test-endpoints.sh` script
3. **MongoDB Connection**: Check Vercel function logs for connection status

### 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data to git
2. **CORS**: Configure CORS for your frontend domain
3. **Rate Limiting**: Consider adding rate limiting for production
4. **MongoDB Security**: Use MongoDB Atlas IP whitelisting and authentication

### 🐛 Troubleshooting

**Common Issues:**

1. **MongoDB Connection Timeout**

   - Check connection string format
   - Verify IP whitelist includes Vercel IPs
   - Ensure cluster is running

2. **Function Timeout**

   - Increase `maxDuration` in vercel.json
   - Check for infinite loops or slow queries

3. **Build Errors**

   - Ensure all dependencies are in package.json
   - Check TypeScript compilation errors
   - Verify file paths are correct

4. **X402 Payment Issues**
   - Verify X402 configuration
   - Check recipient address format
   - Ensure facilitator URL is accessible

### 📝 Logs and Monitoring

- **View Logs**: Vercel Dashboard → Functions → View Function Logs
- **Real-time Logs**: Use `vercel logs` command
- **Monitoring**: Set up Vercel Analytics and monitoring

### 🔄 Continuous Deployment

Vercel automatically deploys when you push to your connected Git repository:

1. **Production**: Deploys from `main` branch
2. **Preview**: Deploys from feature branches
3. **Environment Variables**: Can be different per environment

---

## 🎯 Next Steps After Deployment

1. **Custom Domain**: Add your custom domain in Vercel settings
2. **Monitoring**: Set up error tracking and performance monitoring
3. **Database Backup**: Configure MongoDB Atlas automated backups
4. **API Documentation**: Create API documentation for your endpoints
5. **Rate Limiting**: Implement rate limiting for production use

Your gym membership server is now ready for production! 🏋️‍♂️
