package models
type User struct {
	ID        string `json:"id"`
	FirstName string `json:"firstName"`
	Surname   string `json:"surname"`
	Email     string `json:"email"`
	Birthdate string `json:"birthdate"`
}

type Auth struct {
	Email string `json:"email"`
	Password string `json:"password"`
}