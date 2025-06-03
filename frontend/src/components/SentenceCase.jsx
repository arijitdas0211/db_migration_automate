import React from "react";

export default function sentenceCase(str) {
  if (!str) {
    return "";
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
