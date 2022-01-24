let scene = 0;
let font;
const colorIndex = ["", "Cytoplasme", "Noyau", "Mitochondrie", "Membrane Cellulaire", "Réticulum Endoplasmique", "Appareil de Golgi", "Vacuole", "Lysosome", "Ribosomes"]
const organelleDesc = ["",
	"Le cytoplasme:\nUn liquide gélatineux qui remplit la cellule, et qui sert comme base pour les fonctions des organites.",
	"Le noyau:\nLe cerveau de la cellule. Il organise les actions de la cellule, et sert à garder, conserver, et transcrire les gènes. Il est entouré par la membrane nucléaire, qui sépare l’ADN de les autres parties de la cellule.",
	"La mitochondrie:\nIl produit la plupart d’énergie chimique nécessaire pour la cellule, en forme de l’ATP.",
	"La membrane cellulaire:\nUn membrane semipermeable autour de la cellule. Il protège la cellule et contrôle le transport des matériaux entre l'intérieur et l’extérieur de la cellule.",
	"Le réticulum endoplasmique:\nIl sert pour fabriquer, manipuler, et transporter les protéines pour les autres parties de la cellule.",
	"L'appareil de Golgi:\nResponsable pour la processus et le conditionnement des protéines avant la transportation.",
	"La vacuole:\nResponsable pour maintenir la stabilité et l’homéostasie dans les cellules, par la réserve et le traitement de l’eau, la nourriture, et les déchets.",
	"Les lysosomes:\nIl contient des enzymes qui aident à digérer les protéines et les déchets cellulaires, et aussi durant le processus de renouvellement cellulaire.",
	"Les ribosomes:\nIl sert à traduire l’ARN et synthétiser les protéines par conséquent."
]
let transition = -1;
let transitionPhase = 0;

const freeze = false;
const fixedRes = 0;

let animarr = [];
let animCircleHitboxes = [];
let mouseOverIndex = 0;
let pMouseIsPressed = false;

function preload() {
	font = loadFont('OpenSans.ttf');
}

function setup() {
	if (fixedRes) {
		createCanvas(fixedRes, fixedRes);
	} else {
		createCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight));
	}
	
	frameRate(30);
	angleMode(DEGREES);
	colorMode(RGB, 255, 255, 255, 30);
	
	for (let i = 0; i < 30; i++) {
		animarr[i] = [];
	}
	
	createAnimArr(animarr[0], 16, 64, 100);
	createAnimArr(animarr[1], 16, 256, 25);
	createAnimArr(animarr[2], 24, 1024, 25);
	createAnimArr(animarr[3], 16, 1024, 50);
	createAnimArr(animarr[4], 16, 1024, 50);
	createAnimArr(animarr[5], 16, 1024, 50);
	createAnimArr(animarr[6], 24, 512, 25);
	createAnimArr(animarr[7], 24, 512, 25);
	createAnimArr(animarr[8], 24, 512, 25);
	createAnimArr(animarr[9], 24, 512, 25);
	createAnimArr(animarr[10], 24, 512, 25);
	createAnimArr(animarr[11], 16, 512, 25);
	createAnimArr(animarr[12], 16, 512, 25);
	createAnimArr(animarr[13], 3, 512, 25);
	createAnimArr(animarr[14], 3, 512, 25);
	createAnimArr(animarr[15], 3, 512, 25);
	createAnimArr(animarr[16], 3, 512, 25);
	createAnimArr(animarr[17], 3, 512, 25);
	createAnimArr(animarr[18], 3, 512, 25);
	createAnimArr(animarr[19], 4, 512, 50);
	createAnimArr(animarr[20], 4, 512, 50);
	createAnimArr(animarr[21], 24, 128, 100);
	createAnimArr(animarr[22], 4, 512, 50);
	createAnimArr(animarr[23], 16, 256, 50);
	createAnimArr(animarr[24], 16, 256, 50);
	createAnimArr(animarr[25], 16, 256, 50);
	createAnimArr(animarr[26], 24, 384, 50);
	createAnimArr(animarr[27], 16, 512, 25);
	createAnimArr(animarr[28], 16, 512, 25);
	createAnimArr(animarr[29], 16, 512, 25);
}

