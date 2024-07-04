// LottiePopup.js
import lottie from "lottie-web";
import successAnimation from "./swal.json"; // Adjust this path

const showLottiePopup = (text) => {
  return new Promise((resolve, reject) => {
    const popupElement = document.createElement("div");
    popupElement.style.position = "fixed";
    popupElement.style.top = "0";
    popupElement.style.left = "0";
    popupElement.style.width = "100%";
    popupElement.style.height = "100%";
    popupElement.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    popupElement.style.display = "flex";
    popupElement.style.justifyContent = "center";
    popupElement.style.alignItems = "center";
    popupElement.style.zIndex = "1000";

    const containerElement = document.createElement("div");
    containerElement.style.backgroundColor = "white";
    containerElement.style.padding = "20px";
    containerElement.style.borderRadius = "10px";
    containerElement.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
    containerElement.style.textAlign = "center";

    const animationContainer = document.createElement("div");
    animationContainer.style.width = "400px";
    animationContainer.style.height = "130px";

    containerElement.appendChild(animationContainer);

    // Append animation container and text element
    const textElement = document.createElement("h2");
    textElement.textContent = text;
    textElement.style.fontWeight = "bold";
    textElement.style.marginTop = "10px"; // Adjust spacing between animation and text
    containerElement.appendChild(textElement);

    popupElement.appendChild(containerElement);
    document.body.appendChild(popupElement);

    const animation = lottie.loadAnimation({
      container: animationContainer,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: successAnimation, // Replace with your animation data
    });

    // Close popup after 10 seconds
    setTimeout(() => {
      animation.destroy();
      document.body.removeChild(popupElement);
      resolve();
    }, 1500); // Adjust timing as needed
  });
};

export default showLottiePopup;
