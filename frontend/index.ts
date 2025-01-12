import "./index.css";

// Gestione API POST per il form richiesta informazioni

const form = document.querySelector<HTMLFormElement>('.richiedi-informazioni');

form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {
        email : formData.get('email'),
        title: formData.get('firstName') + ' ' + formData.get('lastName'),
        message: formData.get('message')
    };
    
    const endpoint = '/api/pub/createInfoRequest';

    const response = await fetch(endpoint , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const result = await response.json();
        console.log(result);
    } else {
        console.error('Errore nella richiesta');
    }
});