function draw() {	
	if (!fixedRes) resizeCanvas(min(windowWidth, windowHeight), min(windowWidth, windowHeight), true);
	textFont(font, height/40);
	background(255);
	
	scenes(scene, !(transition + 1));
	
	if (transition < 0) {
		if (scene == 0) {
			mouseOverIndex = mouseCheck();
		} else {
			if (mouseX >= 0 && mouseX <= 7*width/128 && mouseY >= 0 && mouseY <= 3*height/64) {
				fill(0, 5);
				rect(0, 0, 7*width/128 + 1, 3*height/64 + 1);
				
				if (mouseIsPressed && !pMouseIsPressed) {
					transition = 0;
				}
			}
		}
		
		if (mouseIsPressed) {
			if (!pMouseIsPressed && mouseOverIndex && scene == 0) {
				transition = mouseOverIndex;
			}
			
			pMouseIsPressed = true;
		} else {
			pMouseIsPressed = false;
		}
	} else {
		transitionPhase++;
		background(255, 2*transitionPhase);
		
		push();
		translate(width*(15 - transitionPhase)/30, height*(15 - transitionPhase)/30);
		scale(transitionPhase/15);
		scenes(transition, false);
		pop();
		
		if (transitionPhase == 15) {
			scene = transition;
			transition = -1;
			transitionPhase = 0;
		}
	}
}

function createAnimArr(anim, length, factor, spdmulti) {
	anim[0] = [];
	anim[1] = [];
	
	for (let i = 0; i < length; i++) {
		anim[0][i] = random(-height/factor, height/factor);
		anim[1][i] = random([-height/(factor*spdmulti), height/(factor*spdmulti)]);
		
		if (freeze) anim[0][i] = 0;
	}
	
	anim[2] = factor;
	anim[3] = factor*spdmulti;
}

function animate(anim) {
	for (let i = 0; i < anim[0].length; i++) {
		anim[1][i] = Math.sign(anim[1][i])*(height/anim[3]);
		
		if (anim[0][i] < -height/anim[2] || anim[0][i] > height/anim[2]) {
			anim[0][i] = Math.sign(anim[0][i])*height/anim[2];
			anim[1][i] = -anim[1][i];
		}
		
		anim[0][i] += anim[1][i];
	}
}

function animRound(xpos, ypos, xlen, ylen, elonglen, coff, cind, rot, anim) {
	push();
	translate(xpos, ypos);
	rotate(rot);
	translate(-xpos, -ypos);
	translate(xpos - xlen/2, ypos - ylen/2);
	beginShape();
	curveVertex(xlen*(2 - sqrt(2))/4 + anim[14], ylen*(2 - sqrt(2) - 2*elonglen)/4 + anim[15]);
	curveVertex(xlen/2 + anim[0], anim[1] - ylen*elonglen/2);
	curveVertex(xlen*(2 + sqrt(2))/4 + anim[2], ylen*(2 - sqrt(2) - 2*elonglen)/4 + anim[3]);
	curveVertex(xlen*(1 + coff/4) + anim[4], ylen*(1 - 7*elonglen/8)/2 + anim[5]);
	
	if (elonglen > 0) {
		if (coff > 0) {
			curveVertex(xlen*(1 + 7*coff/8 - cind) + anim[16], ylen/2 + anim[17]);
		} else {
			curveVertex(xlen*(1 + coff - cind) + anim[16], ylen/2 + anim[17]);
		}
		
		curveVertex(xlen*(1 + (coff - cind)/4) + anim[20], ylen*(1 + 7*elonglen/8)/2 + anim[21]);
	}
	
	curveVertex(xlen*(2 + sqrt(2))/4 + anim[6], ylen*(2 + sqrt(2) + 2*elonglen)/4 + anim[7]);
	curveVertex(xlen/2 + anim[8], ylen*(1 + elonglen/2) + anim[9]);
	curveVertex(xlen*(2 - sqrt(2))/4 + anim[10], ylen*(2 + sqrt(2) + 2*elonglen)/4 + anim[11]);
	curveVertex(xlen*coff/4 + anim[12], ylen*(1 + 7*elonglen/8)/2 + anim[13]);
	
	if (elonglen > 0) {
		if (coff > 0) {
			curveVertex(xlen*(coff + cind) + anim[18], ylen/2 + anim[19]);
		} else {
			curveVertex(xlen*(7*coff/8 + cind) + anim[18], ylen/2 + anim[19]);
		}
		
		curveVertex(xlen*(coff + cind)/4 + anim[22], ylen*(1 - 7*elonglen/8)/2 + anim[23]);
	}
	
	curveVertex(xlen*(2 - sqrt(2))/4 + anim[14], ylen*(2 - sqrt(2) - 2*elonglen)/4 + anim[15]);
	curveVertex(xlen/2 + anim[0], anim[1] - ylen*elonglen/2);
	curveVertex(xlen*(2 + sqrt(2))/4 + anim[2], ylen*(2 - sqrt(2) - 2*elonglen)/4 + anim[3]);
	endShape();
	pop();
}

