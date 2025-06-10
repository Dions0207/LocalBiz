-- Add new columns to the businesses table for service providers
ALTER TABLE businesses
ADD COLUMN service_delivery_type VARCHAR(50) DEFAULT 'physical_location' CHECK (service_delivery_type IN ('physical_location', 'at_client_location', 'remote', 'hybrid')),
ADD COLUMN hourly_rate DECIMAL(15,2),
ADD COLUMN fixed_price_services JSONB,
ADD COLUMN service_areas TEXT[];

-- Make address nullable as it might not apply to all service types
ALTER TABLE businesses
ALTER COLUMN address DROP NOT NULL;

-- Update existing businesses to default service_delivery_type
UPDATE businesses
SET service_delivery_type = 'physical_location'
WHERE service_delivery_type IS NULL;
