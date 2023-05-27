package middleware

import (
	"fmt"
	"net/http"
	"github.com/golang-jwt/jwt/v4"

)

//Middleware function that checks whether the request has a token and validates it before calling the
//handler function. Resource: https://hackernoon.com/creating-a-middleware-in-golang-for-jwt-based-authentication-cx3f32z8

func Middleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		//retrieve cookie with token from the request
		cookie, err := r.Cookie("token")
		if err != nil {
			if err == http.ErrNoCookie {
				http.Error(w, "Unauthorized", http.StatusUnauthorized)
				return
			}
		}
	
		// Get the token from the cookie and check if it's valid against the secret key. 
		//If it is, call the handler function, if not, exit sending an error message.
		jwtToken := cookie.Value
		token, _ := jwt.Parse(jwtToken, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); 
			!ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return []byte(`my_secret_key`), nil
		})
		if (!token.Valid){
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
		}
		next.ServeHTTP(w, r)
	})
}
