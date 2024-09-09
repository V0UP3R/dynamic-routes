"use server";

export async function fetcher(rowsPerPage: number = 10, page:number = 1): Promise<{ count:number; results:{[key: string]: string | number; }[]}> {
  try {
    const offset = (page - 1) * rowsPerPage;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${rowsPerPage}&offset=${offset}`);
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log(`Página ${page}, Registros por páginas ${rowsPerPage}, Total de registros ${data.count}`);
    return data;
  } catch (error) {
    console.error(
      "There has been a problem with your fetch operation:",
      error
    );
  }
  return {count:1, results:[{name:''}]}; // Add a return statement at the end of the function
}
