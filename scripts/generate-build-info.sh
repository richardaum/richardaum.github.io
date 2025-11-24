#!/usr/bin/env sh

# Generate build info with current date and time
BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
BUILD_TIMESTAMP=$(date -u +%s)

# Create build-info.json in src/data directory
mkdir -p src/data
cat > src/data/build-info.json <<EOF
{
  "buildDate": "$BUILD_DATE",
  "buildTimestamp": $BUILD_TIMESTAMP
}
EOF

echo "Build info generated: $BUILD_DATE"

