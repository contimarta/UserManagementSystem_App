package controllers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/contimarta/UserManagementSystem_App/Backend/models"
	"github.com/contimarta/UserManagementSystem_App/Backend/utils"
	"github.com/golang-jwt/jwt/v4"
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


// define a key used to create the signature
var jwtKey = []byte("your_secret_key")

func SignIn(w http.ResponseWriter, r *http.Request) {

	var profile models.Auth
	err := json.NewDecoder(r.Body).Decode(&profile)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	profiles := utils.ReadProfiles()

	for _, item := range profiles {
		if item.Email == profile.Email {
			err := bcrypt.CompareHashAndPassword([]byte(item.Password), []byte(profile.Password))
			if err != nil {
				http.Error(w, "Invalid password", http.StatusUnauthorized)
				return
			}

			if err == nil {
				// Declare the expiration time of the token
				expirationTime := time.Now().Add(24 * time.Hour)

				// Create the JWT claims, which includes the user email and expiry time
				claims := &models.Claims{
					Email: profile.Email,
					RegisteredClaims: jwt.RegisteredClaims{
						// In JWT, the expiry time is expressed as unix milliseconds
						ExpiresAt: jwt.NewNumericDate(expirationTime),
					},
				}

				// Declare the token with the algorithm used for signing, and the claims
				token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

				// Create the JWT string
				tokenString, err := token.SignedString(jwtKey)
				if err != nil {
					w.WriteHeader(http.StatusInternalServerError)
					return
				}
				json.NewEncoder(w).Encode(map[string]string{
					"message": "Login successful",
					"token": tokenString,
				})

			}
		}
	}

}