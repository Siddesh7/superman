#!/bin/bash

# Gym Membership System - API Testing Script
# Make sure the server is running on http://localhost:3000

echo "🏋️ Testing Gym Membership System Endpoints"
echo "=========================================="

SERVER_URL="http://localhost:3000"

echo ""
echo "1. 🏠 GET / - Welcome/Info Endpoint"
echo "curl -X GET $SERVER_URL/"
curl -X GET "$SERVER_URL/" | jq '.'

echo ""
echo ""
echo "2. 💳 POST /buy-membership - Purchase Membership"
echo "curl -X POST $SERVER_URL/buy-membership \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{...}'"

curl -X POST "$SERVER_URL/buy-membership" \
  -H "Content-Type: application/json" \
  -d '{
    "buyerAddresses": [
      "0x1234567890123456789012345678901234567890",
      "0x2345678901234567890123456789012345678901"
    ],
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-12-31T23:59:59.999Z",
    "purchasedBy": "0x1234567890123456789012345678901234567890"
  }' | jq '.'

echo ""
echo ""
echo "3. 💳 POST /buy-membership - Second Membership (for testing)"
echo "Creating another membership for testing purposes..."

MEMBERSHIP_RESPONSE=$(curl -s -X POST "$SERVER_URL/buy-membership" \
  -H "Content-Type: application/json" \
  -d '{
    "buyerAddresses": [
      "0x3456789012345678901234567890123456789012"
    ],
    "startDate": "2024-06-01T00:00:00.000Z",
    "endDate": "2024-08-31T23:59:59.999Z",
    "purchasedBy": "0x3456789012345678901234567890123456789012"
  }')

echo "$MEMBERSHIP_RESPONSE" | jq '.'

# Extract membership ID for day pass generation
MEMBERSHIP_ID=$(echo "$MEMBERSHIP_RESPONSE" | jq -r '.membership.membershipId')
echo ""
echo "📝 Extracted Membership ID: $MEMBERSHIP_ID"

echo ""
echo ""
echo "4. 🎫 POST /generate-day-pass - Generate Day Pass"
echo "curl -X POST $SERVER_URL/generate-day-pass \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"membershipId\": \"$MEMBERSHIP_ID\"}'"

if [ "$MEMBERSHIP_ID" != "null" ] && [ "$MEMBERSHIP_ID" != "" ]; then
  curl -X POST "$SERVER_URL/generate-day-pass" \
    -H "Content-Type: application/json" \
    -d "{\"membershipId\": \"$MEMBERSHIP_ID\"}" | jq '.'
else
  echo "⚠️  Could not extract membership ID, using sample ID for demo"
  curl -X POST "$SERVER_URL/generate-day-pass" \
    -H "Content-Type: application/json" \
    -d '{"membershipId": "GYM-1234567890-SAMPLE123"}' | jq '.'
fi

echo ""
echo ""
echo "5. 📋 GET /get-membership-details/:membershipId - Get Membership Details"
echo "curl -X GET $SERVER_URL/get-membership-details/$MEMBERSHIP_ID"

if [ "$MEMBERSHIP_ID" != "null" ] && [ "$MEMBERSHIP_ID" != "" ]; then
  curl -X GET "$SERVER_URL/get-membership-details/$MEMBERSHIP_ID" | jq '.'
else
  echo "⚠️  Using sample membership ID for demo"
  curl -X GET "$SERVER_URL/get-membership-details/GYM-1234567890-SAMPLE123" | jq '.'
fi

echo ""
echo ""
echo "6. 📊 GET /memberships/history - Admin: Membership History"
echo "curl -X GET '$SERVER_URL/memberships/history?limit=5&page=1'"
curl -X GET "$SERVER_URL/memberships/history?limit=5&page=1" | jq '.'

echo ""
echo ""
echo "7. 🎫 GET /day-passes/history - Admin: Day Pass History"
echo "curl -X GET '$SERVER_URL/day-passes/history?limit=5&page=1'"
curl -X GET "$SERVER_URL/day-passes/history?limit=5&page=1" | jq '.'

echo ""
echo ""
echo "🧪 Additional Test Cases"
echo "======================="

echo ""
echo "8. ❌ POST /buy-membership - Invalid Request (Missing Fields)"
echo "curl -X POST $SERVER_URL/buy-membership \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"buyerAddresses\": []}'"

curl -X POST "$SERVER_URL/buy-membership" \
  -H "Content-Type: application/json" \
  -d '{"buyerAddresses": []}' | jq '.'

echo ""
echo ""
echo "9. ❌ POST /generate-day-pass - Invalid Membership ID"
echo "curl -X POST $SERVER_URL/generate-day-pass \\"
echo "  -H 'Content-Type: application/json' \\"
echo "  -d '{\"membershipId\": \"INVALID-ID\"}'"

curl -X POST "$SERVER_URL/generate-day-pass" \
  -H "Content-Type: application/json" \
  -d '{"membershipId": "INVALID-ID"}' | jq '.'

echo ""
echo ""
echo "10. ❌ GET /get-membership-details/:membershipId - Not Found"
echo "curl -X GET $SERVER_URL/get-membership-details/NONEXISTENT-ID"
curl -X GET "$SERVER_URL/get-membership-details/NONEXISTENT-ID" | jq '.'

echo ""
echo ""
echo "✅ All endpoint tests completed!"
echo "================================"
echo ""
echo "💡 Tips:"
echo "- Install jq for better JSON formatting: brew install jq"
echo "- Make sure MongoDB is running: brew services start mongodb-community"
echo "- Start the server: pnpm run dev"
echo "- Seed database: pnpm run db:seed" 