# E-Commerce Deployment Guide

## Environment Variables Required

For successful deployment, you need to set the following environment variables in your hosting platform:

### Stripe Configuration

```bash
# Required for payment processing
STRIPE_SECRET_KEY=sk_test_... or sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... or pk_live_...
```

### How to Get Stripe Keys

1. **Stripe Secret Key & Publishable Key**:
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
   - Copy your publishable key (starts with `pk_`) and secret key (starts with `sk_`)
   - Use test keys for development, live keys for production

2. **Webhook Secret**:
   - Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
   - Create a new webhook endpoint pointing to: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the "Signing secret" (starts with `whsec_`)

## Deployment Instructions

### For Render.com

1. **Connect Repository**: Connect your GitHub repository to Render

2. **Service Settings**:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Publish Directory**: Leave empty (uses default .next build output)
   - **Node Version**: 18 or higher
   - **Environment**: Node.js

3. **Environment Variables**:
   - Add all three Stripe environment variables in the Render dashboard
   - Go to your service → Environment → Add the variables

4. **Webhook Configuration**:
   - After deployment, update your Stripe webhook endpoint URL to point to your live domain
   - Test the webhook by making a test purchase

### For Vercel

1. **Deploy**: `vercel --prod`

2. **Environment Variables**:

   ```bash
   vercel env add STRIPE_SECRET_KEY
   vercel env add STRIPE_WEBHOOK_SECRET
   vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
   ```

3. **Webhook URL**: Use `https://yourdomain.vercel.app/api/webhooks/stripe`

### For Netlify

1. **Build Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

2. **Environment Variables**: Add via Netlify dashboard under Site Settings → Environment Variables

## Local Development

1. **Create `.env.local`**:

   ```bash
   STRIPE_SECRET_KEY=sk_test_your_test_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   ```

2. **Start Development Server**:

   ```bash
   npm install
   npm run dev
   ```

3. **Test Webhooks Locally** (optional):
   ```bash
   # Install Stripe CLI
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

## Troubleshooting

### Build Fails with "STRIPE_SECRET_KEY is not set"

- ✅ **Fixed**: Environment variables are now validated at runtime, not build time
- Make sure to set the env vars in your hosting platform before deploying

### "Publish directory dist does not exist"

- ✅ **Fixed**: Updated `next.config.js` to output to `dist` directory
- Redeploy after pulling the latest changes

### Webhook Not Working

- Verify the webhook URL in Stripe dashboard matches your deployed domain
- Check that `STRIPE_WEBHOOK_SECRET` matches the signing secret from Stripe
- Test with a small purchase to see webhook events in Stripe dashboard

### Payment Not Processing

- Ensure `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set (must start with `NEXT_PUBLIC_`)
- Check browser console for Stripe.js errors
- Verify test card numbers: `4242424242424242` (Visa), `4000000000003220` (3D Secure)

## Security Notes

- Never commit environment variables to Git
- Use test keys for development environments
- Rotate your secret keys periodically
- Monitor webhook signatures to prevent fraudulent requests

## Support

If you encounter issues:

1. Check the build logs for specific error messages
2. Verify all environment variables are correctly set
3. Test webhooks using Stripe's webhook testing tool
4. Check the API route logs for detailed error information
