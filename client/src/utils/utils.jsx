export function getCookie(n) {
  let a = `; ${document.cookie}`.match(`;\\s*${n}=([^;]+)`);
  return a ? a[1] : '';
}

export const getToken = getCookie('token')
export const token = getCookie('token')

const getMonthName = (month, lang = "en") => {
  const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthNamesAz = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];
  if (lang === "en") {
    return monthNamesEn[month - 1]
  } else if (lang === "az") {
    return monthNamesAz[month - 1]
  }
}

export const calculateTimeForUser = (stringDate) => {
  let text;
  let original = new Date(stringDate);
  let current = new Date()
  if (current.getDate() == original.getDate()) {
    text = "Today " + original.getHours() + ":" + original.getMinutes()
  } else if (current.getDate() == original.getDate() + 1) {
    text = "Yesterday " + original.getHours() + ":" + original.getMinutes()
  }
  else if (current.getFullYear() == original.getFullYear()) {
    text = original.getDate() + " " + getMonthName(original.getUTCMonth()) + " " + original.getUTCHours() + ":" + original.getMinutes()
  }
  return text
}

export async function cropImage(image, crop,) {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');

  const pixelRatio = window.devicePixelRatio;
  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height,
  );
  let croppedImage = await new Promise(resolve => canvas.toBlob((blob) => {
    let file = new File([blob], "fileName.jpg", { type: "image/jpeg" })
    resolve(file)
  }, 'image/jpeg'))
  return croppedImage
}