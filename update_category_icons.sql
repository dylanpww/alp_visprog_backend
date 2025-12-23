-- Update existing categories to have icons
-- Run this SQL in your database

UPDATE categories SET icon = 'Gaming' WHERE name = 'Gaming';
UPDATE categories SET icon = 'Hiking' WHERE name = 'Outdoor';
UPDATE categories SET icon = 'Beach' WHERE name = 'Beach';
UPDATE categories SET icon = 'Restaurant' WHERE name = 'Food';
UPDATE categories SET icon = 'Museum' WHERE name = 'Indoor';
UPDATE categories SET icon = 'Sports' WHERE name = 'Sports';

-- Check the results
SELECT * FROM categories;
