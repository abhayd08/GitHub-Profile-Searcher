class GitHub {
    constructor(username) {
      this.username = username;
    }
  
    getUserDetails = async () => {
      const fetchUserDetails = await fetch(
        `https://api.github.com/users/${this.username}`
      );
      const userDetails = await fetchUserDetails.json();
      return userDetails;
    };
  
    createUserCard = async () => {
      const userDetailsObj = await this.getUserDetails();
  
      const mainElement = document.getElementById("main");
  
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.innerHTML = `<div class = "img-container">
                                  <img src = ${userDetailsObj.avatar_url} class = "img-fluid" alt = "avatar-${userDetailsObj.login}"></img>
                               </div>
  
                               <div class = "card-body text-white">
  
                                  <div class = "card-title">
                                        ${userDetailsObj.name}
                                  </div>
  
                                  <div class = "card-subtitle">
                                        ${userDetailsObj.bio}
                                  </div>
  
                                  <div class = "card-text row">
                                        <div class = "col col-6 details mb-2">Followers:
                                          <span class = "detail-content"> ${userDetailsObj.followers}</span>
                                        </div>
                                        <div class = "col col-6 details mb-2"> Following:
                                          <span class = "detail-content"> ${userDetailsObj.following}</span>
                                        </div>
                                        <div class = "col col-6 details mb-2"> Repos:
                                          <span class = "detail-content"> ${userDetailsObj.public_repos}</span>
                                        </div>
                                        <div class = "col col-6 details mb-2"> Twitter:
                                          <span class = "detail-content"> ${userDetailsObj["twitter_username"]}</span>
                                        </div>
                                        <div class = "col col-6 details mb-2"> Location:
                                          <span class = "detail-content"> ${userDetailsObj.location}</span>
                                        </div>
                                  </div>
                                  
                               </div>
                                  
                               </div>`;
  
      mainElement.append(cardElement);
  
      return userDetailsObj;
    };
  }
  
  (() => {
    const formElement = document.getElementById("form");
    const inputElement = document.getElementById("search");
  
    formElement.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const mainElement = document.getElementById("main");
      mainElement.textContent = " ";
      const githubDetails = new GitHub(inputElement.value);
      await githubDetails.createUserCard();
    });
  })();
  