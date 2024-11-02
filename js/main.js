$(function () {
  $(".slider__items").slick({
    prevArrow:
      '<img class="slider__arrow slider__arrow-left" src="/images/arrow-left.svg" alt="left" />',
    nextArrow:
      '<img class="slider__arrow slider__arrow-right" src="/images/arrow-right.svg" alt="left" />',
    fade: true,
  });

  $(".menu-btn").on("click", function () {
    $(".menu__list").toggleClass("active");
  });
});
