// Cache selectors
var lastId,
 topMenu = $("#stickyNavV2"),
 topMenuHeight = topMenu.outerHeight()+1,
 // All list items
 menuItems = topMenu.find("a"),
 // Anchors corresponding to menu items
 scrollItems = menuItems.map(function(){
   var item = $($(this).attr("href"));
    if (item.length) { return item; }
 });

 //window.alert("topMenu = " + topMenu);
 //window.alert("topMenuHeight = " + topMenuHeight);
 //window.alert("menuItems = " + menuItems[0]);
 //window.alert("menuItems = " + menuItems[1]);
 //window.alert("menuItems = " + menuItems[2]);
 //window.alert("menuItems = " + menuItems[3]);
 //window.alert("scrollItems = " + scrollItems[0].selector);
 //window.alert("scrollItems = " + scrollItems[1].selector);
 //window.alert("scrollItems = " + scrollItems[2].selector);
 //window.alert("scrollItems = " + scrollItems[3].selector);


// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  //window.alert("Click handler triggered");
  $('html, body').stop().animate({
      scrollTop: offsetTop
  }, 850);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";

   if (lastId !== id) {
    // window.alert("Transition event");
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href=#"+id+"]").parent().addClass("active");
   }
});
