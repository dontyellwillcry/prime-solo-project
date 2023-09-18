-- Create the "User" table
CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(1000) NOT NULL,
    access_level INT DEFAULT 0
);

-- Create the "ingredients" table
CREATE TABLE ingredients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    type VARCHAR(50),
    image VARCHAR(255)
);

CREATE TABLE recipe (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    health INTEGER,
    hunger INTEGER,
    sanity INTEGER,
    ingredient_ids INTEGER[] DEFAULT ARRAY[]::INTEGER[], 
    description VARCHAR(500),
    image VARCHAR(255)
);



-- Create the "favorites" table
CREATE TABLE favorites (
    recipe_id INTEGER REFERENCES recipe(id),
    user_id INTEGER REFERENCES "user"(id),
    PRIMARY KEY (recipe_id, user_id)
);

-- Insert a new recipe into the "recipe" table with an array of ingredient IDs
INSERT INTO recipe (name, health, hunger, sanity, ingredient_ids, description, image)
VALUES
    ('Fish Cordon Bleu', 20, 37.5, -10, ARRAY[3, 3, 8, 8], 'requires two Frog Legs and Fishes with a total Fish value of 1.0 or higher, and takes 40 seconds to cook.', 'images/crockpot/fishcordonbleu.png');


    INSERT INTO ingredients (name, type, image)
VALUES 
('Butter', 'item', 'images/ingredients/butter.png');