package utils
import(
	"github.com/contimarta/UserManagementSystem_App/Backend/models"
	"encoding/json"
	"os"
	"log"
)

//Implementation of the functions used to read and write data in the JSON files that are used as mock DBs.
func ReadData() ([]models.User){
	file, err := os.ReadFile("utils/userData.json")
	if err != nil {
		log.Fatal(err)
	}

	var users []models.User

	err = json.Unmarshal(file, &users)
	if err != nil {
		log.Fatal(err)
	}

	return users
}

func WriteData(users []models.User){
	file, _ := json.MarshalIndent(users, "", " ")

	err := os.WriteFile("utils/userData.json", file, 0666)
	if err != nil {
		log.Fatal(err)
	}
}


