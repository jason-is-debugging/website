package database

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func Init(path string) error {
	if err := os.MkdirAll(folder(path), 0755); err != nil {
		return fmt.Errorf("create db dir failed: %w", err)
	}

	db, err := sql.Open("sqlite3", path)
	if err != nil {
		return fmt.Errorf("open database failed: %w", err)
	}

	DB = db
	return runMigrations()
}

func Close() error {
	if DB == nil {
		return nil
	}
	return DB.Close()
}

func folder(path string) string {
	var last int
	for i := len(path) - 1; i >= 0; i-- {
		if path[i] == '/' {
			last = i
			break
		}
	}
	if last <= 0 {
		return "."
	}
	return path[:last]
}

func runMigrations() error {
	stmts := []string{
		`CREATE TABLE IF NOT EXISTS users (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL UNIQUE,
			email TEXT NOT NULL UNIQUE,
			password_hash TEXT NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`,
		`CREATE TABLE IF NOT EXISTS contacts (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			email TEXT NOT NULL,
			subject TEXT NOT NULL,
			message TEXT NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		)`,
	}

	for _, sqlText := range stmts {
		if _, err := DB.Exec(sqlText); err != nil {
			return fmt.Errorf("migrate failed: %w", err)
		}
	}
	return nil
}
