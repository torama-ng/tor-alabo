function openTab(tabName, elmnt, color){
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
  for(i=0; i<tabcontent.length; i++){
      tabcontent[i].style.display="none";
  }
   tablinks = document.getElementsByClassName("tablink");
   for(i = 0; i<tablinks.length; i++){
       tablinks[i].style.backgroundColor="";
   }
   document.getElementById(tabName).style.display = "block";
   elmnt.style.backgroundColor = color;
}


function openTab2(tabName, elmnt, color){
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
  for(i=0; i<tabcontent.length; i++){
      tabcontent[i].style.display="none";
  }
   tablinks = document.getElementsByClassName("tablink2");
   for(i = 0; i<tablinks.length; i++){
       tablinks[i].style.backgroundColor="";
   }
   document.getElementById(tabName).style.display = "block";
   elmnt.style.backgroundColor = color;
}





