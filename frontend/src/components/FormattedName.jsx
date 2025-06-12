import titleCase from "../components/TitleCase";

export default function formattedHeader(str) {
    if (!str) return "";
    const newStr =  str.split("_").join(" ");
    return titleCase(newStr);
}