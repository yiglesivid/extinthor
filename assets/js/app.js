$(function () {
  //SPA
  $(".view").hide();
  $("#view-home").show();

  $("[data-section='home']").click(function () {
    $(".view").hide();
    $("#view-home").show();
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
  });

  $("[data-section='productos']").click(function () {
    $(".view").hide();
    $("#view-productos").show();
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
  });

  $("[data-section='contacto']").click(function () {
    $(".view").hide();
    $("#view-contacto").show();
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
  });

  $("[data-section='login']").click(function () {
    $(".view").hide();
    $("#view-login").show();
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
  });

   $(window).on("hashchange", function () {
  var hash = location.hash;                
  var seccion = hash.replace("#", "");     
  if (seccion == "") { seccion = "home"; }  

  $(".view").hide();                       
  $("#view-" + seccion).show();             

  $(".nav-link").removeClass("active");     
  $("[data-section='" + seccion + "']").addClass("active"); 
});

// Al hacer clic, cambia el hash (para que el historial funcione)
$("[data-section]").click(function () {
  var seccion = $(this).data("section"); 
  location.hash = seccion;    
});
  //DESCRIPCION
  $(".card").on("click", function () {
    $(this).find(".card-text").toggle(); 
  });

  // BUSCADOR
  if ($("#navMain").length && $("#nav-search").length === 0) {
    $("#navMain").append(`
    <form id="searchForm" class="form-inline my-2 my-lg-0 ms-auto" onsubmit="return false;">
      <input id="nav-search" class="form-control mr-sm-2" type="search" placeholder="Buscar producto...">
    </form>
  `);
  }

  // BUSQUEDA
  $("#nav-search").on("input", function () {
    var searchTerm = $(this).val().toLowerCase().trim();

    $(".view").hide();           // Oculta 
    $("#view-productos").show(); // Muestra 

    $("#view-productos .card").each(function () {
      var nombre = $(this).find(".card-title").text().toLowerCase();
      var descripcion = $(this).find(".card-text").text().toLowerCase();

      if (nombre.includes(searchTerm) || descripcion.includes(searchTerm) || searchTerm === "") {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  /* ================= Formulario: validación mínima + modal ================= */
  var $f = $("#contact-form"); if (!$f.length) $f = $("#view-contacto form").first();
  if ($f.length) {
    $f.on("submit", function (e) {
      e.preventDefault();
      var n = $("#nombre").val() || "", em = $("#email").val() || "", m = $("#mensaje").val() || "";
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
      if (n.trim() && ok && m.trim()) {
        this.reset();
        var modal = document.getElementById("graciasModal");
        if (modal && typeof bootstrap !== "undefined") new bootstrap.Modal(modal).show();
        else if ($("#graciasModal").length) $("#graciasModal").modal("show");
        else alert("¡Gracias!");
      } else {
        alert("Completa nombre, email válido y mensaje.");
      }
    });
  }
});
