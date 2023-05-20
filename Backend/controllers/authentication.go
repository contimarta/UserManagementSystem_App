package controllers

import (
	"net/http"
	"encoding/json"
	"github.com/contimarta/UserManagementSystem_App/Backend/models"
	"github.com/contimarta/UserManagementSystem_App/Backend/utils"
	"golang.org/x/crypto/bcrypt"

)


func SignUp(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	var profile models.Auth
	err := json.NewDecoder(r.Body).Decode(&profile)
	if err != nil {
		// Handle the error and return an appropriate response
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	profiles := utils.ReadProfiles()
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(profile.Password),bcrypt.DefaultCost)
	profile.Password = string(hashedPassword)
	profiles = append(profiles, profile)
	utils.CreateProfile(profiles)
	json.NewEncoder(w).Encode(profile.Email)

}

func SignIn(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Content-Type", "application/json")
	var profile models.Auth
	err := json.NewDecoder(r.Body).Decode(&profile)
	if err != nil {
		// Handle the error and return an appropriate response
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	profiles := utils.ReadProfiles()
	for _, item := range profiles{
		if item.Email == profile.Email{
			// Check if the password is correct
			err := bcrypt.CompareHashAndPassword([]byte(item.Password), []byte(profile.Password))
			if err != nil {
				// The passwords do not match
				http.Error(w, "Invalid password", http.StatusUnauthorized)
				return
			}
			if err == nil{
				json.NewEncoder(w).Encode(map[string]string{
					"message": "Login successful",
				})
			}
		}
	}

	
}