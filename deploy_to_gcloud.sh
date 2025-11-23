#!/bin/bash

# Define paths to local SDK
GCLOUD="./google-cloud-sdk/bin/gcloud"
GSUTIL="./google-cloud-sdk/bin/gsutil"
PROJECT_ID="gen-lang-client-0982502069"

echo "🚀 Starting Deployment to Google Cloud..."

# Check if logged in
if ! $GCLOUD auth list --filter=status:ACTIVE --format="value(account)" | grep -q "@"; then
    echo "⚠️  You need to login first!"
    echo "Run this command manually: $GCLOUD auth login"
    exit 1
fi

# Set Project ID
echo "📋 Setting Project ID to: $PROJECT_ID"
$GCLOUD config set project $PROJECT_ID

# Bucket Name Input Loop
while true; do
    echo ""
    echo "📦 Enter a unique name for your website bucket (lowercase only, e.g., codespark-israel-v1):"
    read BUCKET_NAME
    
    if [[ -z "$BUCKET_NAME" ]]; then
        echo "❌ Bucket name cannot be empty. Please try again."
        continue
    fi

    if [[ "$BUCKET_NAME" =~ [A-Z] ]]; then
        echo "❌ Bucket name must be ALL LOWERCASE. Please try again."
        continue
    fi
    
    break
done

echo "📝 Using bucket name: $BUCKET_NAME"
echo "----------------------------------------"

# Create Bucket
echo "🔨 Creating bucket gs://$BUCKET_NAME..."
if $GSUTIL mb -l us-central1 gs://$BUCKET_NAME; then
    echo "✅ Bucket created."
else
    echo "⚠️  Bucket creation failed (it might already exist). Proceeding with deployment..."
fi

# Make Public
echo "globe_with_meridians Making bucket public..."
$GSUTIL iam ch allUsers:objectViewer gs://$BUCKET_NAME

# Configure Website
echo "⚙️  Configuring website settings..."
$GSUTIL web set -m index.html -e index.html gs://$BUCKET_NAME

# Upload
echo "⬆️  Uploading files..."
$GSUTIL -m cp -r dist/* gs://$BUCKET_NAME

echo "----------------------------------------"
echo "✅ Deployment Complete!"
echo "🌎 Your site is live at: https://storage.googleapis.com/$BUCKET_NAME/index.html"
