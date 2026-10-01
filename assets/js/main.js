const imageModal = document.querySelector(".image-modal");
const modalImage = document.querySelector(".image-modal__image");
const modalCloseButton = document.querySelector(".image-modal__close");
const previewButtons = document.querySelectorAll(".product-preview__trigger");

let activeTrigger = null;
let closeRequested = false;

function closeImageModal() {
  if (!imageModal.open || closeRequested) {
    return;
  }

  closeRequested = true;
  imageModal.classList.add("is-closing");
}

previewButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const previewImage = button.querySelector("img");
    modalImage.src = previewImage.currentSrc || previewImage.src;
    modalImage.alt = previewImage.alt;
    activeTrigger = button;
    closeRequested = false;
    imageModal.classList.remove("is-closing");
    imageModal.showModal();
  });
});

modalCloseButton.addEventListener("click", closeImageModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && imageModal.open) {
    event.preventDefault();
    closeImageModal();
  }
});

imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeImageModal();
  }
});

imageModal.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeImageModal();
});

imageModal.addEventListener("animationend", (event) => {
  if (event.target === imageModal && imageModal.classList.contains("is-closing")) {
    imageModal.classList.remove("is-closing");
    imageModal.close();
  }
});

imageModal.addEventListener("close", () => {
  activeTrigger?.focus();
});
