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

                               <a href = "${userDetailsObj.html_url}" target = "_blank" id = "github-link">
                               <i class="fa-brands fa-github fa-2xl"></i>
                               </a>
  
                               <div class = "card-body text-white">
  
                                  <div class = "card-title">
                                        ${userDetailsObj.name}
                                  </div>
  
                                  <div class = "card-subtitle">
                                        ${userDetailsObj.bio}
                                  </div>
  
                                  <div class = "card-text row">
                                        <span class = "col col-6 details mb-2">Followers:
                                          <span class = "detail-content"> ${userDetailsObj.followers}</span>
                                        </span>
                                        <span class = "col col-6 details mb-2"> Following:
                                          <span class = "detail-content"> ${userDetailsObj.following}</span>
                                        </span>
                                        <span class = "col col-6 details mb-2"> Repos:
                                          <span class = "detail-content"> ${userDetailsObj.public_repos}</span>
                                        </span>
                                        <span class = "col col-6 details mb-2"> Twitter:
                                          <a href = "https://www.twitter.com/${userDetailsObj.twitter_username}" target = "_blank">
                                            <span class = "detail-content"> ${userDetailsObj["twitter_username"]}</span>
                                            <i id = "twitter-icon" class="fa-brands fa-twitter fa-bounce fa-xl"></i>
                                          </a>
                                        </span>
                                        <span class = "col col-6 details mb-2"> Location:
                                          <span class = "detail-content"> ${userDetailsObj.location}</span>
                                        </span>
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
    const mainElement = document.getElementById("main");
    const cardContainer = document.getElementById("card-container");
    const submitElement = document.getElementById("submit");
    const submitButton = document.getElementById("submit-button");

    const loadIcon = document.createElement("div")
    loadIcon.innerHTML = `<i class="fa-sharp fa-solid fa-spinner fa-spin fa-2xl" style="color: #12e293;"></i>`
    loadIcon.setAttribute("style", "display: none")
    cardContainer.append(loadIcon)
  
    formElement.addEventListener("submit", async (event) => {
      event.preventDefault();
      mainElement.style.display = "none"
      mainElement.textContent = ""
      loadIcon.style.display = "block"
      submitButton.setAttribute("disabled", "")
      
      submitElement.addEventListener("mouseover", ()=>{
        submitButton.style["background-color"] = "pink";
      })
      submitElement.addEventListener("mouseout", ()=>{
        submitButton.style["background-color"] = "";
      })
      
      setTimeout(async ()=>{    
      mainElement.style.display = "block"
      loadIcon.style.display = "none"
      submitButton.removeAttribute("disabled");

      submitElement.addEventListener("mouseover", ()=>{
        submitButton.style["background-color"] = "";
      })
      submitElement.addEventListener("mouseout", ()=>{
        submitButton.style["background-color"] = "";
      })
      
      const githubDetails = new GitHub(inputElement.value);
      await githubDetails.createUserCard();
      }, 1350);

    })
  })();
  