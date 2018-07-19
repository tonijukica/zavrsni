document.addEventListener("DOMContentLoaded", () => {
$(document).ready(function(){
    $(document).on("click",".btn1", function(){
        $.ajax({
            type: 'POST',
            url: 'script.php',
            data:{"pin": $(this).attr('id')},
            success: function(data) {
                alert(data);
                $("#p1").text(data);

            }
        });
});
$("#btn2").click(function(){

        $.ajax({
            type: 'POST',
            url: 'script2.php',
            success: function(data) {
  alert(data);
                $("#p2").text(data);
            }
        });
});
$(function(){
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
function createAndInsertBox(box)
{
const contentContainer=document.querySelector(".container-fluid");
const boxTemplate=document.querySelector("#box-template");
const boxElement=document.importNode(boxTemplate.content,true);
boxElement.querySelector(".box").setAttribute("id",box.title);
boxElement.querySelector("h3").textContent=box.title;
boxElement.querySelector(".box-body").setAttribute("id",box.pin);
const addBoxInBoxButton=boxElement.querySelector(".addBoxInsideBox");/*ubacit da se jednistveni id radi +1*/
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
  
});*/
contentContainer.appendChild(boxElement);

}
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

}
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

*/
});
$(document).on("click","#addBox", function(event ){
    var modal=bootbox.prompt({
        size: "small",
        title: "Unesi ime sobe",
        callback: function(result){
            if(result)
            {
                console.log(result);
                const contentContainer=document.querySelector(".container-fluid");
                const boxTemplate=document.querySelector("#box-template");
                const boxElement=document.importNode(boxTemplate.content,true);
                boxElement.querySelector(".box").setAttribute("id",result);
                boxElement.querySelector("h3").textContent=result;
                boxElement.querySelector(".box-body").setAttribute("id",result+"body");
                const addBoxInBoxButton=boxElement.querySelector(".addBoxInsideBox");/*ubacit da se jednistveni id radi +1*/
                boxElement.querySelector(".bootboxbtn").setAttribute("id",result+"bootboxbtn");
                const boxElementBody=boxElement.querySelector(".box-body");
                contentContainer.appendChild(boxElement);
                contentContainer.appendChild(boxElement);
                $("#"+result).boxWidget({
                    animationSpeed: 500,
                    collapseIcon: 'fa-minus',
                    expandIcon: 'fa-plus',
                    removeIcon: 'fa-times'
                  })

            }
            else   
            {
                /*napravit izjavu ako nije nista uneseno*/
                console.log("nema inputa");
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
$(document).on("click",".bootboxbtn", function(event) {
const nad=this.parentNode.previousElementSibling.id;
            console.log(nad);
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
            const contentContainer=document.querySelector("#"+nad);
            const boxTemplate=document.querySelector("#boxInBox-template");
            const boxElement=document.importNode(boxTemplate.content,true);
            boxElement.querySelector(".box").setAttribute("id",dataObj["uredaj"]);
            boxElement.querySelector("h3").textContent=dataObj["uredaj"];
            const boxElementBody=boxElement.querySelector(".box-body");
            boxElementBody.querySelector(".btn1").setAttribute("id",dataObj["pin"]);
            $(function(){
            $("#"+dataObj["pin"]).bootstrapToggle();
            $(".btn1").change(function(){
            $.ajax({
            type: 'POST',
            url: 'script.php',
            data:{"pin": $(this).attr('id')},
            success: function(data) {
                $("#p1").text(data);

            }
            });
            $("#"+dataObj["uredaj"]).boxWidget({
                animationSpeed: 500,
                collapseIcon: 'fa-minus',
                expandIcon: 'fa-plus',
                removeIcon: 'fa-times'
              })
 })
  
})

contentContainer.appendChild(boxElement);
            $("#"+dataObj["uredaj"]).boxWidget({
            animationSpeed: 500,
            collapseIcon: 'fa-minus',
            expandIcon: 'fa-plus',
            removeIcon: 'fa-times'
            });

           
           
          }
        },
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
