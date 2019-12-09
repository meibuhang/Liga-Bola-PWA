const config = {
  token: "96915e3e9b1244d889df953abaa5d717",
  base_url: "https://api.football-data.org/v2",
  id_liga: 2021,
  /*
  Champions League = 2001
  Liga Jerman = 2002
  Liga Belanda = 2003
  Liga Inggris = 2021
  Liga Spanyol = 2014
  Liga Perancis = 2015
  */
  get endpoint() {
    return {
      klasemens: `${this.base_url}/competitions/${this.id_liga}/standings?standingType=TOTAL`,
      team: `${this.base_url}/teams`,
      jadwal: `${this.base_url}/competitions/${this.id_liga}/matches?status=SCHEDULED`,
      detail: `${this.base_url}/matches`
    };
  }
};

const { token, endpoint } = config;

function fetchData(url) {
  return fetch(url, {
    method: "GET",
    headers: {
      "X-Auth-Token": token
    }
  });
}


//get klasemen
async function getKlasemen() {
    try {
     const res = await caches.match(endpoint.klasemens);
      if (res) {
        const data = await res.json();
        let klasmenHTML = "";
        let TeamHTML = "";
        data.standings.slice(0, 10).forEach(klasemen => {
          klasemen.table.slice(0, 10).forEach(dataTeam => {
            TeamHTML +=`
            <li class="cards_item">
            <div class="card">
              <div class="card_image">
              <img src=${dataTeam.team.crestUrl}>
              </div>
              <div class="card_content">
              <div class="card_title">${dataTeam.team.name}</div>
              <div id="line">
              <div class="label">Position: </div>
              <div class="value">${dataTeam.position} </div>
              </div>
              <div id="line">
              <div class="label">Play : </div>
              <div class="value"> ${dataTeam.playedGames} </div>
              </div>
              <div id="line">
              <div class="label">Won : </div>
              <div class="value"> ${dataTeam.won} </div>
              </div>
              <div id="line">
              <div class="label">Draw : </div>
              <div class="value"> ${dataTeam.draw} </div>
              </div>
              <div id="line">
              <div class="label">Lost : </div>
              <div class="value"> ${dataTeam.lost} </div>
              </div>
              <div id="line">
              <div class="label">Points : </div>
              <div class="value"> ${dataTeam.points} </div>
              </div>
              <div id="line">
              <div class="label">GF : </div>
              <div class="value"> ${dataTeam.goalsFor} </div>
              </div>
              <div id="line">
              <div class="label">GA : </div>
              <div class="value"> ${dataTeam.goalsAgainst} </div>
              </div>
              <div id="line">
              <div class="label">GD : </div>
              <div class="value"> ${dataTeam.goalDifference} </div>
              </div>
             
              <a href="../listteam.html?id=${dataTeam.team.id}" class="btn btn-default"> Detail Team </a>
              </div>
            </div>
          </li>
  `;
  });
  klasmenHTML += `
  <div class="main">
  <ul class="cards">
            ${TeamHTML}
    </ul>
    </div>
    `;
       });
       document.getElementById("body-content").innerHTML=klasmenHTML;
     }
   } catch(err){
     console.log(err);
   }
 try{
  const datas =await fetchData(endpoint.klasemens);
  const data = await datas.json();
  let klasmenHTML = "";
  let TeamHTML = "";
  data.standings.slice(0, 10).forEach(klasemen => {
   klasemen.table.slice(0, 10).forEach(dataTeam => {
      TeamHTML +=`
               <li class="cards_item">
              <div class="card">
                <div class="card_image">
                <img src=${dataTeam.team.crestUrl}>
                </div>
                <div class="card_content">
                <div class="card_title">${dataTeam.team.name}</div>
                <div id="line">
                <div class="label">Position: </div>
                <div class="value">${dataTeam.position} </div>
                </div>
                <div id="line">
                <div class="label">Play : </div>
                <div class="value"> ${dataTeam.playedGames} </div>
                </div>
                <div id="line">
                <div class="label">Won : </div>
                <div class="value"> ${dataTeam.won} </div>
                </div>
                <div id="line">
                <div class="label">Draw : </div>
                <div class="value"> ${dataTeam.draw} </div>
                </div>
                <div id="line">
                <div class="label">Lost : </div>
                <div class="value"> ${dataTeam.lost} </div>
                </div>
                <div id="line">
                <div class="label">Points : </div>
                <div class="value"> ${dataTeam.points} </div>
                </div>
                <div id="line">
                <div class="label">GF : </div>
                <div class="value"> ${dataTeam.goalsFor} </div>
                </div>
                <div id="line">
                <div class="label">GA : </div>
                <div class="value"> ${dataTeam.goalsAgainst} </div>
                </div>
                <div id="line">
                <div class="label">GD : </div>
                <div class="value"> ${dataTeam.goalDifference} </div>
                </div>
               
                <a href="../listteam.html?id=${dataTeam.team.id}" class="btn btn-default"> Detail Team </a>
                </div>
              </div>
            </li>
    `;
    });
    klasmenHTML += `
    <div class="main">
    <ul class="cards">
              ${TeamHTML}
  </ul>
  </div>
   `;
 });
 document.getElementById("body-content").innerHTML=klasmenHTML;
} catch(err){
console.log(err);
}
}


