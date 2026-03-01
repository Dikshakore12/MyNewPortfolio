$(document).ready(function () {

    // =============================
    // NAVBAR TOGGLE
    // =============================
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // =============================
    // SCROLL EVENTS
    // =============================
    $(window).on('scroll load', function () {

        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        // Scroll Top Button
        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }

        // Scroll Spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // =============================
    // SMOOTH SCROLL
    // =============================
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500);
    });

    // =============================
    // CONTACT FORM (EmailJS)
    // =============================
    $("#contact-form").submit(function (event) {
        event.preventDefault();

        emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
            .then(function () {
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully");
            }, function () {
                alert("Form Submission Failed! Try Again");
            });
    });

});


// =============================
// PAGE TITLE CHANGE
// =============================
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Portfolio | Diksha Kore";
        $("#favicon").attr("href", "assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio ❤️";
    }
});


// =============================
// TYPED EFFECT
// =============================
var typed = new Typed(".typing-text", {
    strings: [
        "Java Developer",
        "Web Developer",
        "Computer Science Student",
        "Tech Enthusiast"
    ],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 800,
});


// =============================
// FETCH SKILLS & PROJECTS
// =============================
async function fetchData(type = "skills") {
    let response = type === "skills"
        ? await fetch("skills.json")
        : await fetch("./projects/projects.json");

    return await response.json();
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";

    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
            <div class="info">
                <img src="${skill.icon}" alt="skill" />
                <span>${skill.name}</span>
            </div>
        </div>`;
    });

    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";

    projects.slice(0, 10).forEach(project => {
        projectHTML += `
        <div class="box tilt">
            <img draggable="false" src="./assets/images/projects/${project.image}" alt="project" />
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
        </div>`;
    });

    projectsContainer.innerHTML = projectHTML;

    // Tilt Effect
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
        speed: 400,
    });
}

fetchData().then(showSkills);
fetchData("projects").then(showProjects);


// =============================
// SCROLL REVEAL
// =============================
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: false
});

sr.reveal('.home .content', { delay: 200 });
sr.reveal('.home .image', { delay: 400 });
sr.reveal('.about', { delay: 200 });
sr.reveal('.skills', { delay: 200 });
sr.reveal('.education', { delay: 200 });
sr.reveal('.work', { delay: 200 });
sr.reveal('.experience', { delay: 200 });
sr.reveal('.contact', { delay: 200 });


// =============================
// TAWK CHAT
// =============================
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();