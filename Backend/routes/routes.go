package routes

import (
	"net/http"
	"github.com/contimarta/UserManagementSystem_App/Backend/controllers"
	"github.com/contimarta/UserManagementSystem_App/Backend/middleware"
	"github.com/gorilla/mux"
)


func SetRouter(router *mux.Router){

//Authentication routes (don't need middleware authentication)
router.HandleFunc("/auth/signin", controllers.SignIn).Methods("POST")
router.HandleFunc("/auth/signup", controllers.SignUp).Methods("POST")

//Users management routes with JWT middleware
router.Handle("/users", middleware.Middleware(http.HandlerFunc(controllers.GetUsers))).Methods("GET")
router.Handle("/users/{id}", middleware.Middleware(http.HandlerFunc(controllers.GetUserById))).Methods("GET")
router.Handle("/users", middleware.Middleware(http.HandlerFunc(controllers.CreateUser))).Methods("POST")
router.Handle("/users/{id}", middleware.Middleware(http.HandlerFunc(controllers.UpdateUser))).Methods("PUT")
router.Handle("/users/{id}", middleware.Middleware(http.HandlerFunc(controllers.DeleteUser))).Methods("DELETE")
router.Handle("/users/{id}/contract", middleware.Middleware(http.HandlerFunc(controllers.UploadContractHandler))).Methods("POST")
router.Handle("/users/{id}/download", middleware.Middleware(http.HandlerFunc(controllers.DownloadContractHandler))).Methods("GET")



}
