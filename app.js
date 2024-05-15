function searchSkateparks() {
    const city = document.getElementById('cityInput').value.trim(); 
   
    if (!city) {
        console.error('City input is empty');
        displayErrorMessage('Proszę wprowadzić nazwę miasta.');
        return;
    }

    
    const url = `http://localhost:5500/api/skateparks?city=${encodeURIComponent(city)}`;

    
    fetch(url)
        .then(response => {
            
            if (!response.ok) {
                throw new Error('Nie można odnaleźć skateparków w podanym mieście.');
            }
            
            return response.json();
        })
        .then(data => {
            
            const results = document.getElementById('results');
            results.innerHTML = '';
            if (data.length === 0) {
                displayMessage('W podanym mieście nie ma skateparków.');
            } else {
                data.forEach(skatepark => {
                    const li = document.createElement('li');
                    li.textContent = `${skatepark.name} - ${skatepark.description}`;
                    results.appendChild(li);
                });
            }
        })
        .catch(error => {
           
            console.error('Błąd:', error.message);
            displayErrorMessage('Wystąpił błąd podczas pobierania danych.');
        });
}


function displayMessage(message) {
    const results = document.getElementById('results');
    results.innerHTML = '';
    const li = document.createElement('li');
    li.textContent = message;
    results.appendChild(li);
}


function displayErrorMessage(message) {
    const results = document.getElementById('results');
    results.innerHTML = '';
    const li = document.createElement('li');
    li.textContent = message;
    li.classList.add('error'); 
    results.appendChild(li);
}
