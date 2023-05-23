package controllers

import (
	"io"
	"net/http"
	"os"
	"path/filepath"
	"github.com/gorilla/mux"
	"fmt"
	"github.com/contimarta/UserManagementSystem_App/Backend/models"
	"github.com/contimarta/UserManagementSystem_App/Backend/utils"

)


func getUser(id string) (models.User, error) {
	users := utils.ReadData()

	for _, user := range users {
		if user.ID == id {
			return user, nil
		}
	}

	return models.User{}, fmt.Errorf("user with ID %s not found", id)
}

func saveUser(updatedUser models.User) error {
	users := utils.ReadData()

	for i, user := range users {
		if user.ID == updatedUser.ID {
			users[i] = updatedUser
			utils.WriteData(users)
			return nil
		}
	}

	return fmt.Errorf("user with ID %s not found", updatedUser.ID)
}

func UploadContractHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	// Parse the multipart form
	err := r.ParseMultipartForm(10 << 20) // Limit upload size to 10MB
	if err != nil {
		http.Error(w, "Error parsing multipart form", http.StatusBadRequest)
		return
	}
	// Retrieve the file from the form data
	file, header, err := r.FormFile("contract")
	
	if err != nil {
		http.Error(w, "Error retrieving file from form data", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Create the file in the local file system
	dst, err := os.Create(filepath.Join("contracts", header.Filename))
	if err != nil {
		http.Error(w, "Error creating file on server", http.StatusInternalServerError)
		return
	}
	defer dst.Close()

	// Copy the file content to the new file
	_, err = io.Copy(dst, file)
	if err != nil {
		http.Error(w, "Error copying file content", http.StatusInternalServerError)
		return
	}

	// At this point, the file has been stored as "contracts/<filename>"
	// Update the user struct
	user, err := getUser(id)
	if err != nil {
		http.Error(w, "Error getting user", http.StatusInternalServerError)
		return
	}
	user.File = filepath.Join("contracts", header.Filename)
	// Save the updated user
	err = saveUser(user)
	if err != nil {
		http.Error(w, "Error saving user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("File uploaded successfully"))
}

func DownloadContractHandler(w http.ResponseWriter, r *http.Request) {

	id := mux.Vars(r)["id"]

    user, err := getUser(id)
    if err != nil {
        http.Error(w, "Error getting user", http.StatusInternalServerError)
        return
    }

    filePath := user.File

    // Check if file exists and open
    openFile, err := os.Open(filePath)
    if err != nil {
        http.Error(w, "File not found", http.StatusNotFound)
        return
    }
    defer openFile.Close()

    // Set headers
    w.Header().Set("Content-Disposition", "attachment; filename="+filePath)
    w.Header().Set("Content-Type", "application/octet-stream")

    // Use io.Copy to send the contents of the file
    _, err = io.Copy(w, openFile)
    if err != nil {
        http.Error(w, "Error reading file", http.StatusInternalServerError)
        return
    }

}
