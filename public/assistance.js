const apiData = {
    url: `https://api.schooldigger.com/v2.0/autocomplete/schools?q=Meadowcreek&returnCount=10&appID=7b6332bf&appKey=55a9490dadd2e8a22422b901cf1ced67`,
    type: "Schools",
    id: "1",
}
//destructed
const {url, type, id} = apiData;
const apiUrl = `${url}${type}/${id}`;

// fetch(apiUrl)
//     .then((data) => data.json() )
//     .then((schools) => generateHtml(schools) )

//     const generateHtml = (data) => {
//         console.log(data)
//         console.log(data.schoolMatches[0])
//     }

    const getSchools = async () => {
        try {
            let searchTerm = document.getElementById("school-searching").value;
            const schools = await axios.get(
                `https://api.schooldigger.com/v2.0/autocomplete/schools?q=${searchTerm}&returnCount=4&appID=7b6332bf&appKey=55a9490dadd2e8a22422b901cf1ced67`
            );
            // console.log(schools);
            // console.log(schools.data.schoolMatches);
            let list = schools.data.schoolMatches;
            SchoolsFiltered(list);

            console.log(schools)

        } catch (error) {
            console.error(error);

            document.getElementById('alertBox').innerHTML =
                `
                <div class="alert alert-danger m-5" role="alert">
                    Please Enter Valid Information (i.e : Gwinnett, Virginia, Austin)
                </div>
                `
        }
    }

    let SchoolsFiltered = (list) => {
        const html = `
            <div class="school"> ${list[1].schoolName}</div>`;

           
            console.log(list);

            list.forEach((data) => {
                
                document.getElementById("search-list").innerHTML += 
                `
                <li class="schools-card list-group-item d-flex justify-content-between align-items-start">
                    <div class="ms-2 me-auto">
                    <div class="fw-bold">${data.schoolName}</div>
                    <p> City: ${data.city}, State: ${data.state}, Zip: ${data.zip} </p>
                    </div>
                    <div class='school-r'>
                        <p>School Ranking</p>
                        <span class="badge bg-primary rounded-pill">${data.rank}/${data.rankOf}</span>
                    </div>
                </li>
                `
            });

            if(list.length > 0) {
                document.getElementById('alertBox').innerHTML =
                `
                <div class="alert alert-success m-5" role="alert">
                    Success! Please Check Schools Tab for more information.
                </div>
                `
            }
    }
    



