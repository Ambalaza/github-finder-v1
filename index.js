const username = document.getElementById('username');
const searchBtn = document.getElementById('search');
const errorUsername = document.getElementById('error');
const results = document.getElementById('results');

const getUser = async (username) => {
    try {
        const url = `https://api.github.com/users/${username}`;
        console.log(url);
        const response = await (await fetch(url)).json();

        if (response.message === 'Not Found') {
            errorUsername.innerHTML = 'Invalid username.';
        } else {
            console.log(response);
            const userImage = response.avatar_url ? response.avatar_url : 'Not provided';
            const repositories = response.public_repos ? response.public_repos : '0';
            const followers = response.followers ? Number(response.followers) : '0';
            const following = response.following ? Number(response.following) : '0';
            const name = response.name ? response.name : 'Not provided';
            const username = response.login;

            const company = response.company ? response.company : 'No company';
            const workPlace = company.split(',');
            console.log(workPlace);


            const bio = response.bio ? response.bio : 'No Bio';

            const activeSince = response.created_at;
            const date = new Date(activeSince).toDateString().slice(3);
            console.log(typeof date, date);


            const email = response.email ? response.email : 'No email';
            const location = response.location ? response.location : 'No location';
            const blog = response.blog ? response.blog : 'No blog';

            const card = `
                <h2 class="clr-primary fs-20 pb-2">Results:</h2>
                <article class="card border-radius-2 box-shadow-1 mb-5">
                    <div class="flex pt-5 pl-5 pb-3">
                        <img class="user-img border-radius-rounded" id="user-img" src="${userImage}" alt="user-img" height="150" width="150">
                        <div>
                            <h3 class="fs-20 fw-700">${name}</h3>
                            <p class="clr-primary fw-700">${username}</p>
                        </div>
                    </div>
                    <div class="flex flex-space-between pl-6 pr-6">
                        <div class="vertical-line">
                            <p class="fw-700 fs-24" id="repositories">${repositories}</p>
                            <h5 class="fw-700 fs-16">Repositories</h5>
                        </div>
                        <div>
                            <p class="fw-700 fs-24" id="followers">${followers}</p>
                            <h5 class="fw-700 fs-16" for="followers">Followers</h5>
                        </div>
                        <div>
                            <p class="fw-700 fs-24" id="following">${following}</p>
                            <h5 class="fw-700 fs-16" for="following">Following</h5>
                        </div>
                    </div>
                    <div class="pl-6 pr-6 pt-4 pb-4">
                        <div class="flex pb-1">
                            <img src="./images/company-icon.svg" alt="company-icon">
                            <p class="fw-500">${company}</p>
                        </div>
                        <div class="flex pb-1">
                            <img src="./images/bio-icon.svg" alt="bio-icon">
                            <p class="fw-500">${bio}</p>
                        </div>
                        <div class="flex pb-1">
                            <img src="./images/clock-icon.svg" alt="clock-icon">
                            <p class="fw-500">Active since ${date}</p>
                        </div>
                        <div class="flex pb-1">
                            <img src="./images/email-icon.svg" alt="email-icon">
                            <p class="fw-500">${email}</p>
                        </div>
                        <div class="flex pb-1">
                            <img src="./images/location-icon.svg" alt="location-icon">
                            <p class="fw-500">${location}</p>
                        </div>
                        <div class="flex">
                            <img src="./images/link-icon.svg" alt="link-icon">
                            <p class="fw-500">${blog}</p>
                        </div>
                    </div>
                </article>
            `;
            results.innerHTML = card;
        }
    } catch(err) {
        console.log(err);
        errorUsername.innerHTML = 'Something wen\' t wrong';
    }
}

const onSearch = () => {

    console.log('button clicked');
    
    errorUsername.innerHTML = '';
    if (username.value === '') {
        errorUsername.innerHTML = 'Please enter username.'
    } else {
        getUser(username.value)
    }
}

const onKeyPress = (e) => {
    if(e.keyCode === 13) {
        console.log('enter was pressed');
        onSearch();
    }

    // if(e.key === 'Enter') {
    //     console.log('enter was pressed');
    //     onSearch();
    // }
}

searchBtn.addEventListener('click', onSearch);
username.addEventListener('keypress', onKeyPress);