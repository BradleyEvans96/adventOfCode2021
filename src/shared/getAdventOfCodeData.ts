import dotenv from "dotenv";
dotenv.config();

export const getPuzzleInput = async (yearNumber: number, dayNumber: number) => {
  const myHeaders = new Headers();
  myHeaders.append("Cookie", process.env.AOC_SESSION_COOKIE);

  try {
    const data = await fetch(
      `https://adventofcode.com/${yearNumber}/day/${dayNumber}/input`,
      {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      }
    ).then((v) => v.text());
    return data;
  } catch (e) {
    console.log(e);
  }
};
