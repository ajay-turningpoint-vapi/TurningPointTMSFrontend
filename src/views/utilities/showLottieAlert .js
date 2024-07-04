import Swal from "sweetalert2";
import lottie from "lottie-web";
import lottieJson from "./swal.json";
const showLottieAlert = () => {
  Swal.fire({
    position: "top-end",
    title: "Your work has been saved",
    showConfirmButton: false,
    timer: 1500,
    didOpen: () => {
      const lottieContainer = document.getElementById("lottie-container");
      lottie.loadAnimation({
        container: lottieContainer,
        renderer: "svg",
        loop: false,
        autoplay: true,
        path: lottieJson
      });
    },
    html: '<div id="lottie-container" style="width: 100px; height: 100px; margin: auto;"></div>',
  });
};

// Call the function to show the alert
showLottieAlert();
