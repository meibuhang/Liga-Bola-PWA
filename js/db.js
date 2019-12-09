function db(idb) {
  let dbPromise = idb.open("ligabola", 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains("favoteam")) {
      let indexTeamFav = upgradeDb.createObjectStore("favoteam", {
        keyPath: "id"
      },
      );
      indexTeamFav.createIndex("namaTeam", "name", {
        unique: false
      });
    }
  });

  return dbPromise;
}

function checkData(storeName, id) {
  return new Promise(function(resolve, reject) {
    db(idb)
      .then(function(db) {
        var tx = db.transaction(storeName, "readonly");
        var store = tx.objectStore(storeName);
        return store.get(id);
      })
      .then(function(data) {
        if (data !== undefined) {
          resolve("data favorit");
        } else {
          reject("bukan data favorit");
        }
      });
  });
}

function createDataFav(dataType, data) {
  var storeName = "";
  var dataToCreate = {};

  if (dataType === "team") {
    storeName = "favoteam";
    dataToCreate = {
      id: data.id,
      name: data.name,
      shortName: data.shortName,
      area : data.area.name,
      address: data.address,
      phone: data.phone,
      website: data.website,
      email: data.email,
      founded: data.founded,
      clubColors: data.clubColors
    };
  }

  console.log("data" + dataToCreate);
  db(idb)
    .then(db => {
      const tx = db.transaction(storeName, "readwrite");
      tx.objectStore(storeName).put(dataToCreate);

      return tx.complete;
    })
    .then(function() {
      M.toast({
        html: "Data berhasil difavoritkan!"
      });
    })
    .catch(function() {
      M.toast({
        html: "terjadi kesalahan"
      });
    });
}

function deleteDatafav(storeName, data) {
  db(idb)
    .then(function(db) {
      var tx = db.transaction(storeName, "readwrite");
      var store = tx.objectStore(storeName);
      store.delete(data);
      return tx.complete;
    })
    .then(function() {
      console.log("Item deleted");

      M.toast({
        html: "Data berhasil dihapus dari favorit!"
      });
    })
    .catch(function() {
      M.toast({
        html: "terjadi kesalahan"
      });
    });
}

async function getDataFav() {
  let dataFav = "";
  try {
    
    const dbase = await db(idb);
    const tx = await dbase.transaction("favoteam", "readwrite");
    const store = await tx.objectStore("favoteam");
    const data = await store.getAll();

    if (data.length > 0) {
      data.map((datas) => {
        return (dataFav += `
        <div class ="team-container">
        <div class="faveteam-card">
            <h5> ${datas.shortName}</h5>
                <div class="description">
                    <div class="item">
                     ${datas.name}
                    </div>
                  <div class="item">
                ${datas.address}
              </div>
          </div>
          <div id="MyFav" class="delete_button">Delete Favorite</div>
      </div>
</div>
        `);
      });
    } else {
      return (dataFav += `
       <h1>Kamu Tidak Memiliki Team Favorite</h1>
              
   `);
    }
    return (document.getElementById("faveteam").innerHTML = dataFav);
  } catch (e) {
    return new Error(e);
  }
}
