const questions = document.querySelectorAll(".question");

questions.forEach((question) => {
  question.addEventListener("click", () => {
    const answer = question.nextElementSibling;
    answer.style.display = answer.style.display === "block" ? "none" : "block";
  });
});

//const loginBtn = document.getElementById('loginsignup-btn');

//loginBtn.addEventListener('click', function() {
// window.location.href = '/index.html';
//});
