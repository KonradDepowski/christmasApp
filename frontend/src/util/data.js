import img1 from "../assets/profile/avatar_1.png";
import img2 from "../assets/profile/avatar_2.png";
import img3 from "../assets/profile/avatar_3.png";
import img4 from "../assets/profile/avatar_4.png";
import img5 from "../assets/profile/avatar_5.png";

const images = [img1, img2, img3, img4, img5];
export function getImage(id) {
  const img = images.find((el, index) => index + 1 === id);
  return img;
}
