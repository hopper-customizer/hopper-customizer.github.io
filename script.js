var features = new Map();
features.set("color",["white","white"]);
features.set("antennae","45 degree");
features.set("pattern","no pattern");
features.set("eyeAsset","happy");
features.set("hair","mohawk");

setColorButtons("color_grid"); 
setEyeButtons();
setOtherButtons();

updateColor("white");
updateBase();
updateEye("happy","white");
updateAsset("antennae","45 degree");
updateAsset("hair","mohawk");
updateAsset("pattern","no pattern");

document.getElementById("save").addEventListener("click", function() { mergeImages("save"); } );
document.getElementById("new_tab").addEventListener("click", function() { mergeImages("new_tab"); } );

function setColorButtons(className) {
var colorNames = ["dark red", "light red", "dark pink", "light pink", "dark purple", "light purple", "black", "white", "dark blue", "teal", "burple", "yellow", "dark green", "medium green", "lime", "mint", "dark brown", "light brown", "orange", "mustard"];
var colorRGBs = [[173, 16, 16], [235, 64, 64], [236, 90, 218], [255, 166, 255], [138, 53, 224], [167, 93, 255], [42, 42, 42], [255, 255, 255], [53, 116, 255], [82, 216, 231], [112, 112, 254], [255, 255, 0], [1, 149, 30], [53, 187, 79], [156, 231, 44], [218, 254, 163], [170, 84, 0], [198, 147, 69], [245, 122, 0], [255, 212, 9]];
for (var i = 0; i < colorNames.length; i++) {
  var b = document.createElement("BUTTON");
  b.className = "color_grid_button";
  b.id = colorNames[i]+"1";
  b.style.backgroundColor = "rgb("+colorRGBs[i].join(",")+")";
  document.getElementById(className+"_1").appendChild(b);
  b.addEventListener("click", function() { updateColor(this.id.substring(0,this.id.length - 1)) } );

  var b2 = document.createElement("BUTTON");
  b2.className = "color_grid_button";
  b2.id = colorNames[i]+"2";
  b2.style.backgroundColor = "rgb("+colorRGBs[i].join(",")+")";
  document.getElementById(className+"_2").appendChild(b2);
  b2.addEventListener("click", function() { updateEye(features.get("eyeAsset"),this.id.substring(0,this.id.length - 1)) } );
  }
}

function setEyeButtons() {
var eyeAssets = ["lash","boy","happy","squint","angry","swirl"];

for (var i = 0; i < eyeAssets.length; i++) {
  var b = document.createElement("BUTTON");
  b.className = "cell_button";
  b.id = ""+eyeAssets[i];
  b.style.backgroundImage = "url('button_assets/"+eyeAssets[i]+" cell.png'"+")";
  b.addEventListener("click", function() { updateEye(this.id,features.get("color")[1]) } );
  document.getElementsByClassName("eye_panel_div")[0].appendChild(b);
  }
}

function setOtherButtons() {
var antennae = ["blocky", "dewdrop", "45 degree", "swooshback"];
var hairs = ["bald","tuft","fork","mohawk"];
var patterns = ["no pattern", "mask","diamond","nosedot"];
for (var i = 0; i < 4; i++) {
  var a = document.createElement("BUTTON");
  a.className = "cell_button";
  a.id = ""+antennae[i];
  a.style.backgroundImage = "url('button_assets/"+antennae[i]+" cell.png'"+")";
  document.getElementsByClassName("other_panel_div")[0].appendChild(a);
  a.addEventListener("click", function() { updateAsset("antennae",this.id) } );

  var h = document.createElement("BUTTON");
  h.className = "cell_button";
  h.id = ""+hairs[i];
  h.style.backgroundImage = "url('button_assets/"+hairs[i]+" cell.png'"+")";
  h.addEventListener("click", function() { updateAsset("hair",this.id) } );
  document.getElementsByClassName("other_panel_div")[0].appendChild(h);

  var p = document.createElement("BUTTON");
  p.className = "cell_button";
  p.id = ""+patterns[i];
  p.style.backgroundImage = "url('button_assets/"+patterns[i]+" cell.png'"+")";
  p.addEventListener("click", function() { updateAsset("pattern",this.id) } );
  document.getElementsByClassName("other_panel_div")[0].appendChild(p);
  }
}

