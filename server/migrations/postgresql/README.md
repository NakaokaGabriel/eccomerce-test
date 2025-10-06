# PostgreSQL Manual Migrations

This directory contains manual PostgreSQL migrations for the e-commerce application.

## Structure

```
migrations/postgresql/
├── 001_initial_schema.sql    # Initial database schema
├── 002_seed_data.sql         # Sample data
├── run_migrations.sh         # Migration runner script
├── manage_migrations.sh      # Migration management tool
└── README.md                 # This file
```

## Migration Files

### 001_initial_schema.sql
- Creates the `products` table with all necessary fields
- Creates the `cart_items` table with foreign key relationships
- Sets up indexes for better performance
- Creates triggers for automatic `updatedAt` timestamp updates

### 002_seed_data.sql
- Inserts sample product data
- Uses `ON CONFLICT DO NOTHING` to prevent duplicate inserts

## Usage

### Running Migrations

#### Option 1: Using the management script
```bash
# Run all pending migrations
./migrations/postgresql/manage_migrations.sh run

# Check migration status
./migrations/postgresql/manage_migrations.sh status

# Reset database (WARNING: Deletes all data)
./migrations/postgresql/manage_migrations.sh reset

# Create a new migration
./migrations/postgresql/manage_migrations.sh create
```

#### Option 2: Using Docker Compose
```bash
# Development environment with migrations
docker-compose -f docker-compose.dev.yml up --build

# Production environment with migrations
docker-compose -f docker-compose.migrations.yml up --build
```

#### Option 3: Direct script execution
```bash
# Make script executable
chmod +x migrations/postgresql/run_migrations.sh

# Run migrations
./migrations/postgresql/run_migrations.sh
```

### Environment Variables

Configure the following environment variables for database connection:

```bash
export DB_HOST=localhost
export DB_PORT=5432
export DB_NAME=ecommerce_db
export DB_USER=ecommerce_user
export DB_PASSWORD=ecommerce_password
```

## Migration Tracking

The migration system uses a `schema_migrations` table to track which migrations have been applied:

```sql
CREATE TABLE schema_migrations (
    version VARCHAR(255) PRIMARY KEY,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Creating New Migrations

1. Use the management script to create a new migration:
   ```bash
   ./migrations/postgresql/manage_migrations.sh create
   ```

2. Edit the generated SQL file with your changes

3. Run the migration:
   ```bash
   ./migrations/postgresql/manage_migrations.sh run
   ```

## Migration Naming Convention

- Format: `XXX_description.sql`
- Example: `003_add_user_table.sql`
- Use 3-digit numbers for ordering
- Use descriptive names with underscores

## Best Practices

1. **Always backup** your database before running migrations
2. **Test migrations** on a development database first
3. **Use transactions** for complex migrations
4. **Add rollback scripts** for critical migrations
5. **Document changes** in migration comments

## Docker Integration

The migrations are automatically executed when using the provided Docker Compose files:

- `docker-compose.dev.yml` - Development environment
- `docker-compose.migrations.yml` - Production environment

The migration service waits for the database to be healthy before running migrations, ensuring proper startup order.

## Troubleshooting

### Connection Issues
- Verify database credentials
- Check if PostgreSQL is running
- Ensure network connectivity

### Migration Failures
- Check migration SQL syntax
- Verify foreign key constraints
- Review error logs for specific issues

### Permission Issues
- Ensure scripts are executable: `chmod +x *.sh`
- Check database user permissions
- Verify file ownership
