import axios from "axios";
const baseUrl = "https://covid19.mathdro.id/api";

const req = async url => {
  try {
    const data = await fetch(new Request(url || baseUrl))
      .then(res => res.json())
      .then(res => res);
    return data;
  } catch (e) {
    return error;
  }
};

// export const coronaApi = async () => {
//   try {
//     let req: any = new Request();
//     const data = await fetch(req);
//     return data;
//   } catch (e) {
//     console.log(e);
//   }
// };

export const coronaApi = async query => {
  return await req(query);
};