function updateBorders(buttonId, newButtonId) {
  var oldB = document.getElementById(buttonId);
  var newB = document.getElementById(newButtonId);
  if (oldB != null && newB != null) {
    oldB.style.outline = "none";
    newB.style.outline = "0.3vw solid #FBB148";
    oldB.style.zIndex = 0;
    newB.style.zIndex = 1000;
  }
}

//Functions for color/feature updating below
function updateColor(newColor) {
  updateBorders(features.get("color")[0]+"1",newColor+"1");
  features.set("color",[newColor,features.get("color")[1]]);
  updateBase();
  updateAsset("antennae",features.get("antennae"));
  updateAsset("pattern",features.get("pattern"));
  updateAsset("hair",features.get("hair"));
}

function updateBase() {
  document.getElementById("base").src = "hopper_assets/base/"+features.get("color")[0]+".png";
}

function updateEye(asset,color) {
  //fix so the code can figure out base
  if (asset == "lash" || asset == "boy") {
    document.getElementById("eye_base").src = "hopper_assets/eye/boy/"+color+".png";
    document.getElementById("eye_asset").src = "misc_assets/empty.png";
  }
 
  else if (asset == "angry") {
    document.getElementById("eye_base").src = "misc_assets/empty.png";
    document.getElementById("eye_asset").src = "hopper_assets/eye/"+asset+"/"+color+".png";
  }

  else { 
  document.getElementById("eye_asset").src = "hopper_assets/eye/"+asset+".png"; 
  document.getElementById("eye_base").src = "hopper_assets/eye/solid/"+color+".png";
  } 
  
  if (asset == "lash") {
    document.getElementById("eye_asset").src = "hopper_assets/eye/"+asset+".png"; 
  }

  updateBorders(features.get("color")[1]+"2",color+"2");
  updateBorders(features.get("eyeAsset"),asset);
  features.set("eyeAsset",asset);
  features.set("color",[features.get("color")[0],color]);
}

function updateAsset(type, asset) {
  if (asset == "bald" || asset == "no pattern") {
    document.getElementById(type).src = "misc_assets/empty.png"; 
  }
  else {
    document.getElementById(type).src = "hopper_assets/"+type+"/"+asset+"/"+features.get("color")[0]+".png";
  }
  updateBorders(features.get(type),asset);
  features.set(type,asset);
}

function mergeImages(type) {
var c=document.getElementById("hopper_canvas");
var ctx=c.getContext("2d");
ctx.clearRect(0, 0, hopper_canvas.width, hopper_canvas.height);
var antennae = new Image();
var base = new Image();
var pattern = new Image();
var eyeBase = new Image();
var eyeAsset = new Image();
var hair = new Image();
var watermark = new Image();
antennae.src = document.getElementById("antennae").src;
antennae.onload = function() {
   ctx.drawImage(antennae,0,0);
   base.src = document.getElementById("base").src;
   base.onload = function() {
      ctx.drawImage(base,0,0);
      pattern.src = document.getElementById("pattern").src;
      pattern.onload = function() {
 	ctx.drawImage(pattern,0,0);
 	eyeBase.src = document.getElementById("eye_base").src;
	eyeBase.onload = function() {
	  ctx.drawImage(eyeBase,0,0);
 	  eyeAsset.src = document.getElementById("eye_asset").src;
	  eyeAsset.onload = function() {
	    ctx.drawImage(eyeAsset,0,0);
	    hair.src = document.getElementById("hair").src;
	    hair.onload = function() {
	      ctx.drawImage(hair,0,0);
	      watermark.src = document.getElementById("watermark").src;
	      watermark.onload = function() {
		ctx.drawImage(watermark,0,0);      
	        var image = hopper_canvas.toDataURL("image/png");
		if (type == "new_tab") { 
		  var newTab = window.open();
		  newTab.document.write('<img src="'+image+'" width="1100" height="1100"/>');
		  }
  		else { 
		  var a  = document.createElement('a');
   	  	  a.href = image;
		  a.download = image; 
    		  a.click();
		}
	      }
	    }
	  }
	}	
      }
    }
  }
}
