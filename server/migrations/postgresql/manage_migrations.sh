#!/bin/bash

# Migration Management Script
# Usage: ./manage_migrations.sh [command]

set -e

# Configuration
MIGRATION_DIR="$(dirname "$0")"
DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_NAME=${DB_NAME:-ecommerce_db}
DB_USER=${DB_USER:-ecommerce_user}
DB_PASSWORD=${DB_PASSWORD:-ecommerce_password}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
show_help() {
    echo -e "${BLUE}Migration Management Script${NC}"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  run         Run all pending migrations"
    echo "  status      Show migration status"
    echo "  reset       Reset database (WARNING: This will delete all data)"
    echo "  create      Create a new migration file"
    echo "  help        Show this help message"
    echo ""
    echo "Environment variables:"
    echo "  DB_HOST     Database host (default: localhost)"
    echo "  DB_PORT     Database port (default: 5432)"
    echo "  DB_NAME     Database name (default: ecommerce_db)"
    echo "  DB_USER     Database user (default: ecommerce_user)"
    echo "  DB_PASSWORD Database password (default: ecommerce_password)"
}

run_migrations() {
    echo -e "${YELLOW}Running migrations...${NC}"
    "$MIGRATION_DIR/run_migrations.sh"
}

show_status() {
    echo -e "${YELLOW}Migration Status:${NC}"
    export PGPASSWORD=$DB_PASSWORD
    
    if psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT 1 FROM schema_migrations LIMIT 1;" > /dev/null 2>&1; then
        psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT version, applied_at FROM schema_migrations ORDER BY applied_at;"
    else
        echo -e "${RED}No migrations have been applied yet.${NC}"
    fi
}

reset_database() {
    echo -e "${RED}WARNING: This will delete all data in the database!${NC}"
    read -p "Are you sure you want to continue? (yes/no): " confirm
    
    if [ "$confirm" = "yes" ]; then
        echo -e "${YELLOW}Resetting database...${NC}"
        export PGPASSWORD=$DB_PASSWORD
        
        # Drop and recreate database
        psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"
        psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d postgres -c "CREATE DATABASE $DB_NAME;"
        
        echo -e "${GREEN}Database reset successfully!${NC}"
        echo -e "${YELLOW}Run migrations to recreate the schema:${NC}"
        echo "  $0 run"
    else
        echo -e "${YELLOW}Operation cancelled.${NC}"
    fi
}

create_migration() {
    read -p "Enter migration name (e.g., add_user_table): " migration_name
    
    if [ -z "$migration_name" ]; then
        echo -e "${RED}Migration name cannot be empty.${NC}"
        exit 1
    fi
    
    # Get next migration number
    last_migration=$(ls -1 $MIGRATION_DIR/*.sql 2>/dev/null | grep -E '^[0-9]+_' | sort | tail -1)
    if [ -z "$last_migration" ]; then
        next_number="001"
    else
        last_number=$(basename "$last_migration" | cut -d'_' -f1)
        next_number=$(printf "%03d" $((10#$last_number + 1)))
    fi
    
    migration_file="$MIGRATION_DIR/${next_number}_${migration_name}.sql"
    
    # Create migration template
    cat > "$migration_file" << EOF
-- Migration: $migration_name
-- Created: $(date)

-- Add your SQL statements here
-- Example:
-- CREATE TABLE example_table (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(255) NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- Don't forget to add indexes if needed:
-- CREATE INDEX idx_example_name ON example_table(name);
EOF
    
    echo -e "${GREEN}Migration file created: $migration_file${NC}"
    echo -e "${YELLOW}Edit the file and add your SQL statements.${NC}"
}

# Main script logic
case "${1:-help}" in
    "run")
        run_migrations
        ;;
    "status")
        show_status
        ;;
    "reset")
        reset_database
        ;;
    "create")
        create_migration
        ;;
    "help"|*)
        show_help
        ;;
esac
