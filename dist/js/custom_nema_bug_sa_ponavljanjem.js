document.addEventListener("DOMContentLoaded", async function(){

const response=await fetch("API.php?action=getRoomBoxes");
const roomboxes=await response.json();
createRoomBoxes(roomboxes);
function createRoomBoxes(roomboxes)
{
  for(const roombox of roomboxes)
	{
	
    
const contentContainer=document.querySelector(".container-fluid");
const boxTemplate=document.querySelector("#box-template");
const boxElement=document.importNode(boxTemplate.content,true);
boxElement.querySelector(".box").setAttribute("id","box"+roombox.id);
boxElement.querySelector("h3").textContent=roombox.title;
boxElement.querySelector(".box-body").setAttribute("id","box"+roombox.id+"body");
const addBoxInBoxButton=boxElement.querySelector(".addBoxInsideBox");/*ubacit da se jednistveni id radi +1*/
boxElement.querySelector(".bootboxbtn").setAttribute("id","box"+roombox.id+"bootboxbtn");
const boxElementBody=boxElement.querySelector(".box-body");
contentContainer.appendChild(boxElement);
/*napravit funkciju
addBoxInBoxButton.addEventListener("click",()=>{
  const title=prompt("Unesite ime uredaja");
  if(!title) {return;}
  const pin=prompt("Unesite pin");
  if(!pin) {return;}
  const nad=boxElementBody.getAttribute("id");
  alert(nad);
  createAndInsertBoxInBox({
    id: -1,
    title: title,
    pin: pin,
    parent: nad
  });*/
  $("#"+"box"+roombox.id).boxWidget({
    animationSpeed: 500,
    collapseIcon: 'fa-minus',
    expandIcon: 'fa-plus',
    removeIcon: 'fa-times'
  })
	
	}
}
const response2=await fetch("API.php?action=getDeviceBoxes");
const deviceboxes=await response2.json();
createDeviceBoxes(deviceboxes);
function createDeviceBoxes(deviceboxes)
{
  for(const devicebox of deviceboxes)
  {
    

    const contentContainer=document.querySelector("#"+"box"+devicebox.parent_id+"body");
    const boxTemplate=document.querySelector("#boxInBox-template");
    const boxElement=document.importNode(boxTemplate.content,true);
    boxElement.querySelector(".box").setAttribute("id","deviceBox"+devicebox.id);
    boxElement.querySelector("h3").textContent=devicebox.title;
    const boxElementBody=boxElement.querySelector(".box-body");
    boxElementBody.querySelector(".btn1").setAttribute("id","pin"+devicebox.pin);
  boxElementBody.querySelector(".btn1").setAttribute("data-id",devicebox.pin);
	$("#"+"pin"+devicebox.pin).bootstrapToggle();
	console.log("#"+"pin"+devicebox.pin);
   /* $(function(){
      $("#"+"pin"+devicebox.pin).bootstrapToggle();
      $(".btn1").change(function(){
      $.ajax({
      type: 'POST',
      url: 'script.php',
      data:{"pin": $(this).attr('data-id')},
      success: function(data) {
          

      }
      });
      
})

})*/
  
    contentContainer.appendChild(boxElement);
        $("#"+"deviceBox"+devicebox.id).boxWidget({
        animationSpeed: 500,
        collapseIcon: 'fa-minus',
        expandIcon: 'fa-plus',
        removeIcon: 'fa-times'
        });
  }
}

$(document).ready(function(){
    $(document).on("change",".btn1", function(){
        $.ajax({
            type: 'POST',
            url: 'script.php',
            data:{"pin": $(this).attr('data-id')},
            success: function(data) {
                console.log(data);

            }
        });
});
/*
function createAndInsertBox(box)
{
console.log(box);
const contentContainer=document.querySelector(".container-fluid");
const boxTemplate=document.querySelector("#box-template");
const boxElement=document.importNode(boxTemplate.content,true);
boxElement.querySelector(".box").setAttribute("id",box.title);
boxElement.querySelector("h3").textContent=box.title;
boxElement.querySelector(".box-body").setAttribute("id",box.title+"body");
const addBoxInBoxButton=boxElement.querySelector(".addBoxInsideBox");ubacit da se jednistveni id radi +1
boxElement.querySelector(".bootboxbtn").setAttribute("id",box.title+"bootboxbtn");
const boxElementBody=boxElement.querySelector(".box-body");
contentContainer.appendChild(boxElement);
/*napravit funkciju
addBoxInBoxButton.addEventListener("click",()=>{
  const title=prompt("Unesite ime uredaja");
  if(!title) {return;}
  const pin=prompt("Unesite pin");
  if(!pin) {return;}
  const nad=boxElementBody.getAttribute("id");
  alert(nad);
  createAndInsertBoxInBox({
    id: -1,
    title: title,
    pin: pin,
    parent: nad
  });
  $("#"+title).boxWidget({
    animationSpeed: 500,
    collapseIcon: 'fa-minus',
    expandIcon: 'fa-plus',
    removeIcon: 'fa-times'
  })
  
}

*/
/*
function createAndInsertBoxInBox(box)
{
const contentContainer=document.querySelector("#"+box.parent);
const boxTemplate=document.querySelector("#boxInBox-template");
const boxElement=document.importNode(boxTemplate.content,true);
boxElement.querySelector(".box").setAttribute("id",box.title);
boxElement.querySelector("h3").textContent=box.title;
const boxElementBody=boxElement.querySelector(".box-body");
boxElementBody.querySelector(".btn1").setAttribute("id",box.pin);
$(function(){
  $("#"+box.pin).bootstrapToggle();
  $(".btn1").change(function(){
  $.ajax({
            type: 'POST',
            url: 'script.php',
            data:{"pin": $(this).attr('id')},
            success: function(data) {
                alert(data);
                $("#p1").text(data);

            }
        });
 })
  
})

contentContainer.appendChild(boxElement);

}*/
/*
const addBox=document.querySelector("#addBox");
addBox.addEventListener("click", ()=>{
  const title=prompt("Unesite ime");
  if(!title) {return;}
  const pin=prompt("Unesite id");
  if(!pin) {return;}
  createAndInsertBox({
    id: -1,
    title: title,
    pin: pin,

  });
  $("#"+title).boxWidget({
    animationSpeed: 500,
    collapseIcon: 'fa-minus',
    expandIcon: 'fa-plus',
    removeIcon: 'fa-times'
  })


});*/
$(document).on("click","#addBox", function(event ){
    var modal=bootbox.prompt({
        size: "small",
        title: "Unesi ime sobe",
        callback: function(result){
            if(result)
            {
		          const title=result;
              fetch(`API.php?action=addRoomBox&title=${title}`).then(async function(response) {
                const tmp=await response.json();
                if(tmp.success)
                {
                console.log(tmp.id,result);
                const contentContainer=document.querySelector(".container-fluid");
                const boxTemplate=document.querySelector("#box-template");
                const boxElement=document.importNode(boxTemplate.content,true);
                boxElement.querySelector(".box").setAttribute("id","box"+tmp.id);
                boxElement.querySelector("h3").textContent=result;
                boxElement.querySelector(".box-body").setAttribute("id","box"+tmp.id+"body");
                const addBoxInBoxButton=boxElement.querySelector(".addBoxInsideBox");
                boxElement.querySelector(".bootboxbtn").setAttribute("id","box"+tmp.id+"bootboxbtn");
                const boxElementBody=boxElement.querySelector(".box-body");
                contentContainer.appendChild(boxElement);
                
                $("#"+"box"+tmp.id).boxWidget({
                    animationSpeed: 500,
                    collapseIcon: 'fa-minus',
                    expandIcon: 'fa-plus',
                    removeIcon: 'fa-times'
                  })
               /* createAndInsertBox({
                  title: result
                });*/
              }
              }).catch(e=>alert(e));
            }
            
        }
    })
});
/*const addBoxInBox=document.querySelector("#addBoxInsideBox");
addBoxInBox.addEventListener("click", ()=>{
  const title=prompt("Unesite ime uredaja");
  if(!title) {return;}
  const pin=prompt("Unesite pin");
  if(!pin) {return;}
  const nad=addBoxInBox.parentNode.previousElementSibling.id;
  createAndInsertBoxInBox({
    id: -1,
    title: title,
    pin: pin,
    parent: nad
  });
  $("#"+pin).boxWidget({
    animationSpeed: 500,
    collapseIcon: 'fa-minus',
    expandIcon: 'fa-plus',
    removeIcon: 'fa-times'
  })
});*/
$(document).on("click",".btn.remove",function(event){
  alert("DELETED");
});
$(document).on("click",".bootboxbtn", function(event) {
const nad=this.parentNode.previousElementSibling.id;
var num = nad.replace(/\D/g,'');
            
 var modal = bootbox.dialog({
      message: $(".form-content").html(),
      title: "Unesi uredaj",
      buttons: [
        {
          label: "Save",
          className: "btn btn-primary pull-right submit",
          callback: function() {

            var form=modal.find('.form');
            var dataArray=form.serializeArray(),
                dataObj={};
            console.log(dataArray);
            $(dataArray).each(function (i,field){
              dataObj[field.name]=field.value;
            });
            
            
            /* SKUZIT ZASTO NERADI OVA FUNKCIJA 
            const AddBootBox=document.querySelector(nad+"bootboxbtn");
            createAndInsertBoxInBox({
            id: -1,
            title: dataObj["uredaj"],
            pin: dataObj["pin"],
            parent: nad
            });*/
		console.log(dataObj["uredaj"],dataObj["pin"],num);
            fetch(`API.php?action=addDeviceBox&title=${dataObj["uredaj"]}&pin=${dataObj["pin"]}&parent_id=${num}`).then(async function(response) {
            const tmp=await response.json();
		console.log(tmp.id);
            if(tmp.success)
            {
		console.log(tmp.id);
            const contentContainer=document.querySelector("#"+nad);
            const boxTemplate=document.querySelector("#boxInBox-template");
            const boxElement=document.importNode(boxTemplate.content,true);
            //boxElement.querySelector(".box").setAttribute("id",dataObj["uredaj"]);
            boxElement.querySelector(".box").setAttribute("id","deviceBox"+tmp.id);
            boxElement.querySelector("h3").textContent=dataObj["uredaj"];
            const boxElementBody=boxElement.querySelector(".box-body");
            boxElementBody.querySelector(".btn1").setAttribute("id","pin"+dataObj["pin"]);
	    boxElementBody.querySelector(".btn1").setAttribute("data-id",dataObj["pin"]);
            
            $("#"+"pin"+dataObj["pin"]).bootstrapToggle();
            

contentContainer.appendChild(boxElement);
            $("#"+"deviceBox"+dataObj["uredaj"]).boxWidget({
            animationSpeed: 500,
            collapseIcon: 'fa-minus',
            expandIcon: 'fa-plus',
            removeIcon: 'fa-times'
            });

           
          }
          }).catch(e=>alert(e));
        }
        },//
        {
          label: "Close",
          className: "btn btn-default pull-right",
          callback: function() {
            console.log("just do something on close");
          }
        }
      ],
      show: false,
      onEscape: function() {
        modal.modal("hide");
      }
  });
  
  modal.modal("show");
  
});
});
});