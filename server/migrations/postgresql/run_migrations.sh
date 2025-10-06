#!/bin/bash

# PostgreSQL Migration Runner
# This script runs all migration files in order

set -e

# Configuration
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-ecommerce_db}
DB_USER=${DB_USER:-ecommerce_user}
DB_PASSWORD=${DB_PASSWORD:-ecommerce_password}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Starting PostgreSQL migrations...${NC}"

# Check if psql is available
if ! command -v psql &> /dev/null; then
    echo -e "${RED}Error: psql command not found. Please install PostgreSQL client.${NC}"
    exit 1
fi

# Set PGPASSWORD environment variable
export PGPASSWORD=$DB_PASSWORD

# Test database connection
echo -e "${YELLOW}Testing database connection...${NC}"
if ! psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT 1;" > /dev/null 2>&1; then
    echo -e "${RED}Error: Cannot connect to database. Please check your connection parameters.${NC}"
    exit 1
fi

echo -e "${GREEN}Database connection successful!${NC}"

# Create migrations tracking table if it doesn't exist
echo -e "${YELLOW}Setting up migrations tracking...${NC}"
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "
CREATE TABLE IF NOT EXISTS schema_migrations (
    version VARCHAR(255) PRIMARY KEY,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);"

# Get list of migration files
MIGRATION_DIR="$(dirname "$0")"
MIGRATION_FILES=($(ls -1 $MIGRATION_DIR/*.sql | grep -E '^[0-9]+_' | sort))

if [ ${#MIGRATION_FILES[@]} -eq 0 ]; then
    echo -e "${YELLOW}No migration files found.${NC}"
    exit 0
fi

echo -e "${YELLOW}Found ${#MIGRATION_FILES[@]} migration files.${NC}"

# Run each migration
for migration_file in "${MIGRATION_FILES[@]}"; do
    filename=$(basename "$migration_file")
    version=$(echo "$filename" | cut -d'_' -f1)
    
    echo -e "${YELLOW}Checking migration: $filename${NC}"
    
    # Check if migration was already applied
    if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -t -c "SELECT 1 FROM schema_migrations WHERE version = '$version';" | grep -q 1; then
        echo -e "${GREEN}Migration $filename already applied, skipping...${NC}"
        continue
    fi
    
    echo -e "${YELLOW}Applying migration: $filename${NC}"
    
    # Apply migration
    if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$migration_file"; then
        # Record migration as applied
        psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "INSERT INTO schema_migrations (version) VALUES ('$version');"
        echo -e "${GREEN}Migration $filename applied successfully!${NC}"
    else
        echo -e "${RED}Error applying migration $filename${NC}"
        exit 1
    fi
done

echo -e "${GREEN}All migrations completed successfully!${NC}"

# Show final status
echo -e "${YELLOW}Migration status:${NC}"
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT version, applied_at FROM schema_migrations ORDER BY applied_at;"
