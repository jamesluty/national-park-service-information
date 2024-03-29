
async function getParks(){
	let state = document.getElementById("stateAbr").innerText
	
	try {
		let res = await fetch("/api/parks/" + state.substring(0,2));
		return await res.json();
	} catch (error){
		console.log(error);
	}	
}

async function renderParks(){
	let parks = await getParks();
	let html = '';
	
	
	parks.forEach(park => {
		let image = "";
		
		if (park.images.length>=1){
			image = park.images[0].url;
		}else{
			image = "https://vipvoice.files.wordpress.com/2021/06/arrowhead.jpg";
		}
		let htmlSegment = 
			`<div class="park">
				<div class=listImgDiv>
					<img class="listImg" src="${image}"/>
				</div>
				<div class="listDetails">
					<div class="listHeader">
						<h3 class="listItemTitle">${park.name}</h3>
						<div class=detailBtnDiv>
							<a class="btn btn-dark smBtn" href="/parks/details/${park.parkCode}">View details</a>
						</div>						
					</div>
					<p>${park.description}</p>
				</div>
			</div>`;
		html += htmlSegment;
	})
	
	let container = document.querySelector(".container");
	container.innerHTML = html;
}

renderParks();