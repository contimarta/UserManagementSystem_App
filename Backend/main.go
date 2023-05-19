package main

import (
	"fmt"
	"log"
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"math/rand"
	"strconv"


	//"github.com/contimarta/UserManagementSystem/Backend/routes"
)

type User struct {
	ID        string `json:"id"`
	FirstName string `json:"firstName"`
	Surname   string `json:"surname"`
	Email     string `json:"email"`
	Birthdate string `json:"birthdate"`
}

var users []User


// Get a user handler
func getUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)

}

func deleteUser(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range users {
		if item.ID==params["id"] {
			users= append(users[:index],users[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(users)


}

func getUserById(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for _, item := range users {
		if item.ID==params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}

}

func createUser (w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	var user User
	_ = json.NewDecoder(r.Body).Decode(&user)
	user.ID= strconv.Itoa(rand.Intn(100000))
	users = append(users, user)
	json.NewEncoder(w).Encode(user)

}

func updateUser(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	for index, item := range users {
		if item.ID==params["id"] {
			users= append(users[:index],users[index+1:]...)
			break
		}
	}
}

func main() {
	users = append(users, User{ID:"1", FirstName:"Alice", Surname:"Smith", Email: "ada@gmail.com", Birthdate: "20/01/1990"})
	users = append(users, User{ID:"2", FirstName:"Jack", Surname:"Jones", Email: "jack@gmail.com", Birthdate: "30/02/1960"})

	
	r := mux.NewRouter()
	r.HandleFunc("/users", getUsers).Methods("GET")
	r.HandleFunc("/users/{id}", getUserById).Methods("GET")
	r.HandleFunc("/users", createUser).Methods("POST")
	r.HandleFunc("/users/{id}", updateUser).Methods("PUT")
	r.HandleFunc("/users/{id}", deleteUser).Methods("DELETE")


	fmt.Println("Server listening on port 3000")
	log.Panic(
		http.ListenAndServe(":3000", r),
	)
}