function animER(cenx, ceny, dist, wgt, angst, ang, anim) {
	strokeWeight(wgt + anim[3]/4);
	noFill();
	arc(cenx + anim[0]*2, ceny + anim[1]*2, 2*dist, 2*dist, angst - 90 + anim[2], angst + ang - 90 + anim[2], OPEN);
}

function animCircle(cenx, ceny, diam, num, dist, cen, rot, anim) {
	if (cen) circle(cenx + anim[0], ceny + anim[1], diam);
	
	for (let a = rot - 90 + anim[2]*4; a < 270 + rot + anim[2]*4; a += 360/num) {
		circle(cenx + cos(a)*dist + anim[0], ceny + sin(a)*dist + anim[1], diam);
	}
	
	animCircleHitboxes[animCircleHitboxes.length] = [cenx + anim[0], ceny + anim[1], diam/2 + dist];
}

function scenes(index, textBool) {
	if (index == 0) {
		animCircleHitboxes = [];
		
		//Animation
		if (!freeze) {
			for (let i = 0; i < 21; i++) {
				animate(animarr[i]);
			}
		}
		
		//Cell membrane and cytoplasm
		strokeWeight(height/96)
		stroke(0);
		fill(170, 226, 232);
		animRound(width/2, height/2, 4*width/5, 4*height/5, 0, 0, 0, 0, animarr[0][0]);
		
		//Nucleus
		noStroke();
		fill(224, 224, 64);
		animRound(width/2, height/2, width/6, height/6, 0, 0, 0, 0, animarr[1][0]);
		
		//Endoplasmic Reticulum
		stroke(64, 64, 192);
		animER(width/2, height/2, width/12, height/128, 50, 50, animarr[19][0]);
		animER(width/2, height/2, width/12, height/128, 110, 20, animarr[19][0]);
		animER(width/2, height/2, width/12, height/128, 140, 40, animarr[19][0]);
		animER(width/2, height/2, 3*width/32, height/128, 65, 55, animarr[19][0]);
		animER(width/2, height/2, 3*width/32, height/128, 128, 30, animarr[19][0]);
		animER(width/2, height/2, 5*width/48, height/128, 45, 25, animarr[19][0]);
		animER(width/2, height/2, 5*width/48, height/128, 77, 90, animarr[19][0]);
		animER(width/2, height/2, 11*width/96, height/128, 60, 40, animarr[19][0]);
		animER(width/2, height/2, 11*width/96, height/128, 106, 20, animarr[19][0]);
		animER(width/2, height/2, 11*width/96, height/128, 132, 25, animarr[19][0]);
		animER(width/2, height/2, width/8, height/128, 70, 40, animarr[19][0]);
		animER(width/2, height/2, width/8, height/128, 115, 25, animarr[19][0]);
		
		animER(width/2, height/2, width/12, height/128, 210, 35, animarr[20][0]);
		animER(width/2, height/2, width/12, height/128, 255, 45, animarr[20][0]);
		animER(width/2, height/2, 3*width/32, height/128, 220, 40, animarr[20][0]);
		animER(width/2, height/2, 3*width/32, height/128, 268, 25, animarr[20][0]);
		animER(width/2, height/2, 5*width/48, height/128, 215, 65, animarr[20][0]);
		
		//Golgi apparatus
		noStroke();
		fill(180, 80, 112);
		animRound(3*width/10, 53*height/80, width/96, height/96, 13, -0.5, 0.1, -39, animarr[2][0]);
		animRound(91*width/320, 217*height/320, width/72, height/72, 15, 0.5, 0.1, -39, animarr[2][0]);
		animRound(43*width/160, 109*height/160, width/96, height/96, 15, 1, 0.1, -40, animarr[2][0]);
		animRound(21*width/80, 11*height/16, width/112, height/112, 15, 1.1, 0.1, -41, animarr[2][0]);
		animRound(41*width/160, 111*height/160, width/112, height/112, 11, 1.2, 0.1, -42, animarr[2][0]);
		
		animRound(21*width/80, 57*height/80, width/96, height/96, 0, 0, 0, 0, animarr[3][0]);
		animRound(width/5, 51*height/80, width/96, height/96, 0, 0, 0, 0, animarr[4][0]);
		animRound(27*width/80, 11*height/16, width/96, height/96, 0, 0, 0, 0, animarr[5][0]);
		
		//Mitochondrion
		fill(50, 168, 82);
		animRound(2*width/3, 3*height/4, width/24, height/24, 2.5, -0.2, 0, 25, animarr[6][0]);
		animRound(35*width/48, 3*height/8, width/24, height/24, 2.5, -0.2, 0, -70, animarr[7][0]);
		animRound(17*width/48, 5*height/16, width/24, height/24, 2.5, 0.2, 0, 35, animarr[8][0]);
		
		//Vacuoles
		fill(8, 160, 160);
		animRound(7*width/12, height/4, width/20, height/20, 1, 0, 0, -85, animarr[9][0]);
		animRound(11*width/48, 23*height/48, width/20, height/20, 1, 0, 0, -55, animarr[10][0]);
		
		//Lysosomes
		fill(255, 96, 96);
		animRound(3*width/4, height/2, width/16, height/16, 0, 0, 0, 0, animarr[11][0]);
		animRound(23*width/48, 35*height/48, width/16, height/16, 0, 0, 0, 0, animarr[12][0]);
		
		//Ribosomes
		fill(240, 48, 48);
		animCircle(4*width/5, 19*height/30, height/192, 5, height/128, true, -20, animarr[12][0]);
		animCircle(41*width/60, 3*height/5, height/192, 3, height/192, false, 40, animarr[13][0]);
		animCircle(2*width/5, 13*height/20, height/192, 4, height/192, false, -10, animarr[14][0]);
		animCircle(8*width/15, 5*height/6, height/192, 4, height/128, true, -30, animarr[15][0]);
		animCircle(29*width/60, 7*height/20, height/192, 3, height/192, false, 25, animarr[16][0]);
		animCircle(width/4, 2*height/5, height/192, 6, height/128, true, 10, animarr[17][0]);
		animCircle(3*width/5, 11*height/60, height/192, 4, height/192, false, -15, animarr[18][0]);
		
		fill(128);
		
		if (mouseOverIndex && textBool) previewPane(colorIndex[mouseOverIndex]);
	} else {
		animate(animarr[21]);
		
		if (index == 1) {
			fill(170, 226, 232);
			circle(width/2, height/2, sqrt(2)*height);
		} else if (index == 2) {
			fill(224, 224, 64);
			animRound(width/2, 3*height/8, width/2, height/2, 0, 0, 0, 0, animarr[21][0]);
		} else if (index == 3) {
			fill(50, 168, 82);
			animRound(width/2, 3*height/8, width/5, height/5, 2.5, 0.2, 0, 80, animarr[21][0]);
		} else if (index == 4) {
			stroke(0);
			strokeWeight(height/10);
			line(0, 3*height/8 + 2*animarr[21][0][0], width, 3*height/8 + 2*animarr[21][0][1]);
		} else if (index == 5) {
			animate(animarr[22]);
			stroke(64, 64, 192);
			animER(width/2, -height/2, 11*height/12, height/20, 157, 27, animarr[22][0]);
			animER(width/2, -height/2, 11*height/12, height/20, 190, 13, animarr[22][0]);
			animER(width/2, -height/2, height, height/20, 153, 12, animarr[22][0]);
			animER(width/2, -height/2, height, height/20, 170, 37, animarr[22][0]);
		} else if (index == 6) {
			for (let i = 26; i < 30; i++) {
				animate(animarr[i]);
			}
			
			fill(180, 80, 112);
			animRound(39*width/80, 93*height/320, width/24, height/24, 13, 0.5, 0.1, 81, animarr[26][0]);
			animRound(width/2, 3*height/8, width/20, height/20, 15, -0.5, 0.1, 81, animarr[26][0]);
			animRound(81*width/160, 69*height/160, width/24, height/24, 15, -1, 0.1, 80, animarr[26][0]);
			animRound(41*width/80, 15*height/32, width/28, height/28, 15, -1.1, 0.1, 80, animarr[26][0]);
			animRound(41*width/80, 81*height/160, width/28, height/28, 11, -1.2, 0.1, 79, animarr[26][0]);
			
			animRound(5*width/8, 21*height/40, width/24, height/24, 0, 0, 0, 0, animarr[27][0]);
			animRound(17*width/80, 47*height/80, width/24, height/24, 0, 0, 0, 0, animarr[28][0]);
			animRound(13*width/20, 33*height/160, width/24, height/24, 0, 0, 0, 0, animarr[29][0]);
		} else if (index == 7) {
			fill(8, 160, 160);
			animRound(width/2, 3*height/8, 3*width/10, 3*height/10, 1, 0, 0, 80, animarr[21][0]);
		} else if (index == 8) {
			fill(255, 96, 96);
			animRound(width/2, 3*height/8, width/2, height/2, 0, 0, 0, 0, animarr[21][0]);
		} else if (index == 9) {
			fill(240, 48, 48);
			for (let i = 0; i < 3; i++) {
				let a = 120*i - 50 + animarr[21][0][0];
				animate(animarr[23 + i]);
				animRound(width/2 + 3*cos(a)*width/20, 3*height/8 + 3*sin(a)*height/20, width/5, height/5, 0, 0, 0, 0, animarr[23 + i][0]);
			}
		}
		
		if (textBool) {
			description(organelleDesc[scene]);			
			
			strokeWeight(height/256)
			stroke(0);
			line(width/64, 3*height/128, 5*width/128, 3*height/128);
			line(width/64, 3*height/128, 3*width/128, height/64);
			line(width/64, 3*height/128, 3*width/128, height/32);
			noStroke();
		}
	}
}

