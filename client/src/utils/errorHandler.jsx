//Gestionnaire d'erreurs pour les appels API
export const handleApiError = async (response, defaultMessage = "Une erreur est survenue") => {
    if (!response.ok) {
        try {
            const errorData = await response.json();
            throw new Error(errorData.message || errorData.errors?.[0] || defaultMessage);
        } catch (e) {
            // Si la réponse n'est pas du JSON valide
            if (response.status === 401) {
                throw new Error("Session expirée, veuillez vous reconnecter");
            }
            if (response.status === 500) {
                throw new Error("Erreur serveur, veuillez réessayer plus tard");
            }
            throw new Error(defaultMessage);
        }
    }
    return response.json();
};

//Affiche une alerte d'erreur
export const showErrorAlert = (message) => {
    alert(`Erreur: ${message}`);
};

//Affiche une alerte de succès
export const showSuccessAlert = (message) => {
    alert(`Succès: ${message}`);
};

//Demande une confirmation avant une action critique
export const confirmAction = (message) => {
    return window.confirm(`⚠️ ${message}`);
};

//Valide les champs requis d'un formulaire
export const validateRequiredFields = (fields, fieldNames) => {
    for (let i = 0; i < fields.length; i++) {
        if (!fields[i] || !fields[i].trim()) {
            throw new Error(`Le champ "${fieldNames[i]}" est obligatoire`);
        }
    }
};

//Valide un email
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error("Format d'email invalide");
    }
};

//Valide un numéro de téléphone
export const validatePhone = (phone) => {
    const phoneRegex = /^[0-9+\-\s()]{10,20}$/;
    if (!phoneRegex.test(phone)) {
        throw new Error("Le numéro de téléphone doit contenir entre 10 et 20 caractères");
    }
};