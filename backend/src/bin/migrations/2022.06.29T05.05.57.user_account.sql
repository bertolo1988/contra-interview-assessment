CREATE TABLE user_account (
  id serial PRIMARY KEY,
  given_name text NOT NULL,
  family_name text NOT NULL,
  email_address text NOT NULL,
  created_at timestamp with time zone DEFAULT NOW(),
  updated_at timestamp with time zone DEFAULT NOW()
);