function mouseCheck() {
	let pixelValue = [];
	let mouseIndex = 0;
	
	if (mouseX >= 0 && mouseX < width && mouseY >= 0 && mouseY < height) {
		pixelValue = get(mouseX, mouseY).slice(0, -1);
		
		for (let i = 0; i < animCircleHitboxes.length; i++) {
			if (sqrt((mouseX - animCircleHitboxes[i][0])**2 + (mouseY - animCircleHitboxes[i][1])**2) <= animCircleHitboxes[i][2]) {
				pixelValue = [240, 48, 48];
				break;
			}
		}
		
		if (JSON.stringify(pixelValue) == JSON.stringify([170, 226, 232])) {
			mouseIndex = 1;
		} else if (JSON.stringify(pixelValue) == JSON.stringify([224, 224, 64])) {
			mouseIndex = 2;
		} else if (JSON.stringify(pixelValue) == JSON.stringify([50, 168, 82])) {
			mouseIndex = 3;
		} else if (JSON.stringify(pixelValue) == JSON.stringify([0, 0, 0])) {
			mouseIndex = 4;
		} else if (JSON.stringify(pixelValue) == JSON.stringify([64, 64, 192])) {
			mouseIndex = 5;
		} else if (JSON.stringify(pixelValue) == JSON.stringify([180, 80, 112])) {
			mouseIndex = 6;
		} else if (JSON.stringify(pixelValue) == JSON.stringify([8, 160, 160])) {
			mouseIndex = 7;
		} else if (JSON.stringify(pixelValue) == JSON.stringify([255, 96, 96])) {
			mouseIndex = 8;
		} else if (JSON.stringify(pixelValue) == JSON.stringify([240, 48, 48])) {
			mouseIndex = 9;
		}
	}
	
	return mouseIndex;
}

function previewPane(txt) {
	if (mouseX < width/2) {
		textAlign(LEFT, BOTTOM);
	} else {
		textAlign(RIGHT, BOTTOM);
	}
	
	let bounds = font.textBounds(" " + txt + " ", mouseX, mouseY);
	let reAlign = mouseY - bounds.y - bounds.h;
	
	fill(255, 15);
	rect(bounds.x, bounds.y - height/40 + reAlign, bounds.w, bounds.h + height/40);
	fill(0);
	text(" " + txt + " ", mouseX, mouseY - height/80 + reAlign)
}

function description(txt) {
	textAlign(CENTER, CENTER);
	fill(208);
	noStroke();
	rect(0, 3*height/4, width, height/4);
	fill(0);
	text(txt, width/32, 3*height/4, 15*width/16, height/4);
}