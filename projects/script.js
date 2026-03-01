$(document).ready(function () {

    // Mobile menu toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll top button
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }
    });

});

// Title change when tab switch
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Portfolio Diksha Kore";
        $("#favicon").attr("href", "../assets/images/favicon.png");
    } else {
        document.title = "Come Back To Diksha's Portfolio";
    }
});


// ================= FETCH PROJECTS =================

function getProjects() {
    return fetch("./projects.json")
        .then(response => response.json())
        .catch(error => console.error("Error loading JSON:", error));
}

function showProjects(projects) {

    let container = document.querySelector(".box-container");
    let html = "";

    projects.forEach(project => {

        html += `
        <div class="grid-item ${project.category}">
            <div class="box tilt">

               <img src="../assets/images/projects/${project.image}" alt="${project.name}">

                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>

                    <div class="desc">
                        <p>${project.desc}</p>

                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank">
                                <i class="fas fa-eye"></i> View
                            </a>

                            <a href="${project.links.code}" class="btn" target="_blank">
                                Code <i class="fas fa-code"></i>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>`;
    });

    container.innerHTML = html;

    // Isotope
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');

        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

    // Tilt effect
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
        speed: 400
    });
}

// Load projects
getProjects().then(data => {
    showProjects(data);
});