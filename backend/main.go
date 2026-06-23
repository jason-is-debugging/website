package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"personal-website/internal/config"
	"personal-website/internal/database"
	"personal-website/internal/handler"
)

func main() {
	cfg := config.Load()
	if err := database.Init(cfg.DatabasePath); err != nil {
		log.Fatalf("failed to init database: %v", err)
	}

	r := gin.Default()
	r.Use(cors.Default())

	r.Static("/assets", cfg.GetStaticDir()+"/assets")
	r.NoRoute(func(c *gin.Context) {
		c.File(cfg.GetStaticDir() + "/index.html")
	})

	api := r.Group("/api")
	handler.RegisterRoutes(api, database.DB)

	log.Printf("server running on %s", cfg.ServerAddress)
	if err := r.Run(cfg.ServerAddress); err != nil {
		log.Fatalf("server stopped: %v", err)
	}
}
