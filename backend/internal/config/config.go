package config

import (
	"fmt"
	"os"
)

type Config struct {
	ServerAddress string
	DatabasePath  string
}

func Load() Config {
	return Config{
		ServerAddress: getEnv("SERVER_ADDRESS", "0.0.0.0:8080"),
		DatabasePath:  getEnv("DATABASE_PATH", "./data/app.db"),
	}
}

func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

func GetStaticDir(env string) string {
	if env != "" {
		return env
	}
	return "./dist"
}
