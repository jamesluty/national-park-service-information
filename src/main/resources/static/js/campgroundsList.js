
async function getCampgrounds(){
	let state = document.getElementById("stateAbr").innerText
	
	try {
		let res = await fetch("/api/campgrounds/" + state.substring(0,2));
		return await res.json();
	} catch (error){
		console.log(error);
	}	
}

async function renderCampgrounds(){
	let campgrounds = await getCampgrounds();
	let html = '';
	campgrounds.forEach(campground => {
		let images = campground.images;
		let image = "";
		if (images.length>=1){
			image = images[0].url;
			console.log(image)
		}else{
			image = "https://vipvoice.files.wordpress.com/2021/06/arrowhead.jpg";
		}
		let htmlSegment = 
			`<div class="campground">
				<div class="imgSize">
					<img class="listImg" src="${image}" alt="No Image Available"/>
				</div>
				<div class="listDetails">
					<div class="listHeader">			
						<h2 class="listTitle">${campground.name}</h2>
						<p>${campground.addresses.city}, ${campground.addresses.stateCode}</p>
						<div class="btnDiv">
							<a class="btn btn-dark" href="/campgrounds/details/${campground.id}">View details</a>
						</div>
					</div>
					<p>${campground.reservationInfo}</p>
					<p>${campground.description}</p>
						
				</div>
			</div>`;
		html += htmlSegment;

	})
	
	let container = document.querySelector(".container");
	container.innerHTML = html;
}

renderCampgrounds();