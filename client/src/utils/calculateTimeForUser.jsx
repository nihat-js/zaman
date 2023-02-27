const getMonthName = (month, lang = "en") => {
  const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthNamesAz = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];
  if (lang === "en") {
    return monthNamesEn[month - 1]
  } else if (lang === "az") {
    return monthNamesAz[month - 1]
  }
}

const calculateTimeForUser = (stringDate) => {
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


export default calculateTimeForUser