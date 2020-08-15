getData()
function Add(){
    var title = document.getElementById('title');
    var key = firebase.database().ref('Todoapp').push().key

    var TodoObject = {
        name : title.value,
        key : key
    }

    firebase.database().ref('Todoapp/' + key).set(TodoObject);
    title.value = ""
    

}
var intial = 0;
//show Data

function getData(){


    var query = firebase.database().ref('Todoapp').on("child_added",function(snapshot){
     
    
    var data = snapshot.child("name").val();
    var key  = snapshot.child("key").val();
 

    function count(){
        
   
        return intial + 1;
        
    }
    
    
        //create li with text node
    
          var tr = document.createElement('tr')
          var td1 = document.createElement('td')
          var td2 = document.createElement('td')
          var td3 = document.createElement('td')
          var td4 = document.createElement('td')

          var tdtext = document.createTextNode(data);
          var counter = count()
          var tdtext2 = document.createTextNode(counter);
          td1.appendChild(tdtext2)
          td2.appendChild(tdtext)
         

   

         //craete delete button and its text node
    var delbtn = document.createElement('button');
    var deltext = document.createTextNode('Delete');
    delbtn.setAttribute('id',key)
    delbtn.setAttribute('class','btn btn-danger')
    delbtn.setAttribute('onclick','deleteitem(this.id,this)')
    delbtn.appendChild(deltext);

    //create edit button

    var editbtn = document.createElement('button');
    var edittext = document.createTextNode('Edit');
    editbtn.setAttribute('id',key)
    editbtn.setAttribute('class','btn btn-primary')
    editbtn.setAttribute('onclick','edititem(this.id,this)')
    editbtn.appendChild(edittext)

    td3.appendChild(editbtn)
    td4.appendChild(delbtn)
    

    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tr.appendChild(td4)


    var tbody = document.getElementById('tableBody')
    tbody.appendChild(tr)



       
          
    
          
    
    })
    }

    //delete items in the list


    function deleteitem(id,tr){

        // remove by using key
        
        firebase.database().ref('Todoapp/' + id).remove()
        tr.closest('tr').remove()

    
    
    }


// Delete all Items

function clearstr(){

    //remove commplete object
    if (confirm("Do you really Clear")){

        firebase.database().ref('Todoapp').remove()
        var tbody = document.getElementById('tableBody')
        tbody.innerHTML = ""


    }
  
}

// update item in list

function edititem(id,tr){

    //get the li value



// console.log(jQuery(li).closest('tr').find('td:eq(1)').text().value = "shakeeb")
   
 var name = jQuery(tr).closest('tr').find('td:eq(1)').text()

var editvalue = prompt('Enter Edit Value',name);

name = jQuery(tr).closest('tr').find('td:eq(1)').text(editvalue)




//Edit complte object
firebase.database().ref('Todoapp/' + id).set({
    key:id,
    name : editvalue,
  
})
   
}