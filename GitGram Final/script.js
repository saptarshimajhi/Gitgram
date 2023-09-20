function searchGitHubUser() {
    const username = document.getElementById('username').value;
    const apiUrl = `https://api.github.com/users/${username}`;
    const reposUrl = `https://api.github.com/users/${username}/repos`;

    Promise.all([
        fetch(apiUrl),
        fetch(reposUrl)
    ])
    .then(responses => {
        const userResponse = responses[0];
        const reposResponse = responses[1];
        
        if (!userResponse.ok) {
            throw new Error('GitHub user not found');
        }

        return Promise.all([userResponse.json(), reposResponse.json()]);
    })
    .then(([userData, reposData]) => {
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `
            <h2>${userData.login}</h2>
            <img src="${userData.avatar_url}" alt="Avatar">
            <p>Name: ${userData.name}</p>
            <p>Followers: ${userData.followers}</p>
            <p>Following: ${userData.following}</p>
            <p>Public Repositories: ${userData.public_repos}</p>
            <h3>Repositories:</h3>
            <ul>
                ${reposData.map(repo => `<li>${repo.name}</li>`).join('')}
            </ul>
        `;
    })
    .catch(error => {
        const resultElement = document.getElementById('result');
        resultElement.innerHTML = `<p>${error.message}</p>`;
    });
}


