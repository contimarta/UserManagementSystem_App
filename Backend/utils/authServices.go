package utils
import(
	"github.com/contimarta/UserManagementSystem_App/Backend/models"
	"encoding/json"
	"os"
	"log"
)

//Implementations of the auth functions that create a new profile and read all the existing profiles from the JSON file profiles.JSON
//that is used as a mock DB.

func CreateProfile(profiles []models.Auth){
	file, _ := json.MarshalIndent(profiles, "", " ")

	err := os.WriteFile("utils/profiles.json", file, 0666)
	if err != nil {
		log.Fatal(err)
	}
}


func ReadProfiles()([]models.Auth){
	file, err := os.ReadFile("utils/profiles.json")
	if err != nil {
		log.Fatal(err)
	}

	var profiles []models.Auth

	err = json.Unmarshal(file, &profiles)
	if err != nil {
		log.Fatal(err)
	}

	return profiles}
