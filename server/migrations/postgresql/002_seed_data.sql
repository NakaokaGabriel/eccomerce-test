-- Seed data for e-commerce application
-- Insert sample products

INSERT INTO products (id, name, description, price, stock) VALUES
    ('prod_1', 'Laptop Pro 15"', 'High-performance laptop with 16GB RAM and 512GB SSD', 1299.99, 10),
    ('prod_2', 'Wireless Mouse', 'Ergonomic wireless mouse with precision tracking', 29.99, 50),
    ('prod_3', 'Mechanical Keyboard', 'RGB mechanical keyboard with blue switches', 89.99, 25),
    ('prod_4', 'Monitor 27"', '4K Ultra HD monitor with HDR support', 399.99, 15),
    ('prod_5', 'Webcam HD', '1080p webcam with auto-focus and noise cancellation', 79.99, 30),
    ('prod_6', 'USB-C Hub', '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader', 49.99, 40),
    ('prod_7', 'Bluetooth Headphones', 'Noise-cancelling wireless headphones with 30h battery', 199.99, 20),
    ('prod_8', 'Laptop Stand', 'Adjustable aluminum laptop stand for better ergonomics', 39.99, 35),
    ('prod_9', 'Power Bank 20000mAh', 'High-capacity power bank with fast charging', 59.99, 45),
    ('prod_10', 'Cable Management Kit', 'Complete cable management solution for desk setup', 19.99, 60)
ON CONFLICT (id) DO NOTHING;
