export async function POST(req: Request) {
  const body = await req.json();
  const state = JSON.stringify({
    state: body.state,
  });
  const gameMode = body.gamemode;
  const url = `https://testimage-p77sme7tjq-uk.a.run.app/api/ai-move/${gameMode}`;
  const key = process.env.API_KEY ?? "";
  const apiHeaders = new Headers();
  apiHeaders.set("Content-Type", "application/json");
  apiHeaders.set("Access-Control-Allow-Origin", "*");
  apiHeaders.set("X_API_KEY", key);

  let move: string | undefined = undefined;
  await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: apiHeaders,
    body: state,
  })
    .then((response: Response) => {
      return response.json();
    })
    .then((data: any) => {
      move = data.ai_move;
      if (move === undefined) {
        console.log("Error: ", data.detail[0].msg);
        throw new Error(data.detail[0].msg);
      }
    })
    .catch((error: Error) => {
      throw new Error(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    });

  const obj = { ai_move: move };
  const blob = new Blob([JSON.stringify(obj, null, 2)]);

  return new Response(blob, {
    status: 200,
    statusText: "Worked as expected",
    headers: {},
  });
}
