import React, { useEffect, useState, useRef } from "react";
import { wordList } from "../App";

const genRandom = (wordList) => {
  let s = [];
  let min = 0,
    max = wordList.length - 1;
  for (let i = 0; i < 50; i++) {
    s.push(wordList[Math.floor(Math.random() * (max - min)) + min]);
    if (i != 49) s.push("\u00A0");
  }
  return s;
};

export default genRandom;
