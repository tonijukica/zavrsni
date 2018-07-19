document.addEventListener("DOMContentLoaded", async function(){
/*Učitavanje box-ova prostorija iz baze*/
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
      $("#"+"box"+roombox.id).boxWidget({
        animationSpeed: 500,
        collapseIcon: 'fa-minus',
        expandIcon: 'fa-plus',
        removeIcon: 'fa-times'
      })
    }
  }
  /*Ucitavanje box-ova uredaja iz baze*/
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
      $(function(){
        //$("#"+"pin"+devicebox.pin).bootstrapToggle();
	if(devicebox.state==1)
          $("#"+"pin"+devicebox.pin).bootstrapToggle('on');
        else
          $("#"+"pin"+devicebox.pin).bootstrapToggle('off');
        $("#"+"deviceBox"+devicebox.id).boxWidget({
            animationSpeed: 500,
            collapseIcon: 'fa-minus',
            expandIcon: 'fa-plus',
            removeIcon: 'fa-times'
          })
          })
      contentContainer.appendChild(boxElement);
    }
  }
  /*Slanje parametara da se izvrsi python funckija*/
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
	  var state=$(this).prop('checked');
	  const pin=$(this).attr('data-id');
	  fetch(`API.php?action=changeDeviceState&pin=${pin}&state=${state}`).then(async function(response){
          console.log("promijenjeno stanje");
        }).catch(e=>alert(e));	
  });
});
  /*Brisanje box-ova*/
  $(document).ready(function(){
    $("[data-widget='remove']").click(function(){
    console.log("BRISEMO");
    const idToDelete=this.parentElement.parentElement.parentElement.id;
    console.log(idToDelete);
    var idNum = idToDelete.replace(/\D/g,'');
    console.log(idNum);
	console.log("prije slanja php zahtjeva");
    fetch(`API.php?action=deleteBox&id=${idNum}`).then(async function(response){
	const tmp=await response.json();
	console.log("poslali zahtjev");
	if(tmp.success)
		console.log("obrisano uspjesno");
	}).catch(e=>alert(e));
    
    });
    });
  /*Dodavanje box-ova soba*/
  $(document).on("click","#addBox", function(event ){
      var modal=bootbox.prompt({
          size: "small",
          title: "Unesi ime prostorije",
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
                }
                }).catch(e=>alert(e));
              }
              
          }
      })
  });
  /*Dodavanje box-ova uredaja*/
  $(document).on("click",".bootboxbtn", function(event) {
    const nad=this.parentNode.previousElementSibling.id;
    var num = nad.replace(/\D/g,'');
    console.log(nad);
    console.log(num);
    var modal = bootbox.dialog({
          message: $(".form-content").html(),
          title: "Unesi uređaj",
          buttons: [
            {
              label: "Ok",
              className: "btn btn-primary pull-right submit",
              callback: function() {

                var form=modal.find('.form');
                var dataArray=form.serializeArray(),
                    dataObj={};
                console.log(dataArray);
                $(dataArray).each(function (i,field){
                  dataObj[field.name]=field.value;
                });
                
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
                $(function(){
                  $("#"+"pin"+dataObj["pin"]).bootstrapToggle();
                  $("#"+"deviceBox"+tmp.id).boxWidget({
                    animationSpeed: 500,
                    collapseIcon: 'fa-minus',
                    expandIcon: 'fa-plus',
                    removeIcon: 'fa-times'
                  })
                  })     
                contentContainer.appendChild(boxElement);
                $("#"+"deviceBox"+tmp.id).boxWidget({
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
