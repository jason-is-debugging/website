package handler

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"personal-website/internal/database"
)

type contactRequest struct {
	Name    string `json:"name" binding:"required"`
	Email   string `json:"email" binding:"required"`
	Subject string `json:"subject" binding:"required"`
	Message string `json:"message" binding:"required"`
}

func RegisterRoutes(r *gin.RouterGroup, db *sql.DB) {
	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	r.POST("/contacts", func(c *gin.Context) {
		var req contactRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		if _, err := database.DB.Exec(
			"INSERT INTO contacts(name, email, subject, message) VALUES(?, ?, ?, ?)",
			req.Name, req.Email, req.Subject, req.Message,
		); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, gin.H{"message": "received"})
	})

	r.GET("/contacts", func(c *gin.Context) {
		rows, err := database.DB.Query("SELECT id, name, email, subject, message, created_at FROM contacts ORDER BY created_at DESC")
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		defer rows.Close()

		contacts := make([]gin.H, 0)
		for rows.Next() {
			var id int
			var name, email, subject, message, createdAt string
			if err := rows.Scan(&id, &name, &email, &subject, &message, &createdAt); err != nil {
				c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
				return
			}
			contacts = append(contacts, gin.H{
				"id": id, "name": name, "email": email,
				"subject": subject, "message": message, "created_at": createdAt,
			})
		}

		c.JSON(http.StatusOK, gin.H{"data": contacts})
	})
}
