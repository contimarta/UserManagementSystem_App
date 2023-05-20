package controllers


import (
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"math/rand"
	"strconv"
	"github.com/contimarta/UserManagementSystem_App/Backend/models"
	"github.com/contimarta/UserManagementSystem_App/Backend/utils"

)


func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	users := utils.ReadData()
	json.NewEncoder(w).Encode(users)

}

func DeleteUser(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	users := utils.ReadData()

	for index, item := range users {
		if item.ID==params["id"] {
			users= append(users[:index],users[index+1:]...)
			break
		}
	}
	utils.WriteData(users)
	json.NewEncoder(w).Encode(users)

}

func GetUserById(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	users := utils.ReadData()
	for _, item := range users {
		if item.ID==params["id"] {
			json.NewEncoder(w).Encode(item)
			break
		}
	}

}

func CreateUser(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		// Handle the error and return an appropriate response
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	user.ID= strconv.Itoa(rand.Intn(1000))
	users := utils.ReadData()
	users = append(users, user)
	utils.WriteData(users)
	json.NewEncoder(w).Encode(users)

}

func UpdateUser(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	params := mux.Vars(r)
	users := utils.ReadData()
	var user models.User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		}

		for index := range users {
			if users[index].ID == params["id"] {
				users[index].FirstName = user.FirstName
				users[index].Surname = user.Surname
				users[index].Birthdate = user.Birthdate
				users[index].Email = user.Email
				break
			}
		}
	json.NewEncoder(w).Encode(users)
	utils.WriteData(users)
}