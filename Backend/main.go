package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"github.com/contimarta/UserManagementSystem_App/Backend/routes"
)

func main() {

	r := mux.NewRouter()
	routes.SetRouter(r)
	corsHandler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:3000"}, // allow requests from this origin
		AllowCredentials: true, // allow credentials
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"}, // allow these HTTP methods
		AllowedHeaders: []string{"*"}, // allow all headers
	})

	fmt.Println("Server listening on port 8000")
	log.Panic(
		http.ListenAndServe(":8000", corsHandler.Handler(r)),
	)
}





