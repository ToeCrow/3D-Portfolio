-- Planeter med färger och omloppstider

UPDATE projects SET color = '#918E85', orbital_period_days = 88    WHERE name = 'Hamstern Oreo';           -- Merkurius  
UPDATE projects SET color = '#EED58F', orbital_period_days = 225   WHERE name = 'Filmkväll';               -- Venus  
UPDATE projects SET color = '#2E6DB4', orbital_period_days = 365   WHERE name = 'Reseplaneraren';          -- Jorden  
UPDATE projects SET color = '#D14E27', orbital_period_days = 687   WHERE name = 'PT MODE';                 -- Mars  
UPDATE projects SET color = '#D2B48C', orbital_period_days = 4333  WHERE name = 'GTA VI – countdown';      -- Jupiter  
UPDATE projects SET color = '#F5E29B', orbital_period_days = 10759 WHERE name = 'Swing Notes *';           -- Saturnus  
UPDATE projects SET color = '#86D2E7', orbital_period_days = 30687 WHERE name = 'Projekt Uranus';          -- Uranus  
UPDATE projects SET color = '#244C99', orbital_period_days = 60190 WHERE name = 'Projekt Neptunus';        -- Neptunus
UPDATE projects SET radiusKm = 2440 WHERE id = 1;  -- Mercury
UPDATE projects SET radiusKm = 6052 WHERE id = 2;  -- Venus
UPDATE projects SET radiusKm = 6371 WHERE id = 3;  -- Earth (reseplaneraren)
UPDATE projects SET radiusKm = 3390 WHERE id = 4;  -- Mars
UPDATE projects SET radiusKm = 69911 WHERE id = 5; -- Jupiter
UPDATE projects SET radiusKm = 58232 WHERE id = 6; -- Saturn
UPDATE projects SET radiusKm = 25362 WHERE id = 7; -- Uranus
UPDATE projects SET radiusKm = 24622 WHERE id = 8; -- Neptune