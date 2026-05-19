-- 004: Add password protection to notes and pastebin, add random slug support

-- Add password column to notes
ALTER TABLE notes ADD COLUMN IF NOT EXISTS password_hash text;

-- Add password column to pastebin_entries
ALTER TABLE pastebin_entries ADD COLUMN IF NOT EXISTS password_hash text;
