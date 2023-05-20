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


	fmt.Println("Server listening on port 3000")
	log.Panic(
		http.ListenAndServe(":3000", cors.Default().Handler(r)),
	)
}





