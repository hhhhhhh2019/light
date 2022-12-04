const scWidth  = 500;
const scHeight = 500;

viewport.width  = scWidth;
viewport.height = scHeight;

const ctx = viewport.getContext("2d");
ctx.imageSmoothingEnabled = false;

const img = ctx.createImageData(scWidth,scHeight);
const data = img.data;


const map = [];

for (let i = 0; i < scWidth * scHeight; i++) {
	map.push({
		height: 0,
		velocity: 0,
		mass: 1
	});
}


const getHeight = (x,y) => {
	if (x < 0 || y < 0 || x >= scWidth || y >= scHeight)
		return 0;
	return map[y * scWidth + x].height;
}

const updatePixel = (x,y) => {
	let id = y * scWidth + x;

	if (map[id].mass == 0) return;

	let force = 
		getHeight(x+1,y) +
		getHeight(x-1,y) +
		getHeight(x,y-1) +
		getHeight(x,y+1);
	
	force /= 4;

	map[id].velocity += (force - map[id].height) / map[id].mass;
}

const pixel = (x,y,r,g,b) => {
	let id = (y * scWidth + x) * 4;

	data[id + 0] = r;
	data[id + 1] = g;
	data[id + 2] = b;
	data[id + 3] = 255;
}



/*for (let x = -100; x < 100; x++) {
	for (let y = -100; y < 100; y++) {
		if (x*x+y*y > 10000) continue;

		let id = (y + 250) * scWidth + (x + 350);

		map[id].mass = 3/4;
	}
}*/

for (let x = 150; x < 160; x++) {
	for (let y = 0 ; y < scHeight; y++) {
		//if (200 < y && y < 220) continue;
		//if (280 < y && y < 300) continue;
		if (240 < y && y < 260) continue;

		let id = y * scWidth + x;

		map[id].mass = 100;
	}
}


/*for (let x = -20; x < 20; x++) {
	for (let y = -20; y < 20; y++) {
		if (x*x+y*y > 400) continue;


		let id = (y + 160) * scWidth + (x + 100);

		map[id].height = 
			Math.sin((x + 20) / 40 * Math.PI * 11) ;/*-
			Math.sin((y - 20) / 40 * Math.PI) * .125;
	}
}*/


//map[250*scWidth+100].height = 100;


var frame = 0;

const update = () => {
	/*if (frame <= 10) {
		map[250*scWidth+250].height = Math.sin(frame/10*Math.PI) * 100;
	}*/

	if (frame < 10000) {
		let h = Math.sin(frame/100*Math.PI*5);
		for (let y = 250; y <= 250; y++) {
			map[y*scWidth+60].height = h;
		}
	}


	for (let x = 0; x < scWidth; x++) {
		for (let y = 0; y < scHeight; y++) {
			let id = y * scWidth + x;

			map[id].height += map[id].velocity;

			let h = map[id].height * 255 * 20;

			let r = h;
			let g = map[id].mass * 20;
			let b = -h;

			pixel(x,y,r,g,b);
		}
	}

	for (let x = 0; x < scWidth; x++) {
		for (let y = 0; y < scHeight; y++) {
			updatePixel(x,y);
		}
	}

	ctx.putImageData(img,0,0);
	frame++;
	requestAnimationFrame(update);
}

update();