//get jadwal
 async function getMatch() {
  if ('caches' in window) {
    try {
      const res = await caches.match(endpoint.jadwal);
      if (res) {
        const data =  await res.json();
        let matchesHTML = "";
        // let just showing 10 data on page
        data.matches.slice(0, 10).forEach(data => {
          matchesHTML += `
       <div class="card">
        <div class="card-content">
         <div id="title">MATCH </div>
           <div id="teams-container">
              <div class="flexbox-items">
               <div id="homeTeam" class="name">
               ${data.homeTeam.name}
                </div>
              </div>
              <div class="flexbox-items" >
                 <div id="time-of-match">
                 ${new Date(data.utcDate).toLocaleString("en-id",{
                  hour: "2-digit",
                  minute: "2-digit"
                 })}
                 </div>
                 <div id="date-of-match">
                 ${new Date(data.utcDate).toLocaleString("en-id", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric"
                 })}
                 </div>
             </div>
            <div class="flexbox-items">
              <div id="awayTeam" class="name">
              ${data.awayTeam.name}
              </div>
            </div>
          </div>
         <hr id="bottom-devider" /> 
      </div>
      </div>
              `;
        });
        document.getElementById("jadwal").innerHTML = matchesHTML;
      }
    } catch (err) {
      console.log(err);
    }
 }
 
    const res = await fetchData(endpoint.jadwal);
    const data = await res.json();
    let matchesHTML = "";
    // let just showing 10 data on page
    data.matches.slice(0, 5).forEach(data => {
      matchesHTML += `
      <div class="card">
        <div class="card-content">
         <div id="title">MATCH </div>
           <div id="teams-container">
              <div class="flexbox-items">
               <div id="homeTeam" class="name">
               ${data.homeTeam.name}
                </div>
              </div>
              <div class="flexbox-items">
                 <div id="time-of-match">
                 ${new Date(data.utcDate).toLocaleString("en-id",{
                  hour: "2-digit",
                  minute: "2-digit"
                 })}
                 </div>
                 <div id="date-of-match">
                 ${new Date(data.utcDate).toLocaleString("en-id", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric"
                 })}
                 </div>
             </div>
            <div class="flexbox-items">
              <div id="awayTeam" class="name">
              ${data.awayTeam.name}
              </div>
            </div>
          </div>
         <hr id="bottom-devider" /> 
      </div>
      </div>
    
            `;
    });
    document.getElementById("jadwal").innerHTML = matchesHTML;
  
 }

async function getTeamById() {
  let urls = new URLSearchParams(window.location.search);
  let idTeam = urls.get("id");
    const res = await caches.match(`${endpoint.team}/${idTeam}`);
    if (res) {
      const data = await res.json();
      let TeamHTML = `
      <div class="team-container">
       <div class="team-card">
        <div class="team-card__content">
         <div class="head_detail"><h5> Detail Team </h5></div>
          <div id="line">
            <div class="label">Team Name :</div>
             <div class="value"><b>${data.name}</b> ( ${data.shortName} )</div>
              </div>
                <div id="line">
                  <div class="label">Area :</div>
                   <div class="value">${data.area.name}</div>
                   </div>
                   <div id="line">
                <div class="label">Address : </div>
              <div class="value">${data.address}</div>
             </div>
            <div id="line">
          <div class="label">Phone : </div>
        <div class="value">${data.phone}</div>
      </div>
        <div id="line">
          <div class="label">Email : </div>
            <div class="value">${data.email}</div>
              </div>
                <div id="line">
                  <div class="label">Website : </div>
                    <div class="value">${data.website}</div>
                      </div>
                        <div id="line">
                          <div class="label">Founded : </div>
                            <div class="value">${data.founded}</div>
                              </div>
                            <div id="line">
                          <div class="label">Club Colors : </div>
                        <div class="value">${data.clubColors}</div>
                      </div>
                    </div>
                  <div class="team-card__actions">
                <div id="MyFav" class="actions-button">Add to Favorite</div>
              </div>
            </div>
          </div>
        `;
      document.getElementById("body-content").innerHTML = TeamHTML;
    }

  const datas = await fetchData(`${endpoint.team}/${idTeam}`);
  const data = await datas.json();
  let TeamHTML = `
  <div class="team-container">
       <div class="team-card">
        <div class="team-card__content">
          <div class="head_detail"><h5> Detail Team </h5></div>
          <div id="line">
            <div class="label">Team Name :</div>
             <div class="value"><b>${data.name}</b> ( ${data.shortName} )</div>
              </div>
                <div id="line">
                  <div class="label">Area :</div>
                   <div class="value">${data.area.name}</div>
                   </div>
                   <div id="line">
                <div class="label">Address : </div>
              <div class="value">${data.address}</div>
             </div>
            <div id="line">
          <div class="label">Phone : </div>
        <div class="value">${data.phone}</div>
      </div>
        <div id="line">
          <div class="label">Email : </div>
            <div class="value">${data.email}</div>
              </div>
                <div id="line">
                  <div class="label">Website : </div>
                    <div class="value">${data.website}</div>
                      </div>
                        <div id="line">
                          <div class="label">Founded : </div>
                            <div class="value">${data.founded}</div>
                              </div>
                            <div id="line">
                          <div class="label">Club Colors : </div>
                        <div class="value">${data.clubColors}</div>
                      </div>
                    </div>
                  <div class="team-card__actions">
                <div id="MyFav" class="action_button">Add to Favorite</div>
              </div>
            </div>
          </div>
        `;
        document.getElementById("body-content").innerHTML = TeamHTML;
}

async function dataTeamIDB() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  try {
    const res = await fetchData(`${endpoint.team}/${idParam}`);
    const data = await res.json();
    return data;
  } catch {
    throw new Error();
  }
}