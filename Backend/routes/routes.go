package routes
import (
	"github.com/gorilla/mux"
	"github.com/contimarta/UserManagementSystem_App/Backend/controllers"
)

func SetRouter(router *mux.Router){
	
router.HandleFunc("/users", controllers.GetUsers).Methods("GET")
router.HandleFunc("/users/{id}", controllers.GetUserById).Methods("GET")
router.HandleFunc("/users", controllers.CreateUser).Methods("POST")
router.HandleFunc("/users/{id}", controllers.UpdateUser).Methods("PUT")
router.HandleFunc("/users/{id}", controllers.DeleteUser).Methods("DELETE")
router.HandleFunc("/auth/signin", controllers.SignIn).Methods("POST")
router.HandleFunc("/auth/signup", controllers.SignUp).Methods("POST")

}
